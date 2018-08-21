// @flow
import type { GUID } from '../../types';

export opaque type EpisodeID: GUID = GUID;

export type EpisodeVideoResource = {
  type: 'vmsEpisode',
  id: EpisodeID,
  name: string,
  displayName: string,
  slug: string,
};

export type VideoResource =
  | EpisodeVideoResource;
