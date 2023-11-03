import { rest } from 'msw';

export const assignmentHandlers = [
  rest.get(
    `/api/v1/studygroup/studies/:uuid/assignments/:id`,
    (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'error' }));
    },
  ),
];
