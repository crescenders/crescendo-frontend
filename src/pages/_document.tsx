import CustomHead from '@components/common/CustomHead';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <CustomHead />
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
        <div id="toast-root" />
      </body>
    </Html>
  );
}
