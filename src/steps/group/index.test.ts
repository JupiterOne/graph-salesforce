import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { getStepTestConfigForStep } from '../../../test/config';

import { Steps } from '../constants';

describe('#fetchGroups', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchGroupsShouldCollectData',
      options: {
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.GROUPS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults).toMatchStepMetadata(stepTestConfig);
  }, 20_000);

  test('should build group to user role relationship', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchGroupsShouldBuildUserRoleRelationship',
      options: {
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.GROUPS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults).toMatchStepMetadata(stepTestConfig);
  }, 20_000);
});

describe('#buildGroupRelationships', () => {
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
      Steps.BUILD_GROUP_RELATIONSHIPS,
    );
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults).toMatchStepMetadata(stepTestConfig);
  }, 20_000);
});
