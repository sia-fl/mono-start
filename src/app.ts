import { ctxAuthUser, ctxRequestId, ctxSessionId } from '@/context.ts';

const app = () => {
  return {
    user<T>(): T {
      return ctxAuthUser.getStore() as T;
    },
    requestId() {
      return ctxRequestId.getStore() as any;
    },
    sessionId() {
      return ctxSessionId.getStore() as any;
    }
  };
};

export default app;
