import { useEffect, useState } from 'react';

const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== undefined) setIsMounted(true);
  }, [isMounted]);

  return isMounted;
};

export default useIsMounted;
