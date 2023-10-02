import { MiddlewareHandler } from 'hono';
import { ContextEnv } from '../types/rehono';
import { ctxAuthUser } from '../context';
import { parseToken } from '../utils/func';

const invalidMessage = 'token invalid';

const invalid = () => {
  throw new Error(invalidMessage);
};

const middlewareJwt: MiddlewareHandler<ContextEnv> = async (c, next) => {
  try {
    const result = await parseToken(c);
    if (!result) {
      invalid();
    }
    c.set('user', result.data);
    ctxAuthUser.enterWith(result.data);
  } catch (e) {
    return c.json({
      success: false,
      message: invalidMessage
    });
  }

  await next();
};

export default middlewareJwt;
