// @flow
import type { GUID } from '../../types';

import type { EpisodeID } from '../video/types';

export opaque type ItemID: GUID = GUID;
export opaque type TemplateID: GUID = GUID;

type ListContentResource = {
  type: 'list',
  id: ItemID,
  itemsIds: Array<EpisodeID>,
};

type HomepageContentResource = {
  type: 'page',
  id: ItemID,
  itemsIds: Array<ItemID>,
};

export type ContentResource =
  | ListContentResource
  | HomepageContentResource;
