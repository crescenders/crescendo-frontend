import studyApi from '@apis/study/studyApi';

const Sitemap = () => {
  return null;
};

const insideXMLString = (xmlContent: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${xmlContent}
    </urlset>
  `;
};

export const getServerSideProps = async (ctx) => {
  const { res } = ctx;
  let pagesXML = '';
  let cursor = '';
  let studies = new Array<
    Study & {
      uuid: string;
      leaders: Leaders[];
    }
  >();

  while (true) {
    let response = await studyApi.getStudyGroupList(`?${cursor}`);
    if (!response.next) break;
    studies.push(...response.results);
    cursor = response.next.split('?')[1];
  }

  studies.map((study) => {
    pagesXML += `
      <url>
        <loc>${process.env.NEXT_PUBLIC_DOMAIN}/study/detail/${study.uuid}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `;
  });

  if (res !== undefined) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(insideXMLString(pagesXML));
    res.end();
  }

  return { props: {} };
};

export default Sitemap;
