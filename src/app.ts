import { ctxAuthUser, ctxRequestId, ctxSessionId } from './context';
import { keys } from './utils/func';

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
    },
    keys,
    debug() {
      const debug = process.env.APP_DEBUG;
      return ['1', 'true', 'on', 'yes'].includes(debug);
    }
  };
};

export default app;
