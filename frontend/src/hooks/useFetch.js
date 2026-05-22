// Reusable fetching hook. Mirrors the pattern from the project wiki:
// async/await + loading/error/data states + useEffect on mount.
//
// Use it whenever a component needs to load data from the API:
//
//   const { data, loading, error, refetch } = useFetch(() => listImages({ page: 1 }), [page]);
//
// `deps` is forwarded to useEffect — pass any inputs that should trigger
// a re-fetch. `refetch()` lets you trigger one manually (after a mutation).

import { useCallback, useEffect, useState } from 'react';

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { run(); }, [run]);

  return { data, loading, error, refetch: run };
}
