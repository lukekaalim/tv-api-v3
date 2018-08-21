// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJson';

import type { Config } from '../../types';
import type { ItemID, TemplateID } from './types';
import type { Resource }from '../types';

import { getContentApiDomain } from './api';
import type { ItemResponse } from './items/types';
import curatedList from './items/curatedList';

const CuratedListTemplateID = 'd58e6cd8-5f60-40be-ba1d-76a9dad6a4b5';

const getItemUrl = (config: Config, itemId: ItemID): string =>
  `http://${getContentApiDomain(config)}/v1/cms/items/${itemId}?depthLimit=1`;

const fetchItem = (config: Config, itemId: ItemID): Promise<Array<Resource>> => (
  fetchJSON(getItemUrl(config, itemId))
    .then((item: ItemResponse) => {
      switch (item.templateId) {
        case CuratedListTemplateID:
          return curatedList(config, item).then(curatedList => [
            ...curatedList,
            { type: 'url-meta', url: getItemUrl(config, itemId), response: item, id: uuid() },
          ]);
        default:
          return [{ type: 'url-meta', url: getItemUrl(config, itemId), response: item, id: uuid() }];
      }
    })
);

export default fetchItem;
