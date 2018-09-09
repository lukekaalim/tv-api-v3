// @flow
import type { CMSItemID } from './types';
import type { VMSEpisodeID } from '../video/types';

export type CMSCuratedEpisodeListResource = {
  type: 'cmsCuratedEpisodeList',
  id: CMSItemID,
  episodesIds: Array<VMSEpisodeID>,
};
export const buildCmsCuratedEpisodeListResource = (id: CMSItemID, episodesIds: Array<VMSEpisodeID>): CMSCuratedEpisodeListResource => ({
  type: 'cmsCuratedEpisodeList',
  id,
  episodesIds,
});

export default buildCmsCuratedEpisodeListResource;
