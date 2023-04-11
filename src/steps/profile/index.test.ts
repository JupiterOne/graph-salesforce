import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { getStepTestConfigForStep } from '../../../test/config';

import { Steps } from '../constants';

describe('#fetchProfiles', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchProfilesShouldCollectData',
      options: {
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.PROFILES);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults.collectedEntities?.length).toBeTruthy;
    expect(stepResults.collectedRelationships).toHaveLength(0);
    expect(stepResults.collectedEntities).toMatchGraphObjectSchema({
      _class: ['Account'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_profile' },
          _key: { type: 'string' },
          name: { type: 'string' },
          updatedOn: { type: 'number' },
          updatedBy: { type: 'string' },
          createdOn: { type: 'number' },
          createBy: { type: 'string' },
          description: { type: 'string' },
          userType: { type: 'string' },
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
        },
        required: [],
      },
    });
  }, 10_000);
});
