import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';
import { RelationshipClass } from '@jupiterone/integration-sdk-core';

import {
  Recording,
  setupSalesforceRecording,
} from '../../../test/helpers/recording';

import { getStepTestConfigForStep } from '../../../test/config';

import { Relationships, Steps } from '../constants';

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
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(Steps.PERMISSION_SETS);
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults.collectedEntities?.length).toBeTruthy;
    expect(stepResults.collectedRelationships.length).toBeTruthy();
    expect(stepResults.collectedEntities).toMatchGraphObjectSchema({
      _class: ['AccessPolicy'],
      schema: {
        additionalProperties: true,
        properties: {
          _type: { const: 'salesforce_permission_set' },
          _key: { type: 'string' },
          name: { type: 'string' },
          label: { type: 'string' },
          licenseId: { type: 'string' },
          profileId: { type: 'string' },
          isOwnedByProfile: { type: 'boolean' },
          isCustom: { type: 'boolean' },
          permissionsEmailSingle: { type: 'boolean' },
          permissionsEmailMass: { type: 'boolean' },
          permissionsEditTask: { type: 'boolean' },
          permissionsEditEvent: { type: 'boolean' },
          permissionsExportReport: { type: 'boolean' },
          permissionsImportPersonal: { type: 'boolean' },
          permissionsDataExport: { type: 'boolean' },
          permissionsManageUsers: { type: 'boolean' },
          permissionsEditPublicFilters: { type: 'boolean' },
          permissionsEditPublicTemplates: { type: 'boolean' },
          permissionsModifyAllData: { type: 'boolean' },
          permissionsManageCases: { type: 'boolean' },
          permissionsMassInlineEdit: { type: 'boolean' },
          permissionsEditKnowledge: { type: 'boolean' },
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
        matchRequestsBy: {
          url: {
            hostname: false,
          },
        },
        recordFailedRequests: true,
      },
    });

    const stepTestConfig = getStepTestConfigForStep(
      Steps.BUILD_USER_ASSIGNED_PERMISSION_SETS,
    );
    const stepResults = await executeStepWithDependencies(stepTestConfig);

    expect(stepResults.collectedRelationships?.length).toBeTruthy;
    expect(
      stepResults.collectedRelationships.filter(
        (r) => r._type === Relationships.USER_ASSIGNED_PERMISSION_SET._type,
      ),
    ).toMatchDirectRelationshipSchema({
      schema: {
        properties: {
          _class: { const: RelationshipClass.ASSIGNED },
          _type: { const: Relationships.USER_ASSIGNED_PERMISSION_SET._type },
        },
      },
    });
  }, 10_000);
});
