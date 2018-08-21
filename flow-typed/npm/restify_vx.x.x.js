// @flow

declare module 'restify' {
  declare type Request = {
    body: string,
  };
  declare type Response = {
    send: (any) => void,
    end: () => void,
    redirect: (redirectTo: string, next: Next) => void,
  };
  declare type Next = () => void;
  declare export type RouteHandler = (request: Request, response: Response, next: Next) => mixed;
  declare export type Server = {
    url: string,
    get: (path: string, handler: RouteHandler) => void,
    listen: (port: number, callback: () => void) => void
  };
  declare export function createServer(): Server;
}
