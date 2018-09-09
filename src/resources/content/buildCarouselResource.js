// @flow
import type { CMSItemID } from './types';

export type CMSCarouselResource = {
  type: 'cmsCarousel',
  id: CMSItemID,
  slidesIds: Array<CMSItemID>,
};
const buildCmsCarouselResource = (id: CMSItemID, slidesIds: Array<CMSItemID>): CMSCarouselResource => ({
  type: 'cmsCarousel',
  id,
  slidesIds,
});

export default buildCmsCarouselResource;
