// @flow

import type { CMSResource } from './content/types';
import type { VMSResource } from './video/types';
import type { MetaResource } from './meta/types';

export type Resource =
  | VMSResource
  | MetaResource
  | CMSResource;
