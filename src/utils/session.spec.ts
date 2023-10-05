// noinspection DuplicatedCode

import { describe, expect, it } from 'vitest';
import session from './session';
import { CacheType, KvCacheType } from 'mono-cache';
import { ctxSessionId } from '../context';

interface TestCacheState {
  aa: number;
  bb: number;
  cc: {
    dd: number;
  };
  ee: {
    ff: number[];
  };
}

const testGet = (c: CacheType<TestCacheState>) => {
  const getA = c.get('aa');
  expect(getA).toBe(undefined);
  c.set('bb', 1);
  const getB = c.get('bb');
  expect(getB).toBe(1);
  c.set('cc.dd', 2);
  const getC = c.get('cc');
  expect(getC).toEqual({ dd: 2 });
  const getCD = c.get('cc.dd');
  expect(getCD).toBe(2);
  c.set('ee.ff', [1, 2, 3]);
  const getEF = c.get('ee.ff');
  expect(getEF).toEqual([1, 2, 3]);
};

const testTtl = async (c: CacheType<TestCacheState>) => {
  c.set('aa', 1, 1000 * 2);
  const getA = c.get('aa');
  expect(getA).toBe(1);
  await new Promise(resolve => {
    setTimeout(() => {
      const getA = c.get('aa');
      expect(getA).toBe(undefined);
      resolve(undefined);
    }, 3000);
  });
};

describe('utils/session', () => {
  it('session get', async () => {
    const s = session<TestCacheState>().makeSafe();
    testGet(s);
    ctxSessionId.enterWith('test');
    testGet(s);
  });

  it('session ttl', async () => {
    const s = session<TestCacheState>().makeSafe();
    await testTtl(s);
  });

  it('session increment', () => {
    const s = session<TestCacheState>().makeSafe();
    s.set('aa', 1);
    s.increment('aa', 1);
    const getA = s.get('aa');
    expect(getA).toBe(2);
  });

  it('session decrement', () => {
    const s = session<TestCacheState>().makeSafe();
    s.set('aa', 1);
    s.decrement('aa', 1);
    const getA = s.get('aa');
    expect(getA).toBe(0);
  });
});

const testKvGet = (c: KvCacheType<TestCacheState>) => {
  const getA = c.get('aa');
  expect(getA).toBe(undefined);
  c.set('bb', 1);
  const getB = c.get('bb');
  expect(getB).toBe(1);
};

describe('kv cache', () => {
  it('kv get', () => {
    const c = session<TestCacheState>().makeKvSafe();
    testKvGet(c);
  });

  it('kv ttl', async () => {
    const c = session<TestCacheState>().makeKvSafe();
    await testTtl(c);
  });

  it('kv increment', () => {
    const c = session<TestCacheState>().makeKvSafe();
    c.set('aa', 1);
    c.increment('aa', 1);
    const getA = c.get('aa');
    expect(getA).toBe(2);
  });

  it('kv decrement', () => {
    const c = session<TestCacheState>().makeKvSafe();
    c.set('aa', 1);
    c.decrement('aa', 1);
    const getA = c.get('aa');
    expect(getA).toBe(0);
  });
});
