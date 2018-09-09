// @flow
import { stringify } from 'querystring';
import fetchJSON from '../../lib/fetchJSON';

import type { Config, URL } from '../../types';
import type { VMSEpisodeID, VMSImageID, VMSTvSeriesID } from './types';
import type { Resource }from '../types';

import { getVideoApiDomain } from './api';

type EpisodesResponse = {
  count: number,
  episodes: Array<{
    id: VMSEpisodeID,
    name: string,
    displayName: string,
    slug: string,
    image: {
      id: VMSImageID,
      url: URL,
    }
  }>,
};

const getEpisodesUrl = (
  config: Config,
  tvSeriesID: ?VMSTvSeriesID,
  sort: null | '+number' | '-expiry',
  limit: number,
  offset: number,
): string =>
  `https://${getVideoApiDomain(config)}/api/v1/libraries/tv/episodes?${
    stringify({
      'tvSeries.id': tvSeriesID,
      sort,
      limit,
      offset,
    })
  }`;


const fetchEpisodes = (
  config: Config,
  tvSeriesID: ?VMSTvSeriesID,
  sort: null | '+number' | '-expiry',
  limit: number,
  offset: number,
): Promise<Array<Resource>> => (
  fetchJSON(getEpisodesUrl(config, tvSeriesID, sort, limit, offset))
    .then((response: EpisodesResponse) => {
      return response.episodes.map(episodeResponse => ({
        type: 'vmsEpisode',
        id: episodeResponse.id,
        name: episodeResponse.name,
        slug: episodeResponse.slug,
        displayName: episodeResponse.displayName,
        imageId: episodeResponse.image.id,
      }));
    })
);

export default fetchEpisodes;
