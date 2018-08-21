// @flow

export type UrlMetaResource = {
  type: 'url-meta',
  url: string,
  response: any,
  id: string,
};

export type DebugMetaResource = {
  type: 'debug-meta',
  debug: any,
  id: string,
}

export type MetaResource =
  | DebugMetaResource
  | UrlMetaResource;