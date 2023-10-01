import { MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';
import { ContextEnv } from '../types/rehono';
import { ctxAuthUser } from '../context';
import { keys } from '../utils/func';

const invalidMessage = 'token invalid';

const invalid = () => {
  throw new Error(invalidMessage);
};

const middlewareJwt: MiddlewareHandler<ContextEnv> = async (c, next) => {
  let token = c.req.header('Authorization');
  if (!token) {
    return c.json({
      success: false,
      message: 'token not found'
    });
  }
  token = token.replace('Bearer ', '');

  try {
    const ok = await verify(token, keys().jwt);
    if (!ok) {
      invalid();
    }
    c.set('user', () => ok.data);
    ctxAuthUser.enterWith(ok.data);
  } catch (e) {
    return c.json({
      success: false,
      message: invalidMessage
    });
  }

  await next();
};

export default middlewareJwt;
