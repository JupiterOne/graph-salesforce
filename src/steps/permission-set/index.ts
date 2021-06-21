import {
  IntegrationStep,
  IntegrationStepExecutionContext,
  createDirectRelationship,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { Entities, Steps, Relationships } from '../constants';
import {
  createPermissionSetEntity,
  createPermissionSetEntityIdentifier,
} from './converter';
import { createUserEntityIdentifier } from '../user/converter';
import { createProfileEntityIdentifier } from '../profile/converter';

export async function fetchPermissionSets({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await apiClient.iteratePermissionSets(async (permission) => {
    const permSetEntity = await jobState.addEntity(
      createPermissionSetEntity(permission),
    );

    if (permission.IsOwnedByProfile && permission.ProfileId) {
      // If this permission set is owned by a profile, make relationship to profile
      const profileEntity = await jobState.findEntity(
        createProfileEntityIdentifier(permission.ProfileId),
      );

      if (profileEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: Relationships.PROFILE_HAS_PERMISSION_SET._class,
            from: profileEntity,
            to: permSetEntity,
            properties: {
              _type: Relationships.PROFILE_HAS_PERMISSION_SET._type,
            },
          }),
        );
      }
    }
  });
}

export async function buildUserPermissionSetRelationships({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  // Get the permission set assignments
  await apiClient.iteratePermissionSetAssignments(async (assignment) => {
    if (assignment.PermissionSetId) {
      const userEntityId = createUserEntityIdentifier(assignment.AssigneeId);
      const permEntityId = createPermissionSetEntityIdentifier(
        assignment.PermissionSetId,
      );
      const userEntity = await jobState.findEntity(userEntityId);
      const permEntity = await jobState.findEntity(permEntityId);

      if (userEntity && permEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: Relationships.USER_HAS_PERMISSION_SET._class,
            from: userEntity,
            to: permEntity,
            properties: {
              _type: Relationships.USER_HAS_PERMISSION_SET._type,
            },
          }),
        );
      }
    }
  });
}

export const permissionSetSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.PERMISSION_SETS,
    name: 'Fetch User Permission Details',
    entities: [Entities.PERMISSION_SET],
    relationships: [
      Relationships.USER_HAS_PERMISSION_SET,
      Relationships.PROFILE_HAS_PERMISSION_SET,
    ],
    dependsOn: [Steps.PROFILES],
    executionHandler: fetchPermissionSets,
  },
  {
    id: Steps.BUILD_USER_HAS_PERMISSION_SETS,
    name: 'Build user permission set relationship',
    entities: [],
    executionHandler: buildUserPermissionSetRelationships,
    relationships: [Relationships.USER_HAS_PERMISSION_SET],
    dependsOn: [Steps.USERS, Steps.PERMISSION_SETS],
  },
];