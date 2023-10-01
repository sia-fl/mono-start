import { MiddlewareHandler } from 'hono';
import { ContextEnv } from '../types/rehono';
import { ctxSessionId } from '../context';
import * as crypto from 'crypto';
import { getCookie, setCookie } from 'hono/cookie';

const HONO_SESSION_ID = 'hono_son_id';

const middlewareSessionId: MiddlewareHandler<ContextEnv> = async (c, next) => {
  let sessionId = getCookie(c, HONO_SESSION_ID);
  if (!sessionId) {
    sessionId = crypto.randomBytes(32).toString('hex');
    setCookie(c, HONO_SESSION_ID, sessionId);
  }
  ctxSessionId.enterWith(sessionId);

  await next();
};

export default middlewareSessionId;
