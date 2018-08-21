// @flow
import type { RouteHandler } from 'restify';
import type { Resource } from '../resources/types';
import type { Config } from '../types';

import fetchHomepage from '../resources/content/fetchHomepage';

const findRootPageId = (homepageResource: Array<Resource>) => {
  const rootPage = homepageResource.find(resource => resource.type === 'page');
  if (!rootPage) {
    throw new Error('Failed to resolve with a Useable Homepage');
  }
  return rootPage.id;
};

const zipById = resources => resources.reduce((acc, curr) => ({ ...acc, [(curr.id: string)]: curr }), {});

const countNetworkRequests = resources => (
  resources
    .filter(resource => resource.type === 'url-meta')
    .length
);

const removeMeta = resources => (
  resources
    .filter(resource => resource.type !== 'url-meta' && resource.type !== 'debug-meta')
);

const formatResponse = (homepageResource: Array<Resource>) => ({
  debug: {
    requests: countNetworkRequests(homepageResource),
  },
  rootId: findRootPageId(homepageResource),
  resources: zipById(removeMeta(homepageResource)),
});

const rootRouteHandler = (config: Config): RouteHandler => (req, res, next) => {
  fetchHomepage(config)
    .then(homepageResources => {
      res.send(formatResponse(homepageResources))
      res.end();
    });
};

export default rootRouteHandler;
