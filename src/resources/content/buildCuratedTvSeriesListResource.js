// @flow
import type { CMSItemID } from './types';
import type { VMSTvSeriesID } from '../video/types';

export type CMSCuratedTvSeriesListResource = {
  type: 'cmsCuratedTvSeriesList',
  id: CMSItemID,
  tvSeriesIds: Array<VMSTvSeriesID>,
};
export const buildCmsCuratedTvSeriesListResource = (id: CMSItemID, tvSeriesIds: Array<VMSTvSeriesID>): CMSCuratedTvSeriesListResource => ({
  type: 'cmsCuratedTvSeriesList',
  id,
  tvSeriesIds,
});

export default buildCmsCuratedTvSeriesListResource;
