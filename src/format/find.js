// @flow
import type { Resource } from '../resources/types';

export const findType = (resources: Array<Resource>, type: $PropertyType<Resource, 'type'>) => {
  const firstInstanceOfType = resources.find(resource => resource.type === type);
  if (!firstInstanceOfType) {
    throw new Error('Failed to resolve with a Useable Homepage');
  }
  return firstInstanceOfType;
};