// @flow
import type { CMSItemID } from './types';
import type { VMSEpisodeID } from '../video/types';

export type CMSAutoEpisodeListResource = {
  type: 'cmsAutoEpisodeList',
  id: CMSItemID,
  episodeIds: Array<VMSEpisodeID>,
};
export const buildAutoEpisodeListResource = (id: CMSItemID, episodeIds: Array<VMSEpisodeID>): CMSAutoEpisodeListResource => ({
  type: 'cmsAutoEpisodeList',
  id,
  episodeIds,
});

export default buildAutoEpisodeListResource;
