import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { getStepTestConfigForStep } from '../../../test/config';
import { Steps } from '../constants';

describe('#fetchUsers', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchUsersShouldCollectData',
      options: {
        recordFailedRequests: true,
      },
    });
    const stepTestConfig = getStepTestConfigForStep(Steps.USERS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);
    expect(stepResults).toMatchStepMetadata(stepTestConfig);
  }, 20_000);
});
