import { userSteps } from './user';
import { userRoleSteps } from './user-role';
import { permissionSetSteps } from './permission-set';
import { groupSteps } from './group';
import { profileSteps } from './profile';

const integrationSteps = [
  ...userSteps,
  ...userRoleSteps,
  ...permissionSetSteps,
  ...groupSteps,
  ...profileSteps,
];

export { integrationSteps };
