// @flow

import type { ContentResource } from './content/types';
import type { VideoResource } from './video/types';
import type { MetaResource } from './meta/types';

export type Resource =
  | VideoResource
  | MetaResource
  | ContentResource;
