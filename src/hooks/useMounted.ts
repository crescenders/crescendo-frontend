import { useEffect, useState } from 'react';

const useMounted = (): boolean => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== undefined) setMounted(true);
  }, [mounted]);

  return mounted;
};

export default useMounted;
