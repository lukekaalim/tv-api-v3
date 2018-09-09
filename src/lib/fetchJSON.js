// @flow
import fetch from 'node-fetch';

const throwOnNotOK = (response) => {
  if (!response.ok) {
    throw new Error('Response was not OK');
  }
  return response;
}

const fetchJSON = <TJsonShape>(
  url: string,
  opt?: RequestOptions,
): Promise<TJsonShape> => (
  fetch(url, opt)
    .then(throwOnNotOK)
    .then(response => response.json())
);

export default fetchJSON;