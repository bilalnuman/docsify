// useSearchQuery.ts
import { useNavigate, useLocation } from "react-router-dom";

/**
 * URL/search helpers with "page only if > 1" behavior.
 * - Removes a filter key when its value is empty.
 * - Avoids trailing "?" when no params remain.
 * - Omits ?page=1 (keeps page only if > 1).
 */
const useSearchQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  /** Navigate without trailing "?" if empty */
  const navigateWithParams = (p: URLSearchParams) => {
    const qs = p.toString();
    navigate(qs ? `${location.pathname}?${qs}` : location.pathname);
  };

  /** Normalize incoming values -> string[] (drop empties) */
  const normalizeValues = (value: string | string[] | null | undefined) => {
    if (Array.isArray(value)) {
      return value
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    if (typeof value === "string") {
      const t = value.trim();
      return t ? [t] : [];
    }
    return [];
  };

  /** Keep current page only if > 1 */
  const carryCurrentPageIfGt1 = (target: URLSearchParams) => {
    const current = Number(params.get("page") ?? "1");
    if (Number.isFinite(current) && current > 1) {
      target.set("page", String(current));
    } else {
      target.delete("page");
    }
  };

  /** Reset to page 1 -> omit param entirely */
  const resetPageTo1 = (target: URLSearchParams) => {
    target.delete("page");
  };

  /**
   * Set a single filter
   * - Empty value => remove key
   * - resetPage=true -> omit page
   * - resetPage=false -> carry current page only if > 1
   */
  const setFilter = (
    key: string,
    value: string | string[] | null | undefined,
    config?: {
      isMultiple?: boolean;
      resetFilters?: boolean;
      resetPage?: boolean;
      clearKeys?: string[];
    }
  ) => {
    if (!key) return;

    const isMultiple = config?.isMultiple ?? true;
    const resetFilters = config?.resetFilters ?? false;
    const resetPage = config?.resetPage ?? true;
    const clearKeys = config?.clearKeys ?? [];

    const newParams = new URLSearchParams();

    if (!resetFilters) {
      for (const [k, v] of params.entries()) {
        if (clearKeys.includes(k)) continue;
        if (k !== key) newParams.append(k, v);
      }
    }

    const values = normalizeValues(value);
    if (values.length > 0) {
      if (isMultiple) values.forEach((v) => newParams.append(key, v));
      else newParams.set(key, values[0]);
    } // else omit key

    if (resetPage) resetPageTo1(newParams);
    else carryCurrentPageIfGt1(newParams);

    navigateWithParams(newParams);
  };

  /**
   * Set multiple filters at once
   * - Empty values remove their keys
   */
  const setFilters = (
    filters: Record<string, string | string[] | null | undefined>,
    config?: {
      isMultiple?: boolean;
      resetFilters?: boolean;
      resetPage?: boolean;
      clearKeys?: string[];
    }
  ) => {
    const isMultiple = config?.isMultiple ?? true;
    const resetFilters = config?.resetFilters ?? true;
    const resetPage = config?.resetPage ?? true;
    const clearKeys = config?.clearKeys ?? [];

    const newParams = new URLSearchParams();

    if (!resetFilters) {
      for (const [k, v] of params.entries()) {
        if (clearKeys.includes(k)) continue;
        newParams.append(k, v);
      }
    }

    for (const [key, rawValue] of Object.entries(filters)) {
      if (!key) continue;
      const values = normalizeValues(rawValue);
      if (values.length > 0) {
        if (isMultiple) values.forEach((v) => newParams.append(key, v));
        else newParams.set(key, values[0]);
      } else {
        newParams.delete(key);
      }
    }

    if (resetPage) resetPageTo1(newParams);
    else carryCurrentPageIfGt1(newParams);

    navigateWithParams(newParams);
  };

  /**
   * Go to a specific page
   * - page <= 1 -> remove "page"
   * - page > 1  -> set "page"
   */
  const gotoPage = (page: number) => {
    if (typeof page !== "number" || isNaN(page) || page < 1) page = 1;

    const newParams = new URLSearchParams(location.search);
    if (page > 1) newParams.set("page", String(page));
    else newParams.delete("page");

    navigateWithParams(newParams);
  };

  /**
   * Clear all filters except excluded keys
   * - Resets page to 1 (omit), unless "page" is explicitly excluded.
   */
  const clearFilters = (excludeKeys: string[] = []) => {
    const newParams = new URLSearchParams();

    for (const [key, value] of params.entries()) {
      if (excludeKeys.includes(key) && key !== "page") {
        newParams.append(key, value);
      }
    }

    if (excludeKeys.includes("page")) {
      carryCurrentPageIfGt1(newParams);
    } else {
      resetPageTo1(newParams);
    }

    navigateWithParams(newParams);
  };

  /**
   * Grouped query strings by key (e.g., "q=foo&q=bar")
   */
  const getGroupedQueries = () => {
    const grouped: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      if (!grouped[key]) grouped[key] = `${key}=${value}`;
      else grouped[key] += `&${key}=${value}`;
    }
    return grouped;
  };

  const page = (() => {
    const n = Number(params.get("page") ?? "1");
    return Number.isFinite(n) && n > 0 ? n : 1;
  })();

  return {
    setFilter,
    setFilters,
    clearFilters,
    gotoPage,
    groupedQueries: getGroupedQueries(),
    params,
    page,
  };
};

export default useSearchQuery;
