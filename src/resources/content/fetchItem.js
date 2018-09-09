// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJSON';

import type { Config } from '../../types';
import type { CMSItemID } from './types';
import type { Resource }from '../types';
import type { ItemResponse } from './items/types';

import { getContentApiDomain } from './api';
import { metaRequest } from '../meta/buildMetaResource';
import curatedList from './items/curatedList';
import autoList from './items/autoList';

const curatedListTemplateId = 'd58e6cd8-5f60-40be-ba1d-76a9dad6a4b5';
const autoListTemplateId = 'f0f56130-e9d6-43e1-8526-cdf40f5fce73';
const curatedLinkListTemplateId = '0c5effc7-8e22-471b-bf68-67986887239c';
const carouselTemplateId = '620aaf06-8c32-4644-b283-58ef9c3b7bbe';

const getItemUrl = (config: Config, itemId: CMSItemID): string =>
  `http://${getContentApiDomain(config)}/v1/cms/items/${itemId}?depthLimit=1`;

const fetchItem = async (config: Config, itemId: CMSItemID): Promise<Array<Resource>> => {
  const itemUrl = getItemUrl(config, itemId);
  const item: ItemResponse = await fetchJSON(itemUrl);
  switch (item.templateId) {
    case curatedListTemplateId:
      return [
        ...(await curatedList(config, item)),
        metaRequest(itemUrl),
      ];
    case autoListTemplateId:
      return [
        ...(await autoList(config, item)),
        metaRequest(itemUrl),
      ];
    case curatedLinkListTemplateId:
      return [
        metaRequest(itemUrl),
      ];
    case carouselTemplateId:
      console.log('carouselScream');
      return [
        metaRequest(itemUrl),
      ]
    default:
      return [metaRequest(itemUrl)];
  }
};

export default fetchItem;
