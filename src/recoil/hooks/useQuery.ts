import { useEffect, useState } from 'react';

export const useQuery = <T>(
  queryFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component unmounts.

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await queryFn();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData().then(r => console.log(r));

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks.
    };
  }, dependencies);

  return { data, error, isLoading };
};
