import { rest } from 'msw';
import todo from '@mocks/data/todo.json';
import { CONFIG } from '@config';

export const handlers = [
  rest.get(`${CONFIG.BASE_URL}/api/todos`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(todo));
  }),
];
