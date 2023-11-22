import { useEffect, useState } from 'react';

/**
 * @description msw worker를 지연시키기 위한 커스텀 훅입니다.
 * @returns { shouldRender } 모킹 사용가능 여부
 */
const useIsWorker = () => {
  const mockingEnabled = !!process.env.NEXT_PUBLIC_API_MOCKING;
  const [shouldRender, setShouldRender] = useState(!mockingEnabled);
  useEffect(() => {
    if (mockingEnabled) {
      import('../mocks').then(async ({ initMocks }) => {
        await initMocks();
        setShouldRender(true);
      });
    }
  }, []);

  return { shouldRender };
};

export default useIsWorker;
