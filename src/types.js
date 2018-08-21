// @flow

/**
 * Type implementation for a Globally Unique Identifier
 */
export opaque type GUID: string = string;

/**
 * Different states for environment
 */
export type Environment = 'prod' | 'stag' | 'uat' | 'test' | 'local';

/**
 * Application level configuration file
 */
export type Config = {
  environment: Environment,
  version: string,
};
