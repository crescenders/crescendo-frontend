import useIsMounted from '@hooks/useIsMounted';
import { Suspense } from 'react';

/**
 * Suspense가 서버사이드 렌더링 과정에서 거치지 않도록 커스텀한 컴포넌트입니다.
 */

const SSRSafeSuspense = (props: React.ComponentProps<typeof Suspense>) => {
  const { fallback } = props;
  const isMounted = useIsMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  return <>{fallback}</>;
};

export default SSRSafeSuspense;
