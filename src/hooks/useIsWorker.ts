import { useEffect, useState } from 'react';

const useMocking = () => {
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

export default useMocking;
