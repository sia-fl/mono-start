// noinspection DuplicatedCode

import { describe, expect, it } from 'vitest';
import { Hono } from 'hono';
import { ContextEnv, Controller } from '../types/rehono';
import app from '../app';
import { middlewareSession } from '../index';

describe('middlewares/session', () => {
  it('session', async () => {
    const helloController = (c: Controller<ContextEnv>) => {
      const requestId = app().sessionId();
      return c.jsonT({ success: true, data: requestId });
    };
    const route = new Hono();
    route.use('*', middlewareSession);
    route.get('/', helloController);
    const response = await route.request('/');
    const { success, data } = await response.json();
    expect(success).toBe(true);
    expect(typeof data).toBe('string');
    expect(data.length).toBe(64);
  });
});
