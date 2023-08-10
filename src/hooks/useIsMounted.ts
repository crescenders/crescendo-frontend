import { useEffect, useState } from 'react';

/**
 * @description 마운트 여부를 반환하는 커스텀 훅입니다.
 * @returns { isMounted } 마운트 여부
 */
const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export default useIsMounted;
