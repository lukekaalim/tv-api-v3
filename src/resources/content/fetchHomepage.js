// @flow
import fetchJSON from '../../lib/fetchJSON';

import type { Config } from '../../types';
import type { CMSItemID } from './types';
import type { Resource }from '../types';

import { getContentApiDomain } from './api';
import fetchItem from './fetchItem';

import buildCmsHomePageResource from './buildHomePageResource';
import { metaRequest } from '../meta/buildMetaResource';

type HomepageResponse = {
  id: CMSItemID,
  carousel: { id: CMSItemID },
  items: Array<{ id: CMSItemID }>,
};

const flatten = (acc, curr) => [...acc, ...curr];

const getHomePageUrl = (config: Config): string =>
  `http://${getContentApiDomain(config)}/v1/cms/items/sitecore/content/9vod/Site/Home%20Page?depthLimit=1`;

const fetchHomepage = async (config: Config): Promise<Array<Resource>> => {
  const homePageUrl = getHomePageUrl(config);
  const page: HomepageResponse = await fetchJSON(homePageUrl);
  const itemsIds = [page.carousel.id, ...page.items.map(item => item.id)];
  const itemsResources = await Promise.all(itemsIds.map(id => fetchItem(config, id)));

  return [
    ...itemsResources.reduce(flatten, []),
    metaRequest(getHomePageUrl(config)),
    buildCmsHomePageResource(page.id, itemsIds),
  ];
};

export default fetchHomepage;
