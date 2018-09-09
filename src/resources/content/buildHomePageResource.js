// @flow
import type { CMSItemID } from './types';

export type CMSHomePageResource = {
  type: 'cmsHomePage',
  id: CMSItemID,
  listsIds: Array<CMSItemID>,
};

const buildCmsHomePageResource = (id: CMSItemID, listsIds: Array<CMSItemID>): CMSHomePageResource => ({
  type: 'cmsHomePage',
  id,
  listsIds,
});

export default buildCmsHomePageResource;
