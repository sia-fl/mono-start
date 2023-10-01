import { sign } from 'hono/jwt';

export const keys = () => {
  return {
    jwt: process.env.KEY_JWT || '123456'
  };
};

/**
 * example: 18943218765 11 digits, 1 + 3-9\d + 9\d
 */
export const generateChinaMobile = () => {
  const firstFour = Math.floor(3 + Math.random() * (9 - 3 + 1));
  const lastFour = Math.floor(Math.random() * 999999999)
    .toString()
    .padStart(9, '0');
  return '1' + firstFour + lastFour;
};

/**
 * example: 213476 6 digits
 */
export const codeL6 = () => {
  return Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, '0');
};

const expDefault = 60 * 60 * 5;

interface BuildTokenOptions {
  exp?: number;
  key?: string;
  data: any;
}

export const buildToken = async (options: BuildTokenOptions) => {
  const now = Date.now();
  const nowWithoutMilliseconds = Math.floor(now / 1000);
  const exp = options.exp || expDefault;
  return await sign(
    {
      exp: nowWithoutMilliseconds + exp,
      data: options.data
    },
    options.key || keys().jwt
  );
};

export const envParseToArray = (env: string) => {
  return env.split(',').map(item => item.trim());
};

export const envParseToNumberArray = (env: string) => {
  return envParseToArray(env).map(item => parseInt(item));
};

/**
 * example: '{"name": "test", "age": 18}'
 */
export const envParseToJson = (env: string) => {
  return JSON.parse(env);
};
