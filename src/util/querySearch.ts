import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type FilterInput =
  | string
  | number
  | null
  | undefined
  | Array<string | number>;

type SetFilterOptions = {
  resetFilters?: boolean;
  resetPage?: boolean;
  clearKeys?: string[];
  isMultiple?: boolean;
  replace?: boolean;
};

const PAGE_KEY = "page";
function normalizeValues(value: FilterInput): string[] {
  if (Array.isArray(value)) {
    return value
      .map((v) => (v ?? "").toString().trim())
      .filter(Boolean);
  }
  if (value === null || value === undefined) return [];
  const str = String(value).trim();
  return str ? [str] : [];
} function toSortedQueryString(p: URLSearchParams): string {
  const entries = Array.from(p.entries());
  entries.sort(([aK, aV], [bK, bV]) =>
    aK === bK ? aV.localeCompare(bV) : aK.localeCompare(bK)
  );
  const sp = new URLSearchParams();
  for (const [k, v] of entries) sp.append(k, v);
  return sp.toString();
}

export type UseSearchQueryReturn = {
  setFilter: (key: string, value: FilterInput, opts?: SetFilterOptions) => void;
  setFilters: (
    filters: Record<string, FilterInput>,
    opts?: SetFilterOptions
  ) => void;
  clearFilters: (excludeKeys?: string[]) => void;
  goToPage: (page: number, replace?: boolean) => void;
  params: URLSearchParams;
  queryString: string;
  page: number;
  grouped: Record<string, string[]>;
};

const useSearchQuery = (): UseSearchQueryReturn => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const page = useMemo(() => {
    const n = Number(params.get(PAGE_KEY) ?? "1");
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [params]);

  const grouped = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const [k, v] of params.entries()) {
      if (!out[k]) out[k] = [v];
      else out[k].push(v);
    }
    return out;
  }, [params]);

  const queryString = useMemo(() => toSortedQueryString(params), [params]);

  const navigateWithParams = useCallback(
    (p: URLSearchParams, replace = false) => {
      const qs = toSortedQueryString(p);
      navigate(qs ? `${location.pathname}?${qs}` : location.pathname, { replace });
    },
    [navigate, location.pathname]
  );

  const carryCurrentPageIfGt1 = useCallback(
    (target: URLSearchParams) => {
      if (page > 1) target.set(PAGE_KEY, String(page));
      else target.delete(PAGE_KEY);
    },
    [page]
  );

  const resetPageTo1 = useCallback((target: URLSearchParams) => {
    target.delete(PAGE_KEY);
  }, []);

  const setFilter = useCallback(
    (key: string, value: FilterInput, opts?: SetFilterOptions) => {
      if (!key) return;
      const {
        isMultiple = true,
        resetFilters = false,
        resetPage = true,
        clearKeys = [],
        replace = false,
      } = opts ?? {};

      const next = new URLSearchParams();

      if (!resetFilters) {
        for (const [k, v] of params.entries()) {
          if (k === key || clearKeys.includes(k)) continue;
          next.append(k, v);
        }
      }

      const values = normalizeValues(value);
      if (values.length) {
        if (isMultiple) values.forEach((v) => next.append(key, v));
        else next.set(key, values[0]);
      } else {
        next.delete(key);
      }

      if (resetPage) resetPageTo1(next);
      else carryCurrentPageIfGt1(next);

      navigateWithParams(next, replace);
    },
    [params, resetPageTo1, carryCurrentPageIfGt1, navigateWithParams]
  );

  const setFilters = useCallback(
    (filters: Record<string, FilterInput>, opts?: SetFilterOptions) => {
      const {
        isMultiple = true,
        resetFilters = true,
        resetPage = true,
        clearKeys = [],
        replace = false,
      } = opts ?? {};

      const next = new URLSearchParams();

      if (!resetFilters) {
        for (const [k, v] of params.entries()) {
          if (clearKeys.includes(k)) continue;
          next.append(k, v);
        }
      }

      for (const [key, raw] of Object.entries(filters)) {
        if (!key) continue;
        const vals = normalizeValues(raw);
        if (!vals.length) {
          next.delete(key);
          continue;
        }
        if (isMultiple) vals.forEach((v) => next.append(key, v));
        else next.set(key, vals[0]);
      }

      if (resetPage) resetPageTo1(next);
      else carryCurrentPageIfGt1(next);

      navigateWithParams(next, replace);
    },
    [params, resetPageTo1, carryCurrentPageIfGt1, navigateWithParams]
  );

  const clearFilters = useCallback(
    (excludeKeys: string[] = []) => {
      const next = new URLSearchParams();
      for (const [k, v] of params.entries()) {
        if (excludeKeys.includes(k) && k !== PAGE_KEY) {
          next.append(k, v);
        }
      }
      if (excludeKeys.includes(PAGE_KEY)) carryCurrentPageIfGt1(next);
      else resetPageTo1(next);

      navigateWithParams(next);
    },
    [params, resetPageTo1, carryCurrentPageIfGt1, navigateWithParams]
  );

  const goToPage = useCallback(
    (to: number, replace = false) => {
      const n = Number.isFinite(to) && to > 1 ? Math.floor(to) : 1;
      const next = new URLSearchParams(params.toString());
      if (n > 1) next.set(PAGE_KEY, String(n));
      else next.delete(PAGE_KEY);
      navigateWithParams(next, replace);
    },
    [params, navigateWithParams]
  );

  return useMemo(
    () => ({ setFilter, setFilters, clearFilters, goToPage, params, queryString, page, grouped }),
    [setFilter, setFilters, clearFilters, goToPage, params, queryString, page, grouped]
  );
};

export default useSearchQuery;
