import '@styles/global.css';
import type { AppProps } from 'next/app';
import {
  HydrationBoundary,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@components/common/Layout';
import { RecoilEnv, RecoilRoot } from 'recoil';
import ErrorFallback from '@components/errorboundary/ErrorFallback';
import GlobalErrorBoundary from '@components/errorboundary/GlobalErrorBoundary';
import React from 'react';
import Head from 'next/head';
import ToastProvider from '@providers/ToastProvider';
import QueryProvider from '@providers/QueryProvider';

declare global {
  interface Window {
    google: any;
  }
}

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <Head>
        <title>Crescendo - 소규모 스터디 플랫폼</title>
      </Head>
      <RecoilRoot>
        <ToastProvider>
          <QueryProvider>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <GlobalErrorBoundary fallback={ErrorFallback} reset={reset}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </GlobalErrorBoundary>
            </HydrationBoundary>
          </QueryProvider>
        </ToastProvider>
      </RecoilRoot>
    </>
  );
}
