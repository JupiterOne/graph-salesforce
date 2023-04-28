import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { getStepTestConfigForStep } from '../../../test/config';

import { Steps } from '../constants';

describe('#fetchPermissionSets', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchPermissionSetsShouldCollectData',
      options: {
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.PERMISSION_SETS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults).toMatchStepMetadata(stepTestConfig);
  }, 20_000);
});

describe('#buildUserPermissionSetRelationships', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'buildUserGroupUserRelationshipsShouldCollectData',
      options: {
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(
      Steps.BUILD_USER_ASSIGNED_PERMISSION_SETS,
    );
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults).toMatchStepMetadata(stepTestConfig);
  }, 20_000);
});
