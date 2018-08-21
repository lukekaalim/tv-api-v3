// @flow
import fetch from 'node-fetch';

type Options =
  | { method: 'POST', body: string | Buffer }
  | { method: 'GET' };

const throwOnNotOK = (response) => {
  if (!response.ok) {
    throw new Error('Response was not OK');
  }
  return response;
}

const fetchJSON = <TJsonShape>(
  url: string,
  opt?: Options,
): Promise<TJsonShape> => (
  fetch(url, opt)
    .then(throwOnNotOK)
    .then(response => response.json())
);

export default fetchJSON;