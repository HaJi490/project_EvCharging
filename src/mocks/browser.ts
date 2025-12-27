import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/station.handlers';

export const worker = setupWorker(...handlers);