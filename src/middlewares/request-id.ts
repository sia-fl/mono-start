import { MiddlewareHandler } from 'hono';
import { ContextEnv } from '../types/rehono';
import { ctxRequestId } from '../context';
import * as crypto from 'crypto';

const middlewareRequestId: MiddlewareHandler<ContextEnv> = async (_, next) => {
  ctxRequestId.enterWith(crypto.randomBytes(32).toString('hex'));

  await next();
};

export default middlewareRequestId;
