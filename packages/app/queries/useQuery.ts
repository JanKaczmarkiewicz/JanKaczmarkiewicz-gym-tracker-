import { useEffect, useState } from "react";

const useQuery = <T extends unknown>(
  fetchFn: () => Promise<T>
): { data: T; isLoading: false } | { data: undefined; isLoading: true } => {
  const [data, setData] = useState<undefined | T>();

  useEffect(() => {
    fetchFn().then(setData);
  }, []);

  return data
    ? { data, isLoading: false }
    : { data: undefined, isLoading: true };
};

export default useQuery;
