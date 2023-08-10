import { SetupServer, setupServer } from 'msw/node';
import { handlers } from '@mocks/handlers/handlers';
import { studyHandlers } from '@mocks/handlers/studyHandlers';

export const server: SetupServer = setupServer(...handlers, ...studyHandlers);
