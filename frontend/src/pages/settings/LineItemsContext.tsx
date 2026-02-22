import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

export type LineItemsFilter = "active" | "archived" | "deleted";

type LineItemsContextValue = {
  filter: LineItemsFilter;
  setFilter: (f: LineItemsFilter) => void;
  loading: boolean;
};

const LineItemsContext = createContext<LineItemsContextValue | null>(null);

const LOADING_DURATION_MS = 800;

export function LineItemsProvider({ children }: { children: ReactNode }) {
  const [filter, setFilterState] = useState<LineItemsFilter>("archived");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setFilter = useCallback((f: LineItemsFilter) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setFilterState(f);
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      timeoutRef.current = null;
    }, LOADING_DURATION_MS);
  }, []);

  return (
    <LineItemsContext.Provider value={{ filter, setFilter, loading }}>
      {children}
    </LineItemsContext.Provider>
  );
}

export function useLineItemsContext() {
  const ctx = useContext(LineItemsContext);
  return ctx;
}
