import { SetupWorker, setupWorker } from 'msw';
import { handlers } from '@mocks/handlers/handlers';

export const worker: SetupWorker = setupWorker(...handlers);
