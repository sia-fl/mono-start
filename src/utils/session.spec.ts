// noinspection DuplicatedCode

import { describe, expect, it } from 'vitest';
import session from './session';
import { BaseCacheType } from 'mono-cache';
import { ctxSessionId } from '../context';

interface TestCacheState {
  a: number;
  b: number;
  c: {
    d: number;
  };
  e: {
    f: number[];
  };
}

const testGet = (c: BaseCacheType<TestCacheState>) => {
  const getA = c.get('a');
  expect(getA).toBe(undefined);
  c.set('b', 1);
  const getB = c.get('b');
  expect(getB).toBe(1);
  c.set('c.d', 2);
  const getC = c.get('c');
  expect(getC).toEqual({ d: 2 });
  const getCD = c.get('c.d');
  expect(getCD).toBe(2);
  c.set('e.f', [1, 2, 3]);
  const getEF = c.get('e.f');
  expect(getEF).toEqual([1, 2, 3]);
};

describe('utils/session', () => {
  it('session get', async () => {
    const s = session<TestCacheState>();
    s.set('ww', 2);
    testGet(s);
    ctxSessionId.enterWith('test');
    testGet(s);
  });

  it('session ttl', async () => {
    const s = session<TestCacheState>();
    s.set('a', 1, 1000 * 2);
    const getA = s.get('a');
    expect(getA).toBe(1);
    await new Promise(resolve => {
      setTimeout(() => {
        const getA = s.get('a');
        expect(getA).toBe(undefined);
        resolve(undefined);
      }, 3000);
    });
  });

  it('session increment', () => {
    const s = session<TestCacheState>();
    s.set('a', 1);
    s.increment('a', 1);
    const getA = s.get('a');
    expect(getA).toBe(2);
  });

  it('session decrement', () => {
    const s = session<TestCacheState>();
    s.set('a', 1);
    s.decrement('a', 1);
    const getA = s.get('a');
    expect(getA).toBe(0);
  });
});
