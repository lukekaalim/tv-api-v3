// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJson';

import type { Config } from '../../types';
import type { EpisodeID } from './types';
import type { Resource }from '../types';

import { getVideoApiDomain } from './api';

type EpisodeResponse = {
  episode: {
    id: EpisodeID,
    name: string,
    displayName: string,
    slug: string,
  },
};

const getItemUrl = (config: Config, episodeId: EpisodeID): string =>
  `https://${getVideoApiDomain(config)}/api/v1/libraries/tv/episodes/${episodeId}`;


const fetchItem = (config: Config, episodeId: EpisodeID): Promise<Array<Resource>> => (
  fetchJSON(getItemUrl(config, episodeId))
    .then((response: EpisodeResponse) => {
      const { episode } = response;
      return [
        { type: 'vmsEpisode', id: episode.id, name: episode.name, slug: episode.slug, displayName: episode.displayName },
        { type: 'url-meta', url: getItemUrl(config, episodeId), response: episode, id: uuid() },
      ];
    })
);

export default fetchItem;
