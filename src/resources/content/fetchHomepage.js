// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJson';

import type { Config } from '../../types';
import type { ItemID, TemplateID } from './types';
import type { Resource }from '../types';

import { getContentApiDomain } from './api';
import fetchItem from './fetchItem';

type HomepageResponse = {
  id: ItemID,
  templateId: TemplateID,
  items: Array<{ id: ItemID }>,
};

const flatten = (acc, curr) => [...acc, ...curr];

const getHomePageUrl = (config: Config): string =>
  `http://${getContentApiDomain(config)}/v1/cms/items/sitecore/content/9vod/Site/Home%20Page?depthLimit=1`;

const fetchHomepage = (config: Config): Promise<Array<Resource>> => (
  fetchJSON(getHomePageUrl(config))
    .then((page: HomepageResponse) => {
      const itemIds = page.items.map(item => item.id);

      return Promise.all(itemIds.map(id => fetchItem(config, id)))
        .then(itemsResources => [
          ...itemsResources.reduce(flatten, []),
          { type: 'url-meta', url: getHomePageUrl(config), response: page, id: uuid() },
          { type: 'page', id: page.id, items: itemIds },
        ]);
    })
);

export default fetchHomepage;
