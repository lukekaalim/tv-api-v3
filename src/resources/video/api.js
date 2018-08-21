// @flow
import type { Config } from '../../types';

export const getVideoApiDomain = (config: Config) => {
  switch (config.environment) {
    case 'prod':
      return 'vms-api.mi9cdn.com';
    default:
      return 'uat.vms-api.mi9cdn.com';
  }
};