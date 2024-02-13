import useApiError from '@hooks/useApiError';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { PropsWithChildren } from 'react';

export default function QueryProvider({ children }: PropsWithChildren) {
  const handleApiError = useApiError();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            throwOnError: true,
            staleTime: 5 * 1000,
          },
          mutations: {
            onError: handleApiError,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      {children}
    </QueryClientProvider>
  );
}
