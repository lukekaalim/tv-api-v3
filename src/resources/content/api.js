// @flow
import type { Config } from '../../types';

export const getContentApiDomain = (config: Config) => {
  switch (config.environment) {
    case 'prod':
      return 'content.api.ninemsn.com.au';
    default:
      return 'uat.content.api.ninemsn.com.au';
  }
};