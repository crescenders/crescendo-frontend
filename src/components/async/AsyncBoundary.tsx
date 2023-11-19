import ErrorBoundary from '@components/errorboundary/ErrorBoundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import SSRSafeSuspense from '@components/async/SSRSafeSuspense';
import ErrorFallback from '@components/errorboundary/ErrorFallback';

type AsyncBoundaryType = {
  suspenseFallback: React.ReactElement;
  children: React.ReactElement;
};

const AsyncBoundary = ({
  suspenseFallback,
  children,
}: PropsWithChildren<AsyncBoundaryType>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary reset={reset} fallback={ErrorFallback}>
      <SSRSafeSuspense fallback={suspenseFallback}>{children}</SSRSafeSuspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
