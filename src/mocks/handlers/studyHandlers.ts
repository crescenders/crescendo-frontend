import { rest } from 'msw';
import studyList from '@mocks/data/studyList.json';
import studyInfo from '@mocks/data/studyInfo.json';
import { CONFIG } from '@config';

export const studyHandlers = [
  // 검색어로 스터디 조회
  rest.get(`${CONFIG.BASE_URL}/api/v1/studies`, (req, res, ctx) => {
    const PAGINATE_UNIT = 12;
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
      title: study.title + `${page}`,
    }));

    if (!keyword || !findByKeyword) {
      return res(ctx.status(200), ctx.json([]));
    }

    return res(ctx.status(200), ctx.delay(1000), ctx.json(paginatedStudies));
  }),
  // 스터디 작성
  rest.post(`${CONFIG.BASE_URL}/api/v1/studygroup/studies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),
  // 스터디 상세페이지 조회
  // rest.get(`/api/v1/studygroup/studies/:id/`, (req, res, ctx) => {
  //   const { id } = req.params;
  //   const detail = {
  //     ...studyInfo,
  //     posts: {
  //       ...studyInfo.posts,
  //       title: studyInfo.posts.title + `${id}`,
  //       study_group: studyInfo.posts.study_group + `${id}`,
  //     },
  //   };

  //   return res(ctx.status(200), ctx.delay(300), ctx.json(detail));
  // }),
];
