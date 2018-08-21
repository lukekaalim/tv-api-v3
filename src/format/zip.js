// @flow
import type { Resource } from '../resources/types';

export const zipById = (resources: Array<Resource>) => (
  resources
    .reduce((zippedResourcesSoFar, currentResource) => ({
      ...zippedResourcesSoFar,
      [(currentResource.id: string)]: currentResource,
    }), {})
);

export const zipByType = (resources: Array<Resource>) => (
  resources
    .reduce((zippedResourcesSoFar, currentResource) => ({
      ...zippedResourcesSoFar,
      [currentResource.type]: [ ...(zippedResourcesSoFar[currentResource.type] || []), currentResource],
    }), {})
);