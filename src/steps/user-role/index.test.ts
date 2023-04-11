import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { getStepTestConfigForStep } from '../../../test/config';
import { Steps } from '../constants';

describe('#fetchUserRoles', () => {
  let recording: Recording;

  afterEach(async () => {
    await recording.stop();
  });

  test('should collect data', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchUserRolesShouldCollectData',
      options: {
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.USER_ROLES);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults.collectedEntities?.length).toBeTruthy;
    expect(stepResults.collectedRelationships).toHaveLength(0);
    expect(stepResults.collectedEntities).toMatchGraphObjectSchema({
      _class: ['AccessRole'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_user_role' },
          _key: { type: 'string' },
          name: { type: 'string' },
          updatedOn: { type: 'number' },
          updatedBy: { type: 'string' },
          opportunityAccessForAccountOwner: { type: 'string' },
          caseAccessForAccountOwner: { type: 'string' },
          contactAccessForAccountOwner: { type: 'string' },
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
