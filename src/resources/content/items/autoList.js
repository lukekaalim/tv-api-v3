// @flow
import type { Config } from '../../../types';
import type { CMSItemID } from '../types';
import type { VMSEpisodeID, VMSClipID, VMSTvSeriesID, VMSSeasonID, VMSGenreID } from '../../video/types';
import type { Resource }from '../../types';

import fetchEpisodes from '../../video/fetchEpisodes';
import fetchSeasonEpisodes from '../../video/fetchSeasonEpisodes';
import buildAutoEpisodeListResource from '../buildAutoEpisodeListResource';

type AutoListResponse = {
  contentFilters: {
    resourceType: 'episodes' | 'clips' | 'tv-series',
    inTvSeries: VMSTvSeriesID | '',
    inSeason: VMSSeasonID | '',
    inGenre: VMSGenreID | '',
    inEpisode: VMSEpisodeID | '',
    inTvSeriesSlug: string,
    inSeasonSlug: string,
    inEpisodeSlug: string,
    inGenreSlug: string,
    withTag: '',
    sortBy: 'number' | 'expiry',
    sortOrder: 'asc' | 'desc',
    take: number,
    skip: number,
    limit: number,
    offset: number
  },
  templateId: 'f0f56130-e9d6-43e1-8526-cdf40f5fce73',
  id: CMSItemID,
  title: string,
};

const flatten = (acc, curr) => [...acc, ...curr];

const nullIfEmptyString = (input) => input === '' ? null : input;

const parseSortBy = (sortBy) => {
  switch(sortBy) {
    default:
    case '':
      return null;
    case 'expiry':
      return '-expiry';
    case 'number':
      return '+number';
  }
};

const autoList = async (config: Config, autoListResponse: AutoListResponse): Promise<Array<Resource>> => {
  const {
    resourceType,
    inTvSeries,
    inSeason,
    sortBy,
    take,
    skip,
  } = autoListResponse.contentFilters;

  switch (resourceType) {
    case 'episodes': {
      if (inSeason !== '') {
        const episodes = await fetchSeasonEpisodes(
          config,
          inSeason,
          parseSortBy(sortBy),
          take,
          skip,
        );
        return [
          buildAutoEpisodeListResource(
            autoListResponse.id,
            episodes
              .filter(episode => episode.type === 'vmsEpisode')
              .map(episode => episode.id)
          ),
          ...episodes,
        ];
      }
      // ignore past here
      const episodes = await fetchEpisodes(
        config,
        inTvSeries === '' ? null : inTvSeries,
        parseSortBy(sortBy),
        take,
        skip,
      );
      return [
        { type: 'debug', autoListResponse },
        buildAutoEpisodeListResource(autoListResponse.id, episodes.map(episode => episode.id)),
        ...episodes,
      ];
    }
    default:
  }
  return [];
};

export default autoList;
