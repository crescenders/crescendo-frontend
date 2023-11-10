import '@styles/global.css';
import type { AppProps } from 'next/app';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@components/common/Layout';
import { RecoilEnv, RecoilRoot } from 'recoil';
import useIsWorker from '@hooks/useIsWorker';
import useIsMounted from '@hooks/useIsMounted';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import GlobalErrorBoundary from '@components/errorboundary/GlobalErrorBoundary';
import React from 'react';
import MobilePage from '@components/common/MobilePage';
import { getDevice } from '@utils/getDevice';

declare global {
  interface Window {
    google: any;
  }
}

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            throwOnError: true,
            staleTime: 60 * 1000,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );
  const device = getDevice();
  const { shouldRender } = useIsWorker();
  const isMounted = useIsMounted();
  const { reset } = useQueryErrorResetBoundary();

  if (!shouldRender || !isMounted) return null;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Layout>
            <GlobalErrorBoundary fallback={ErrorFallback} reset={reset}>
              {device === 'desktop' ? (
                <Component {...pageProps} />
              ) : (
                <MobilePage />
              )}
            </GlobalErrorBoundary>
          </Layout>
        </HydrationBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
