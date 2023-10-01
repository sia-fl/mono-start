import { describe, expect, it } from 'vitest';
import {
  buildToken,
  codeL6,
  envParseToArray,
  envParseToJson,
  envParseToNumberArray,
  generateChinaMobile,
  keys
} from './func';

describe('utils/func', () => {
  it('keys', () => {
    expect(keys().jwt).toBe('123456');
  });

  it('generate china mobile', () => {
    const mobile = generateChinaMobile();
    expect(mobile.length).toBe(11);
    expect(mobile.startsWith('1')).toBe(true);
    expect(mobile.slice(1, 2)).toMatch(/[3-9]/);
    expect(mobile.slice(5, 6)).toMatch(/[0-9]/);
  });

  it('code length 6', () => {
    const code = codeL6();
    expect(code.length).toBe(6);
  });

  it('build token', async () => {
    const token = await buildToken({
      data: {
        id: 1,
        phone: '19977775555'
      }
    });
    expect(typeof token).toBe('string');
  });

  it('env parse to array', () => {
    const env = '1,2,3';
    const result = envParseToArray(env);
    expect(result).toEqual(['1', '2', '3']);
  });

  it('env parse to number array', () => {
    const env = '1,2,3';
    const result = envParseToNumberArray(env);
    expect(result).toEqual([1, 2, 3]);
  });

  it('env parse to json', () => {
    const env = '{"name": "test", "age": 18}';
    const result = envParseToJson(env);
    expect(result).toEqual({ name: 'test', age: 18 });
  });
});
