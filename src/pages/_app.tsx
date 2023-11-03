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

declare global {
  interface Window {
    google: any;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      suspense: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
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
              <Component {...pageProps} />
            </GlobalErrorBoundary>
          </Layout>
        </HydrationBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export { queryClient };
