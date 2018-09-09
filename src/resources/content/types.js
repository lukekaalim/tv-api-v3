// @flow
import type { GUID } from '../../types';

import type { CMSCarouselResource } from './buildCarouselResource';
import type { CMSCarouselSlideResource } from './buildCarouselSlideResource';
import type { CMSCuratedClipListResource } from './buildCuratedClipListResource';
import type { CMSCuratedEpisodeListResource } from './buildCuratedEpisodeListResource';
import type { CMSCuratedTvSeriesListResource } from './buildCuratedTvSeriesListResource';
import type { CMSHomePageResource } from './buildHomePageResource';

export type CMSResource =
  | CMSCarouselResource
  | CMSCarouselSlideResource
  | CMSCuratedClipListResource
  | CMSCuratedEpisodeListResource
  | CMSCuratedTvSeriesListResource
  | CMSHomePageResource

export opaque type CMSItemID: GUID = GUID;
export opaque type CMSTemplateID: GUID = GUID;
