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
  const methods = <KeyType>() => {
    const s = cache<T>({
      namespace: 'session'
    }).makeSafe();
    return {
      get: <T2>(key: KeyType) => {
        return s.get((concatSessionId() + key) as any) as CacheGet<T, T2>;
      },
      set: (key: KeyType, val: any, ttl?: number) => {
        return s.set((concatSessionId() + key) as any, val, ttl);
      },
      del: (key: KeyType) => {
        return s.del((concatSessionId() + key) as any);
      },
      ttl: (key: KeyType, ttl: number) => {
        return s.ttl((concatSessionId() + key) as any, ttl);
      },
      increment: (key: KeyType, val: number) => {
        return s.increment((concatSessionId() + key) as any, val);
      },
      decrement: (key: KeyType, val: number) => {
        return s.decrement((concatSessionId() + key) as any, val);
      }
    };
  };
  const kvMethods = <KeyType>() => {
    const sKv = cache<T>({
      namespace: 'session'
    }).makeKvSafe();
    return {
      get: <T2>(key: KeyType) => {
        return sKv.get((concatSessionId() + key) as any) as CacheGet<T, T2>;
      },
      set: (key: KeyType, val: any, ttl?: number) => {
        return sKv.set((concatSessionId() + key) as any, val, ttl);
      },
      del: (key: KeyType) => {
        return sKv.del((concatSessionId() + key) as any);
      },
      ttl: (key: KeyType, ttl: number) => {
        return sKv.ttl((concatSessionId() + key) as any, ttl);
      },
      increment: (key: KeyType, val: number) => {
        return sKv.increment((concatSessionId() + key) as any, val);
      },
      decrement: (key: KeyType, val: number) => {
        return sKv.decrement((concatSessionId() + key) as any, val);
      }
    };
  };
  return {
    make() {
      return methods<string | CachePaths<T>>();
    },
    makeSafe() {
      return methods<CachePaths<T>>();
    },
    makeKv() {
      return kvMethods<string | keyof T>();
    },
    makeKvSafe() {
      return kvMethods<keyof T>();
    }
  };
};

export default session;
