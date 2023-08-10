import { rest } from 'msw';
import studyList from '@mocks/data/studyList.json';
import { CONFIG } from '@config';

export const studyHandlers = [
  // 검색어로 스터디 조회
  rest.get(`${CONFIG.BASE_URL}/api/v1/studies`, (req, res, ctx) => {
    const PAGINATE_UNIT = 4;
    const keyword = String(req.url.searchParams.get('keyword'));
    const page = Number(req.url.searchParams.get('page'));
    const findByKeyword = studyList.filter(
      (content) =>
        content.title.toLowerCase().includes(keyword.toLowerCase()) ||
        content.tags.some((tag) =>
          tag.toLowerCase().includes(keyword.toLowerCase()),
        ) ||
        content.studyName.toLowerCase().includes(keyword.toLowerCase()),
    );
    const paginatedStudies = findByKeyword.map((study, idx) => ({
      ...study,
      id: PAGINATE_UNIT * (page - 1) + 1 + idx,
      title: study.title + `${page}`,
    }));

    if (!keyword || !findByKeyword) {
      return res(ctx.status(200), ctx.json([]));
    }

    return res(ctx.status(200), ctx.delay(1000), ctx.json(paginatedStudies));
  }),
];
