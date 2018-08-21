// @flow
import type { RouteHandler } from 'restify';
import got from 'got';

const CMS_HOMEPAGE_URL = 'http://content.api.ninemsn.com.au/v1/cms/items/sitecore/content/9vod/Site/Home%20Page';
const buildCMSItemURL = (ID: string) => `http://content.api.ninemsn.com.au/v1/cms/items/${ID}`;

type SimpleItem = { id: string };

type Page = {
  id: string,
  listIds: Array<string>,
};

type List = {
  id: string,
  itemIds: Array<string>
};

type Item = {
  id: string,
  type: string,
};

type ResourcesMap = {
  resources: Array<string>,
  pages: Array<Page>,
  lists: Array<List>,
  items: Array<Item>,
};

const addPage = (page: Page) => (resMap: ResourcesMap): ResourcesMap => ({
  ...resMap,
  pages: [...resMap.pages, page],
});

const addList = (list: List) => (resMap: ResourcesMap): ResourcesMap => ({
  ...resMap,
  lists: [...resMap.lists, list],
});

const addItem = (item: Item) => (resMap: ResourcesMap): ResourcesMap => ({
  ...resMap,
  items: [...resMap.items, item],
});

type ResourceOperation = (input: ResourcesMap) => ResourcesMap;

// Strategy is to traverse the Resource tree, normalizing it and registering our intent to
// Modify it by applying thunks in order
const DEFAULT_RESOURCES_MAP: ResourcesMap = {
  resources: ['pages', 'lists', 'items', 'episodes'],
  pages: [],
  lists: [],
  items: [],
};

type Dispatch = (op: ResourceOperation) => void;

const TEMPLATE_MAP = {
  'Carousel': '620aaf06-8c32-4644-b283-58ef9c3b7bbe',
  'Curated List': 'd58e6cd8-5f60-40be-ba1d-76a9dad6a4b5',
};

const getCarouselItem = async (dispatch: Dispatch, itemUrl: string): Promise<?Item> => {
  const { body } = (await got(itemUrl, { json: true }));
};

const getList = async (dispatch: Dispatch, listURL: string): Promise<?List> => {
  console.log(listURL);
  const { body } = (await got(listURL, { json: true }));

  switch (body.templateId) {
    case TEMPLATE_MAP['Curated List']: {
      const items = body.items;
      console.log(items);
      const list = {
        id: body.id,
        itemIds: items.map(item => item.id),
      };
      items.map(item => dispatch(addItem(item)));
      dispatch(addList(list));
      return list;
    }
    default:
      return null;
  }
};

const getHomePage = async (dispatch: Dispatch) => {
  const { body } = (await got(CMS_HOMEPAGE_URL, { json: true }));

  const listsURLs = body.items;
  const lists = await Promise.all(
    listsURLs.map(listUrl => getList(dispatch, listUrl))
  );

  const page = {
    id: body.id,
    listIds: lists.map(list => list.id),
  };
  dispatch(addPage(page));
  return page;
};

const homeRouteHandler: RouteHandler = async (req, res, next) => {
  try {
    const operations = [];
    const addOperation = (op: ResourceOperation) => {
      operations.push(op);
    }

    await getHomePage(addOperation);

    const resources = operations.reduce((acc, curr) => ({ ...acc, ...curr(acc) }), DEFAULT_RESOURCES_MAP);

    res.send(resources);
  } catch (error) {
    console.error(error);
  }
  res.end();
};

export default homeRouteHandler;
