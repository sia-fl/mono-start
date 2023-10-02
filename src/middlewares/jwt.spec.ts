import { beforeAll, describe, expect, it } from 'vitest';
import { Hono } from 'hono';
import { ContextEnv, Controller } from '../types/rehono';
import app, { middlewareJwt } from '../index';
import { buildToken } from '../utils/func';

describe('middlewares/jwt', () => {
  let token: string;

  beforeAll(async () => {
    token = await buildToken({
      data: {
        id: 1,
        phone: '19977775555'
      }
    });
  });

  it('jwt app user', async () => {
    const jwtAppUserController = (c: Controller<ContextEnv>) => {
      const user = app().user();
      return c.jsonT({ success: true, data: user });
    };
    const route = new Hono();
    route.use('*', middlewareJwt);
    route.get('/app/user', jwtAppUserController);
  });

  it('jwt ctx user', async () => {
    const jwtCtxUserController = (c: Controller<ContextEnv>) => {
      const user = c.get('user');
      return c.jsonT({ success: true, data: user });
    };
    const route = new Hono();
    route.use('*', middlewareJwt);
    route.get('/ctx/user', jwtCtxUserController);
    const response = await route.request('/ctx/user', {
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
