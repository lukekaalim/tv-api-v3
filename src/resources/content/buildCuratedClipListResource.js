// @flow
import type { CMSItemID } from './types';
import type { VMSClipID } from '../video/types';

export type CMSCuratedClipListResource = {
  type: 'cmsCuratedClipList',
  id: CMSItemID,
  clipsIds: Array<VMSClipID>,
};
export const builldCmsCuratedClipListResource = (id: CMSItemID, clipsIds: Array<VMSClipID>): CMSCuratedClipListResource => ({
  type: 'cmsCuratedClipList',
  id,
  clipsIds,
});

export default builldCmsCuratedClipListResource;
