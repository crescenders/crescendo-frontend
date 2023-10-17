import { SetupServer, setupServer } from 'msw/node';
import { studyHandlers } from '@mocks/handlers/studyHandlers';
import { memberHandlers } from '@mocks/handlers/memberHandlers';

export const server: SetupServer = setupServer(
  ...studyHandlers,
  ...memberHandlers,
);
