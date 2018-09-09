// @flow
import type { Config } from '../../types';

export const getContentApiDomain = (config: Config) => {
  switch (config.environment) {
    case 'prod':
      return 'content.api.ninemsn.com.au';
    case 'stag':
      return 'content.api.ninemsn.com.au';
    case 'uat':
    default:
      return 'content.api.uat.ninemsn.com.au';
  }
};
