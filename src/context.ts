import { AsyncLocalStorage } from 'node:async_hooks';

export const ctxRequestId = new AsyncLocalStorage();

export const ctxSessionId = new AsyncLocalStorage();

export const ctxAuthUser = new AsyncLocalStorage();
