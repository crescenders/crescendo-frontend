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
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import GlobalErrorBoundary from '@components/errorboundary/GlobalErrorBoundary';
import React from 'react';
import Head from 'next/head';

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
  const { reset } = useQueryErrorResetBoundary();

  return (
    <RecoilRoot>
      <Head>
        <title>Crescendo - 소규모 스터디 플랫폼</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Layout>
            <GlobalErrorBoundary fallback={ErrorFallback} reset={reset}>
              <Component {...pageProps} />
            </GlobalErrorBoundary>
          </Layout>
        </HydrationBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
