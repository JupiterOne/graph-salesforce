import {
  IntegrationProviderAuthenticationError,
  IntegrationValidationError,
} from '@jupiterone/integration-sdk-core';
import {
  createMockExecutionContext,
  setupRecording,
} from '@jupiterone/integration-sdk-testing';
import { IntegrationConfig, validateInvocation } from './config';

test('requires valid config', async () => {
  const executionContext = createMockExecutionContext<IntegrationConfig>({
    instanceConfig: {} as IntegrationConfig,
  });

  await expect(validateInvocation(executionContext)).rejects.toThrow(
    IntegrationValidationError,
  );
});

test('auth error', async () => {
  const recording = setupRecording({
    directory: 'src/__recordings__',
    name: 'client-auth-error',
    options: {
      recordFailedRequests: true,
    },
  });

  const executionContext = createMockExecutionContext({
    instanceConfig: {
      accessToken: 'INVALID',
      instanceUrl: 'https://howdy3-dev-ed.develop.my.salesforce.com',
      refreshToken: 'INVALID',
      clientId: 'INVALID',
      clientSecret: 'INVALID',
    },
  });
  await expect(validateInvocation(executionContext)).rejects.toThrow(
    IntegrationProviderAuthenticationError,
  );
  await recording.stop();
}, 10_000);
