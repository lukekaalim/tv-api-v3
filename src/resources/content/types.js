// @flow
import type { GUID } from '../../types';

export opaque type ItemID: GUID = GUID;
export opaque type TemplateID: GUID = GUID;

type ListContentResource = {
  type: 'list',
  id: ItemID,
};

type HomepageContentResource = {
  type: 'page',
  id: ItemID,
  items: Array<ItemID>,
};

export type ContentResource =
  | ListContentResource
  | HomepageContentResource;
