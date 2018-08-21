// @flow
import type { Resource } from '../resources/types';

export const filterType = (resources: Array<Resource>, type: $PropertyType<Resource, 'type'>) => (
  resources
    .filter(resource => resource.type !== type)
);
