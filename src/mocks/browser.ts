import { SetupWorker, setupWorker } from 'msw';
import { studyHandlers } from '@mocks/handlers/studyHandlers';

export const worker: SetupWorker = setupWorker(...studyHandlers);
