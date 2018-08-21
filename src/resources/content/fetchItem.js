// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJson';

import type { Config } from '../../types';
import type { ItemID, TemplateID } from './types';
import type { Resource }from '../types';

import { getContentApiDomain } from './api';

const CuratedListTemplateID = 'd58e6cd8-5f60-40be-ba1d-76a9dad6a4b5';

type CuratedList = {
  templateId: 'd58e6cd8-5f60-40be-ba1d-76a9dad6a4b5',
  id: ItemID,
};

type ItemResponse =
  | CuratedList;

const getItemUrl = (config: Config, itemId: ItemID): string =>
  `http://${getContentApiDomain(config)}/v1/cms/items/${itemId}?depthLimit=1`;


const fetchItem = (config: Config, itemId: ItemID): Promise<Array<Resource>> => (
  fetchJSON(getItemUrl(config, itemId))
    .then((item: ItemResponse) => {
      switch (item.templateId) {
        case CuratedListTemplateID:
          return [
            { type: 'list', id: item.id },
            { type: 'url-meta', url: getItemUrl(config, itemId), response: item, id: uuid() },
          ];
        default:
          return [];
      }
    })
);

export default fetchItem;
