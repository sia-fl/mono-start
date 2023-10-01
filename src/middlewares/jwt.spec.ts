import { describe, expect, it } from 'vitest';
import middlewareJwt from '../middlewares/jwt';
import { Hono } from 'hono';
import { ContextEnv, Controller } from '../types/rehono';
import app from '../index';
import { buildToken } from '../utils/func';

describe('middlewares/jwt', () => {
  it('jwt', async () => {
    const token = await buildToken({
      data: {
        id: 1,
        phone: '19977775555'
      }
    });
    const helloController = (c: Controller<ContextEnv>) => {
      const user = app().user();
      return c.jsonT({ success: true, data: user });
    };
    const route = new Hono();
    route.use('*', middlewareJwt);
    route.get('/', helloController);
    const response = await route.request('/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { success, data } = await response.json();
    expect(success).toBe(true);
    expect(data.id).toBe(1);
    expect(data.phone).toBe('19977775555');
  });
});
