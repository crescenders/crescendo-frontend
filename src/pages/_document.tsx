import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="description"
          content="프로그래밍, 개발과 관련된 스터디를 모집하고 찾을 수 있는 곳, crescendo"
        />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta
          property="og:title"
          content="Crescendo - 개발자를 위한 스터디 플랫폼"
        />
        <meta
          property="og:description"
          content="프로그래밍, 개발과 관련된 스터디를 모집하고 찾을 수 있는 곳, crescendo"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/open_graph.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="crescendo-study.site" />
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta
          name="twitter:title"
          content="Crescendo - 개발자를 위한 스터디 플랫폼"
        />
        <meta
          name="twitter:description"
          content="관심 있는 스터디를 검색하고 활동해 보세요!"
        />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/open_graph.png`}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
      </body>
    </Html>
  );
}
