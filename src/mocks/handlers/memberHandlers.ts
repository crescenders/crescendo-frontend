import { rest } from 'msw';
import memberList from '@mocks/data/memberList.json';

export const memberHandlers = [
  // 스터디 멤버 조회
  rest.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/studygroup/studies/:uuid/members`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.delay(300), ctx.json(memberList));
    },
  ),
];
