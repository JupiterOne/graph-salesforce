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
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });
    const stepTestConfig = getStepTestConfigForStep(Steps.USERS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);
    expect(stepResults.collectedEntities?.length).toBeTruthy;
    expect(stepResults.collectedRelationships.length).toBeTruthy();
    expect(stepResults.collectedEntities).toMatchGraphObjectSchema({
      _class: ['User'],
      disableClassMatch: true,
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_user' },
          _key: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
          shortLoginId: { type: 'string' },
          name: { type: 'string' },
          createdBy: { type: 'string' },
          updatedBy: { type: 'string' },
          userType: { type: 'string' },
          active: { type: 'boolean' },
          userPermissionsMarketingUser: { type: 'boolean' },
          userPermissionsOfflineUser: { type: 'boolean' },
          userPermissionsCallCenterAutoLogin: { type: 'boolean' },
          userPermissionsSFContentUser: { type: 'boolean' },
          userPermissionsKnowledgeUser: { type: 'boolean' },
          userPermissionsInteractionUser: { type: 'boolean' },
          userPermissionsSupportUser: { type: 'boolean' },
          userPermissionsAvantgoUser: { type: 'boolean' },
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
