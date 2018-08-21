// @flow

import { createServer } from 'restify';
import type { Config } from './types';

import homeRouteHandler from './routesHandlers/homeRouteHandler';
import rootRouteHandler from './routesHandlers/rootRouteHandler';

const app = (config: Config) => {
  const server = createServer();

  server.get('/', rootRouteHandler(config));
  server.get('/home', homeRouteHandler(config));

  server.listen(8080, function() {
    console.log('TV_API is running %s %s @ %s', config.environment, config.version, server.url)
  });
};

app({ environment: 'uat', version: '1.0.0' });