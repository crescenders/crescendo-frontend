import { rest } from 'msw';
import studyList from '@mocks/data/studyList.json';
import studyInfo from '@mocks/data/studyInfo.json';
import memberList from '@mocks/data/memberList.json';

export const studyHandlers = [
  // 검색어로 스터디 조회
  rest.get(`/api/v1/studies`, (req, res, ctx) => {
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
      id: PAGINATE_UNIT * (page - 1) + 1 + idx,
      title: study.title + `${page}`,
    }));

    if (!keyword || !findByKeyword) {
      return res(ctx.status(200), ctx.json([]));
    }

    return res(ctx.status(200), ctx.delay(1000), ctx.json(paginatedStudies));
  }),
  // 스터디 작성
  rest.post(`/api/v1/studygroup/studies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),
  // 스터디 상세페이지 조회
  rest.get(`/api/v1/studygroup/studies/:id/`, (req, res, ctx) => {
    const { id } = req.params;
    const detail = {
      ...studyInfo,
      posts: {
        ...studyInfo.posts,
        title: studyInfo.posts.title + `${id}`,
        study_group: studyInfo.posts.study_group + `${id}`,
      },
    };

    return res(ctx.status(200), ctx.delay(300), ctx.json(detail));
  }),
  // 스터디 참여 신청자 조회
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studygroup/studies/:uuid/members`,
    (req, res, ctx) => {
      const { uuid } = req.params;
      const isApproved = req.url.search.split('=')[1] === 'true';
      const filteredList = memberList.filter(
        (member) => member.is_approved === isApproved,
      );
      const members = isApproved
        ? filteredList
        : filteredList.filter((member) => !member.is_leader);
      return res(ctx.status(200), ctx.delay(300), ctx.json(members));
    },
  ),
];
