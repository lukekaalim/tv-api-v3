// @flow
import type { URL } from '../../types';

export type { VMSResource } from './buildVideoResource';

export opaque type VMSEpisodeID: number = number;
export opaque type VMSTvSeriesID: number = number;
export opaque type VMSClipID: number = number;
export opaque type VMSImageID: number = number;
export opaque type VMSSeasonID: number = number;
export opaque type VMSGenreID: number = number;

export type EpisodeVideoResource = {
  type: 'vmsEpisode',
  id: VMSEpisodeID,
  name: string,
  displayName: string,
  slug: string,
};

export type ImageResource = {
  type: 'image',
  url: URL,
};
