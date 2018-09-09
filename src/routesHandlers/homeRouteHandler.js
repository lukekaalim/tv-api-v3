// @flow
import type { RouteHandler } from 'restify';
import type { Resource } from '../resources/types';
import type { Config } from '../types';

import fetchHomepage from '../resources/content/fetchHomepage';

const isMeta = (resource: Resource) => (
  resource.type === 'metaRequest'
);

const isDebug = (resource: Resource) => (
  resource.type === 'debug'
)

const homeRouteHandler = (config: Config): RouteHandler => (req, res, next) => {
  fetchHomepage(config)
    .then(resources => {
      res.send(resources.filter(res => !isMeta(res)))
      res.end();
    })
    .catch(({ message, stack }) => {
      res.status(500),
      res.send({ errorMessage: message, trace: stack })
      res.end();
    })
};

export default homeRouteHandler;
