import { SetupServer, setupServer } from 'msw/node';
import { studyHandlers } from '@mocks/handlers/studyHandlers';

export const server: SetupServer = setupServer(...studyHandlers);
