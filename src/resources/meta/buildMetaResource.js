// @flow

export type MetaRequestResource = {
  type: 'metaRequest',
  url: string,
};
export const metaRequest = (url: string) => ({
  type: 'metaRequest',
  url,
});

export type MetaResource =
  | MetaRequestResource