// @flow

import type { ContentResource } from './content/types';
import type { MetaResource } from './meta/types';

export type Resource =
  | MetaResource
  | ContentResource;
