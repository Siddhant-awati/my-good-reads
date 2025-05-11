import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(url: string): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error("Failed to fetch books data; please try again..!");
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: (error as Error).message,
        });
      }
    };

    fetchData();
  }, [url]);

  return state;
};
