// @flow
import type { RouteHandler } from 'restify';
import type { Resource } from '../resources/types';
import type { Config } from '../types';

import type { UrlMetaResource } from '../resources/meta/types';

import { zipByType } from '../format/zip';
import { countType } from '../format/count';
import { filterType } from '../format/filter';
import { findType } from '../format/find';

import fetchHomepage from '../resources/content/fetchHomepage';

const formatResponse = (homepageResource: Array<Resource>) => ({
  debug: {
    requests: countType(homepageResource, 'url-meta'),
    requestBodySizeKiloBytes: Math.ceil(homepageResource
      .map(resource => resource.type === 'url-meta' ? JSON.stringify(resource.response) : '')
      .reduce((acc, curr) => acc + curr.length, 0)
      * 2
      / 1024),
  },
  rootId: findType(homepageResource, 'page').id,
  resources: zipByType(filterType(homepageResource, 'url-meta')),
});

const homeRouteHandler = (config: Config): RouteHandler => (req, res, next) => {
  fetchHomepage(config)
    .then(homepageResources => {
      res.send(formatResponse(homepageResources))
      res.end();
    });
};

export default homeRouteHandler;
