import { MiddlewareHandler, Context } from 'hono';

export declare type OnlyIn<T> = T extends MiddlewareHandler<any, any, infer I> ? I : any;

export declare type Controller<
  I = {},
  E extends ContextEnv = any,
  P extends string = any
> = Context<E, P, OnlyIn<I>>;

export declare type ContextEnv<B = Record<string, any>, V = Record<string, any>> = {
  Bindings?: B;
  Variables?: V;
};
