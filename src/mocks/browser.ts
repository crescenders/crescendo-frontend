import { SetupWorker, setupWorker } from 'msw';
import { studyHandlers } from '@mocks/handlers/studyHandlers';
import { memberHandlers } from '@mocks/handlers/memberHandlers';

export const worker: SetupWorker = setupWorker(
  ...studyHandlers,
  ...memberHandlers,
);
