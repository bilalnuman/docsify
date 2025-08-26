// src/util/errorUtils.ts
import type { AxiosError } from "axios";
import type { ZodError } from "zod";
import { toast, type ToastOptions } from "react-toastify";

/** A normalized error shape for your app */
export type NormalizedError = {
  /** Human readable message */
  message: string;
  /** HTTP status, if available */
  status?: number;
  /** Machine code ('ECONNABORTED', custom API codes, etc.) */
  code?: string | number;
  /** Field-specific errors, if present */
  fieldErrors?: Record<string, string[]>;
  /** Extra details/messages (array) */
  details?: string[];
  /** Original error (for logging) */
  raw: unknown;
};

/** Safe guards */
const isObject = (v: unknown): v is Record<string, any> =>
  typeof v === "object" && v !== null;

const pickFirstString = (arr: unknown): string | undefined =>
  Array.isArray(arr) ? arr.find((x) => typeof x === "string") : undefined;

/** Try to collect a message from common API shapes */
function extractMessageLike(data: any): string | undefined {
  if (!data) return;
  // most common keys seen across backends
  return (
    (typeof data.message === "string" && data.message) ||
    (typeof data.detail === "string" && data.detail) ||
    (typeof data.error === "string" && data.error) ||
    pickFirstString(data?.errors) || // errors: ["msg1", "msg2"]
    // sometimes { errors: { field: ["msg"] } }
    (isObject(data?.errors) && pickFirstString(Object.values<string[]>(data.errors).flat())) ||
    undefined
  );
}

/** Normalize ANY unknown error into a predictable shape */
export function normalizeError(err: unknown): NormalizedError {
  // AxiosError
  if (isObject(err) && (err as AxiosError).isAxiosError) {
    const ax = err as AxiosError<any>;
    const status = ax.response?.status;
    const code = (ax as any).code;
    const data = ax.response?.data;

    const message =
      extractMessageLike(data) ||
      (typeof ax.message === "string" && ax.message) ||
      (typeof ax.response?.statusText === "string" && ax.response.statusText) ||
      "Network request failed";

    // field errors e.g. { errors: { email: ["Invalid"] } } or Django/DRF style
    let fieldErrors: Record<string, string[]> | undefined;
    if (isObject(data?.errors)) {
      fieldErrors = {};
      for (const [k, v] of Object.entries<any>(data.errors)) {
        fieldErrors[k] = Array.isArray(v) ? v.map(String) : [String(v)];
      }
    }

    // details (array)
    const details =
      Array.isArray(data?.details) && data.details.map(String).filter(Boolean);

    return { message, status, code, fieldErrors, details, raw: err };
  }

  // ZodError
  if (isObject(err) && (err as ZodError).issues) {
    const ze = err as ZodError;
    const fieldErrors: Record<string, string[]> = {};
    ze.issues.forEach((i) => {
      const path = i.path?.join(".") || "_form";
      fieldErrors[path] = fieldErrors[path] || [];
      fieldErrors[path].push(i.message);
    });
    const first =
      fieldErrors[Object.keys(fieldErrors)[0]]?.[0] ??
      "Validation failed. Please check your input.";
    return { message: first, fieldErrors, raw: err };
  }

  // Fetch-like Response thrown
  if (isObject(err) && typeof (err as any).status === "number" && "statusText" in (err as any)) {
    const res = err as Response & { data?: any };
    const status = res.status;
    const msg =
      extractMessageLike((res as any).data) ||
      res.statusText ||
      "Request failed";
    return { message: msg, status, raw: err };
  }

  // Native Error
  if (err instanceof Error) {
    return { message: err.message || "Something went wrong", raw: err };
  }

  // string
  if (typeof err === "string") {
    return { message: err, raw: err };
  }

  // unknown shape (try to stringify)
  try {
    const s = JSON.stringify(err);
    if (s && s !== "{}") return { message: s, raw: err };
  } catch {
    /* ignore */
  }
  return { message: "Something went wrong. Please try again.", raw: err };
}

/** Extract a readable string message with a fallback */
export function getErrorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  return normalizeError(err).message || fallback;
}

/** Grab the first field error, useful for forms */
export function getFirstFieldError(err: unknown): string | null {
  const n = normalizeError(err);
  if (!n.fieldErrors) return null;
  const firstKey = Object.keys(n.fieldErrors)[0];
  return firstKey ? n.fieldErrors[firstKey][0] ?? null : null;
}

/** Decide if it’s likely transient and worth retrying */
export function shouldRetry(err: unknown): boolean {
  const n = normalizeError(err);
  // Retry network timeouts or 5xx
  if (typeof n.code === "string" && n.code.toLowerCase().includes("timeout")) return true;
  if (n.status && n.status >= 500) return true;
  return false;
}

/** Small hash to dedupe toasts */
function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return String(h >>> 0);
}

/** Toast an error once (deduped by message) */
export function toastError(err: unknown, opts?: ToastOptions) {
  const msg = getErrorMessage(err);
  const id = `err-${hashString(msg)}`;
  toast.error(msg, { toastId: id, ...opts });
}

/** Optional: render-friendly details list if you want */
export function getErrorDetails(err: unknown): string[] | undefined {
  const n = normalizeError(err);
  if (n.details?.length) return n.details;
  if (n.fieldErrors) {
    return Object.entries(n.fieldErrors).flatMap(([k, arr]) =>
      arr.map((m) => `${k}: ${m}`)
    );
  }
  return undefined;
}
