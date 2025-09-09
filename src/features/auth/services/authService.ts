// useApi.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios, { type AxiosRequestConfig, isAxiosError } from 'axios';
import { normalizeError } from "../../../util/errorUtils";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL as string;
type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions<T> {
  endpoint: string;
  method?: ApiMethod;
  data?: T;
  showToastError?: boolean;
  keepPreviousData?: boolean;
  retry?: number;
  pollInterval?: number;

  /** NEW: cancel the previous in-flight request (default true) */
  cancelPrevious?: boolean;

  /** NEW: optional request key for cache/inflight dedupe */
  dedupeKey?: string;
}

type ApiResponse<T> = {
  data: T | null;
  error: any;
};

const cache = new Map<string, any>();
const serializeKey = <T,>(endpoint: string, method: ApiMethod, data?: T) =>
  `${method}:${endpoint}:${data ? JSON.stringify(data) : ''}`;

// Cookie helper
function getCookie(name: string): string | null {
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1] ?? '') : null;
}

export const useApi = <TRequest = any, TResponse = any>() => {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // NEW: cancel previous & ignore stale responses
  const activeController = useRef<AbortController | null>(null);
  const requestSeq = useRef(0);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPoll = () => {
    if (pollTimer.current) {
      clearTimeout(pollTimer.current);
      pollTimer.current = null;
    }
  };

  const request = useCallback(async ({
    endpoint,
    method = 'POST',
    data: payload,
    showToastError = false,
    keepPreviousData = false,
    retry = 0,
    pollInterval,
    cancelPrevious = true,
    dedupeKey,
  }: ApiOptions<TRequest>): Promise<ApiResponse<TResponse>> => {

    const cacheKey = dedupeKey ?? serializeKey(endpoint, method, payload);

    // Cancel previous request if requested
    if (cancelPrevious && activeController.current) {
      activeController.current.abort();
    }
    const controller = new AbortController();
    activeController.current = controller;

    const mySeq = ++requestSeq.current;

    if (!keepPreviousData) setData(null);
    setLoading(true);
    setIsFetching(!!keepPreviousData);
    setError(null);

    if (cache.has(cacheKey) && keepPreviousData) {
      setData(cache.get(cacheKey));
    }

    // Build headers
    const headers: Record<string, string> = {};
    if (!(payload instanceof FormData)) headers['Content-Type'] = 'application/json';
    const token = getCookie('access_token');
    if (token) headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

    let attempts = 0;

    const fetchData = async (): Promise<ApiResponse<TResponse>> => {
      attempts++;
      try {
        const axiosConfig: AxiosRequestConfig = {
          method,
          url: `${BASE_API_URL}${endpoint}`,
          data: payload,
          headers,
          signal: controller.signal, // IMPORTANT: enables cancellation
          withCredentials: true,     // if you need cookies
        };

        const res = await axios(axiosConfig);
        const responseData: TResponse = res.data;

        // Ignore stale responses (only set state if this is the latest)
        if (mySeq === requestSeq.current) {
          cache.set(cacheKey, responseData);
          setData(responseData);
          setError(null);
          setLoading(false);
          setIsFetching(false);
        }
        return { data: responseData, error: null };
      } catch (err: any) {
        // If this request was canceled, just exit quietly
        if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED' || isAxiosError(err) && err.code === 'ERR_CANCELED') {
          return { data: null, error: null };
        }

        if (attempts <= retry) {
          const delay = 500 * 2 ** (attempts - 1);
          await new Promise((r) => setTimeout(r, delay));
          return fetchData();
        }

        const msg = err?.response?.data?.message || err?.message || 'Unexpected error';
        const n = normalizeError(err);

        if (mySeq === requestSeq.current) {
          setError(n);
          setLoading(false);
          setIsFetching(false);
          if (showToastError) toast.error(msg);
        }
        return { data: null, error: err };
      }
    };

    const result = await fetchData();

    if (pollInterval && pollInterval > 0) {
      cancelPoll();
      pollTimer.current = setTimeout(() => {
        request({
          endpoint,
          method,
          data: payload,
          showToastError,
          keepPreviousData,
          retry,
          pollInterval,
          cancelPrevious,
          dedupeKey,
        });
      }, pollInterval);
    } else {
      cancelPoll();
    }

    return result;
  }, []);

  useEffect(() => () => {
    cancelPoll();
    activeController.current?.abort();
  }, []);

  return { data, error, loading, isFetching, request, cancelPoll };
};
