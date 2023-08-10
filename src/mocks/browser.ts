import { SetupWorker, setupWorker } from 'msw';
import { handlers } from '@mocks/handlers/handlers';
import { studyHandlers } from '@mocks/handlers/studyHandlers';

export const worker: SetupWorker = setupWorker(...handlers, ...studyHandlers);
