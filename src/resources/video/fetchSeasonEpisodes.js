// @flow
import { stringify } from 'querystring';
import fetchJSON from '../../lib/fetchJSON';

import type { Config, URL } from '../../types';
import type { VMSEpisodeID, VMSImageID, VMSSeasonID } from './types';
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

const getSeasonEpisodesUrl = (
  config: Config,
  seasonID: VMSSeasonID,
  sort: null | '+number' | '-expiry',
  limit: number,
  offset: number,
): string =>
  `https://${getVideoApiDomain(config)}/api/v1/libraries/tv/seasons/${seasonID}/episodes?${
    stringify({
      sort,
      limit,
      offset,
    })
  }`;


const fetchSeasonEpisodes = (
  config: Config,
  seasonID: VMSSeasonID,
  sort: null | '+number' | '-expiry',
  limit: number,
  offset: number,
): Promise<Array<Resource>> => (
  fetchJSON(getSeasonEpisodesUrl(config, seasonID, sort, limit, offset))
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

export default fetchSeasonEpisodes;
