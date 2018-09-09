// @flow
import uuid from 'uuid/v4';
import fetchJSON from '../../lib/fetchJSON';

import type { Config, URL } from '../../types';
import type { VMSClipID } from './types';
import type { Resource }from '../types';

import { vmsClip } from './buildVideoResource';
import { getVideoApiDomain } from './api';

type ClipResponse = {
  clip: {
    id: VMSClipID,
    name: string,
  },
};

const getClipsUrl = (config: Config, clipId: VMSClipID) =>
  `https://${getVideoApiDomain(config)}/api/v1/libraries/tv/clips/${clipId}`;

const fetchClip = (config: Config, clipId: VMSClipID): Promise<Array<Resource>> => (
  fetchJSON(getClipsUrl(config, clipId))
    .then((response: ClipResponse) => {
      const { clip } = response;
      return [
        vmsClip(clip.id, clip.name),
      ];
    })
);

export default fetchClip;
