import cache, { CacheGet, CachePaths } from 'mono-cache';
import { ctxSessionId } from '../context';

export const concatSessionId = () => {
  const id = ctxSessionId.getStore() as string;
  if (id) {
    return id + '.';
  }
  return '';
};

const session = <T extends Object = object>() => {
  const sessionCache = cache<T>({
    namespace: 'session'
  });
  return {
    get: <T2>(key: string | CachePaths<T>) => {
      return sessionCache.get(concatSessionId() + key) as CacheGet<T, T2>;
    },
    set: (key: string | CachePaths<T>, val: any, ttl?: number) => {
      return sessionCache.set(concatSessionId() + key, val, ttl);
    },
    del: (key: string | CachePaths<T>) => {
      return sessionCache.del(concatSessionId() + key);
    },
    ttl: (key: string | CachePaths<T>, ttl: number) => {
      return sessionCache.ttl(concatSessionId() + key, ttl);
    },
    increment: (key: string | CachePaths<T>, val: number) => {
      return sessionCache.increment(concatSessionId() + key, val);
    },
    decrement: (key: string | CachePaths<T>, val: number) => {
      return sessionCache.decrement(concatSessionId() + key, val);
    }
  };
};

export default session;
