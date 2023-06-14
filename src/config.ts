import {
  IntegrationExecutionContext,
  IntegrationValidationError,
  IntegrationInstanceConfigFieldMap,
  IntegrationInstanceConfig,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from './client';

/**
 * A type describing the configuration fields required to execute the
 * integration for a specific account in the data provider.
 *
 * When executing the integration in a development environment, these values may
 * be provided in a `.env` file with environment variables. For example:
 *
 * - `CLIENT_ID=123` becomes `instance.config.clientId = '123'`
 * - `CLIENT_SECRET=abc` becomes `instance.config.clientSecret = 'abc'`
 *
 * Environment variables are NOT used when the integration is executing in a
 * managed environment. For example, in JupiterOne, users configure
 * `instance.config` in a UI.
 */
export const instanceConfigFields: IntegrationInstanceConfigFieldMap = {
  refreshToken: {
    type: 'string',
    mask: true,
  },
  instanceUrl: {
    type: 'string',
  },
  clientId: {
    type: 'string',
  },
  clientSecret: {
    type: 'string',
    mask: true,
  },
  userRoleFilter: {
    type: 'string',
    optional: true,
  },
  userProfileFilter: {
    type: 'string',
    optional: true,
  },
};

/**
 * Properties provided by the `IntegrationInstance.config`. This reflects the
 * same properties defined by `instanceConfigFields`.
 */
export interface IntegrationConfig extends IntegrationInstanceConfig {
  /**
   * The provider API instance URL
   */
  instanceUrl: string;

  /**
   * The provider API client refresh token used to get new token if needed
   */
  refreshToken: string;

  /**
   * The provider API client id
   */
  clientId: string;

  /**
   * The provider API client secret
   */
  clientSecret: string;

  /**
   * OPTIONAL:  The role ID to filter user ingestion on.
   */
  userRoleFilter?: string[] | string;

  /**
   * OPTIONAL:  The profile ID to filter user ingestion on.
   */
  userProfileFilter?: string[] | string;
}

export async function validateInvocation(
  context: IntegrationExecutionContext<IntegrationConfig>,
) {
  const { config } = context.instance;

  if (
    !config.instanceUrl ||
    !config.refreshToken ||
    !config.clientId ||
    !config.clientSecret
  ) {
    throw new IntegrationValidationError(
      'Config requires all of {instanceUrl, refreshToken, clientId, clientSecret}',
    );
  }

  if (config.userRoleFilter && !Array.isArray(config.userRoleFilter)) {
    config.userRoleFilter = normalizeStringArrays(config.userRoleFilter);
  }

  if (config.userProfileFilter && !Array.isArray(config.userProfileFilter)) {
    config.userProfileFilter = normalizeStringArrays(config.userProfileFilter);
  }

  context.instance.config = config;
  const apiClient = createAPIClient(config);
  await apiClient.verifyAuthentication();
}

const EMTPY_STRING = /(^$)|(^\s+$)/;

// We may receive a single string or an array of strings delimited by commas.
export function normalizeStringArrays(
  userInput: string | string[] | undefined,
): string[] {
  if (Array.isArray(userInput)) {
    return userInput.filter((e) => !EMTPY_STRING.test(e)).map((e) => e.trim());
  } else if (userInput && !EMTPY_STRING.test(userInput)) {
    try {
      const parsedUsers = JSON.parse(userInput);
      return normalizeStringArrays(parsedUsers);
    } catch (err) {
      return normalizeStringArrays([userInput]);
    }
  } else {
    return [];
  }
}
