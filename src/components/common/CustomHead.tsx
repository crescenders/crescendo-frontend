import Head from 'next/head';

const CustomHead = () => {
  return (
    <Head>
      {/* HTML Meta Tags */}
      <meta
        name="description"
        content="관심 있는 스터디를 검색하고 활동해 보세요!"
      />
      <meta
        name="google-site-verification"
        content="4IgZuY7RUsBTkLbFi6lBrBS48mhJ-o3A2smcuBy3G0s"
      />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:title" content="Crescendo - 소규모 스터디 플랫폼" />
      <meta
        property="og:description"
        content="관심 있는 스터디를 검색하고 활동해 보세요!"
      />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_DOMAIN}/open_graph.png`}
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="crescendo-study.site" />
      <meta property="twitter:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
      <meta name="twitter:title" content="Crescendo - 소규모 스터디 플랫폼" />
      <meta
        name="twitter:description"
        content="관심 있는 스터디를 검색하고 활동해 보세요!"
      />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_DOMAIN}/open_graph.png`}
      />
    </Head>
  );
};

export default CustomHead;
