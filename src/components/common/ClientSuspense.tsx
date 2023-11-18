import useIsMounted from '@hooks/useIsMounted';
import { Suspense } from 'react';

const ClientSuspense = (props: React.ComponentProps<typeof Suspense>) => {
  const { fallback } = props;
  const isMounted = useIsMounted();

  if (isMounted) {
    return <Suspense {...props} />;
  }
  return <>{fallback}</>;
};

export default ClientSuspense;
