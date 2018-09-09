// @flow
import type { Config } from '../../../types';
import type { CMSItemID } from '../types';
import type { VMSEpisodeID, VMSClipID, VMSTvSeriesID } from '../../video/types';
import type { Resource }from '../../types';

import buildCuratedClipListResource from '../buildCuratedClipListResource';
import buildCuratedEpisodeListResource from '../buildCuratedEpisodeListResource';
import buildCuratedTvSeriesListResource from '../buildCuratedTvSeriesListResource';
import { metaRequest } from '../../meta/buildMetaResource';

import { getContentApiDomain } from '../api';
import fetchEpisode from '../../video/fetchEpisode';
import fetchTvSeries from '../../video/fetchTvSeries';
import fetchClip from '../../video/fetchClip';

type EpisodeResourceResponse = { resource: 'episodes', id: VMSEpisodeID };
type ClipsResourceResponse = { resource: 'clips', id: VMSClipID };
type TvSeriesResourceResponse = { resource: 'tv-series', id: VMSTvSeriesID };

export type CuratedListResponse = {
  templateId: 'd58e6cd8-5f60-40be-ba1d-76a9dad6a4b5',
  id: CMSItemID,
  items: Array<any>, // Flow type is dumb and cant distinguish homogenous union arrays.
};

const flatten = (acc, curr) => [...acc, ...curr];

const curatedList = async (config: Config, curatedListResponse: CuratedListResponse): Promise<Array<Resource>> => {
  const listType = curatedListResponse.items[0] ? curatedListResponse.items[0].resource : null;
  const isListHomogenous = curatedListResponse.items.every(item => item.resource === listType);
  if (!isListHomogenous) {
    return [];
  }
  switch (listType) {
    case 'episodes': {
      const episodeItems: Array<EpisodeResourceResponse> = curatedListResponse.items;
      const episodesIds = episodeItems.map(item => item.id);
      return [
        ...(await Promise.all(episodesIds.map(id => fetchEpisode(config, id)))).reduce(flatten, []),
        buildCuratedEpisodeListResource(curatedListResponse.id, episodesIds),
      ];
    }
    case 'tv-series': {
      const tvSeriesItems: Array<TvSeriesResourceResponse> = curatedListResponse.items;
      const tvSeriesIds = tvSeriesItems.map(item => item.id);
      return [
        ...(await Promise.all(tvSeriesIds.map(id => fetchTvSeries(config, id)))).reduce(flatten, []),
        buildCuratedTvSeriesListResource(curatedListResponse.id, tvSeriesIds),
      ];
    }
    case 'clips': {
      const clipsItems: Array<ClipsResourceResponse> = curatedListResponse.items;
      const clipsIds = clipsItems.map(item => item.id);
      return [
        ...(await Promise.all(clipsIds.map(id => fetchClip(config, id)))).reduce(flatten, []),
        buildCuratedClipListResource(curatedListResponse.id, clipsIds),
      ];
    }
    default:
      return [];
  }
};

export default curatedList;
