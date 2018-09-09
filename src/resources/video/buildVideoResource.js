// @flow
/*
export const vmsEpisode = (id: ) => ({

});

*/

export type VMSEpisodeResource = {
  type: 'vmsEpisode',
  id: VMSEpisodeID,
  name: string,
};
export type VMSTvSeriesResource = {
  type: 'vmsTvSeries',
  id: VMSTvSeriesID,
  name: string,
};
export const vmsTvSeries = (id: VMSTvSeriesID, name: string) => ({
  type: 'vmsTvSeries',
  id,
  name,
});

export type VMSClipResource = {
  type: 'vmsClip',
  id: VMSClipID,
  name: string,
};
export const vmsClip = (id: VMSClipID, name: string) => ({
  type: 'vmsClip',
  id,
  name,
});

export type VMSResource =
  | VMSTvSeriesResource
  | VMSClipResource
  | VMSEpisodeResource