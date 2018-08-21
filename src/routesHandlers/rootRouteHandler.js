// @flow
import type { RouteHandler } from 'restify';
import type { Config } from '../types';

const rootRouteHandler = (config: Config): RouteHandler => (req, res, next) => {
  res.redirect('/home', next);
};

export default rootRouteHandler;
