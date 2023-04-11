import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { RelationshipClass } from '@jupiterone/integration-sdk-core';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { getStepTestConfigForStep } from '../../../test/config';

import { Relationships, Steps } from '../constants';

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
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.GROUPS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults.collectedEntities?.length).toBeTruthy;
    expect(stepResults.collectedRelationships.length).toBeTruthy();
    expect(stepResults.collectedEntities).toMatchGraphObjectSchema({
      _class: ['Group'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_group' },
          _key: { type: 'string' },
          name: { type: 'string' },
          createdOn: { type: 'number' },
          createdBy: { type: 'string' },
          updatedOn: { type: 'number' },
          updatedBy: { type: 'string' },
          developerName: { type: 'string' },
          groupType: { type: 'string' },
          ownerId: { type: 'string' },
          doesSendEmailToMembers: { type: 'boolean' },
          doesIncludeBosses: { type: 'boolean' },
          _rawData: {
            type: 'array',
            items: { type: 'object' },
          },
        },
        required: [],
      },
    });
  }, 10_000);

  test('should build group to user role relationship', async () => {
    recording = setupSalesforceRecording({
      directory: __dirname,
      name: 'fetchGroupsShouldBuildUserRoleRelationship',
      options: {
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.GROUPS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    // Check that group to role relationship was built
    expect(stepResults.collectedRelationships?.length).toBeTruthy;

    // Group to group relationship
    expect(
      stepResults.collectedRelationships.filter(
        (r) => r._type === Relationships.GROUP_ASSIGNED_USER_ROLE._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.ASSIGNED },
          _type: { const: Relationships.GROUP_ASSIGNED_USER_ROLE._type },
        },
      },
    });
  }, 10_000);
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
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(
      Steps.BUILD_GROUP_RELATIONSHIPS,
    );
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults.collectedRelationships?.length).toBeTruthy;

    // Group to group relationship
    expect(
      stepResults.collectedRelationships.filter(
        (r) => r._type === Relationships.GROUP_HAS_GROUP._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.HAS },
          _type: { const: Relationships.GROUP_HAS_GROUP._type },
        },
      },
    });

    // Group to user relationship
    expect(
      stepResults.collectedRelationships.filter(
        (r) => r._type === Relationships.GROUP_HAS_USER._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.HAS },
          _type: { const: Relationships.GROUP_HAS_USER._type },
        },
      },
    });
  }, 10_000);
});
