import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import Layout from '@components/common/Layout';
import { RecoilEnv, RecoilRoot } from 'recoil';
import useIsWorker from '@hooks/useIsWorker';

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
      useErrorBoundary: true,
    },
    mutations: {
      retry: 0,
      useErrorBoundary: true,
    },
  },
});

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  const { shouldRender } = useIsWorker();

  if (!shouldRender) return null;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export { queryClient };
