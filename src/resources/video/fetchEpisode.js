// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJSON';

import type { Config, URL } from '../../types';
import type { VMSEpisodeID, VMSImageID } from './types';
import type { Resource }from '../types';

import { getVideoApiDomain } from './api';

type EpisodeResponse = {
  episode: {
    id: VMSEpisodeID,
    name: string,
    displayName: string,
    slug: string,
    image: {
      id: VMSImageID,
      url: URL,
    }
  },
};

const getItemUrl = (config: Config, episodeId: VMSEpisodeID): string =>
  `https://${getVideoApiDomain(config)}/api/v1/libraries/tv/episodes/${episodeId}`;


const fetchItem = (config: Config, episodeId: VMSEpisodeID): Promise<Array<Resource>> => (
  fetchJSON(getItemUrl(config, episodeId))
    .then((response: EpisodeResponse) => {
      const { episode } = response;
      return [
        //{ type: 'image', id: episode.image.id, url: episode.image.url },
        {
          type: 'vmsEpisode',
          id: episode.id,
          name: episode.name,
          slug: episode.slug,
          displayName: episode.displayName,
          imageId: episode.image.id,
        },
      ];
    })
);

export default fetchItem;
