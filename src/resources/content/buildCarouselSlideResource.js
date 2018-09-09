// @flow
import type { CMSItemID } from './types';

export type CMSCarouselSlideResource = {
  type: 'cmsCarouselSlide',
  id: CMSItemID,
};
export const buildCmsCarouselSlideResource = (id: CMSItemID): CMSCarouselSlideResource => ({
  type: 'cmsCarouselSlide',
  id,
});

export default buildCmsCarouselSlideResource;
