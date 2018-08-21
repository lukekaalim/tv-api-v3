// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../../lib/fetchJson';

import type { Config } from '../../../types';
import type { ItemID, TemplateID } from '../types';
import type { EpisodeID } from '../../video/types';
import type { Resource }from '../../types';

import { getContentApiDomain } from '../api';
import fetchEpisode from '../../video/fetchEpisode';

export type CuratedListResponse = {
  templateId: 'd58e6cd8-5f60-40be-ba1d-76a9dad6a4b5',
  id: ItemID,
  items: Array<{ id: EpisodeID, resource: 'episodes' | 'tv-series' | 'clips' }>,
};

const flatten = (acc, curr) => [...acc, ...curr];

const curatedList = (config: Config, curatedList: CuratedListResponse): Promise<Array<Resource>> => {
  const itemsIds = curatedList.items.map(item => item.id);
  return Promise
    .all(curatedList.items.map((item) => {
      switch (item.resource) {
        case 'episodes':
          return fetchEpisode(config, item.id);
        default:
          return [];
      }
    }))
    .then(itemsResources => [
      ...itemsResources.reduce(flatten, []),
      { type: 'list', id: curatedList.id, itemsIds },
    ]);
};

export default curatedList;

