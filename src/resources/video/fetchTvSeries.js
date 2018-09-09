// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJSON';

import type { Config, URL } from '../../types';
import type { VMSTvSeriesID } from './types';
import type { Resource }from '../types';

import { vmsTvSeries } from './buildVideoResource';
import { getVideoApiDomain } from './api';

type TvSeriesResponse = {
  tvSeries: {
    id: VMSTvSeriesID,
    name: string,
  },
};

const getTvSeriesUrl = (config: Config, tvSeriesId: VMSTvSeriesID) =>
  `https://${getVideoApiDomain(config)}/api/v1/libraries/tv/tv-series/${tvSeriesId}`;

const fetchTvSeries = (config: Config, tvSeriesId: VMSTvSeriesID): Promise<Array<Resource>> => (
  fetchJSON(getTvSeriesUrl(config, tvSeriesId))
    .then((response: TvSeriesResponse) => {
      const { tvSeries } = response;
      return [
        vmsTvSeries(tvSeries.id, tvSeries.name),
      ];
    })
);

export default fetchTvSeries;
