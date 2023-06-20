import { createAPIClient } from './client';

const instanceConfig = {
  accessToken: 'TEST',
  instanceUrl: 'https://test.com',
  refreshToken: 'TEST',
  clientId: 'TEST',
  clientSecret: 'TEST',
};

describe('build user filter conditions', () => {
  test('no filters', () => {
    const client = createAPIClient(instanceConfig);

    expect(client.buildUserFilterConditions()).toEqual(undefined);
  });

  test('single role filter', () => {
    const instanceConfigSingleRole = {
      ...instanceConfig,
      userRoleFilter: 'abcdef',
    };
    const client = createAPIClient(instanceConfigSingleRole);
    expect(client.buildUserFilterConditions()).toEqual({
      userRoleId: {
        $in: 'abcdef',
      },
    });
  });

  test('single profile filter', () => {
    const instanceConfigSingleProfile = {
      ...instanceConfig,
      userProfileFilter: 'ghijkl',
    };
    const client = createAPIClient(instanceConfigSingleProfile);
    expect(client.buildUserFilterConditions()).toEqual({
      profileId: {
        $in: 'ghijkl',
      },
    });
  });

  test('single of each filter', () => {
    const instanceConfigSingleBoth = {
      ...instanceConfig,
      userProfileFilter: 'ghijkl',
      userRoleFilter: 'abcdef',
    };
    const client = createAPIClient(instanceConfigSingleBoth);
    expect(client.buildUserFilterConditions()).toEqual({
      userRoleId: {
        $in: 'abcdef',
      },
      profileId: {
        $in: 'ghijkl',
      },
    });
  });

  test('multi role filter', () => {
    const instanceConfigMultiRole = {
      ...instanceConfig,
      userRoleFilter: ['firstRole', 'secondRole'],
    };
    const client = createAPIClient(instanceConfigMultiRole);
    expect(client.buildUserFilterConditions()).toEqual({
      userRoleId: {
        $in: ['firstRole', 'secondRole'],
      },
    });
  });

  test('multi profile filter', () => {
    const instanceConfigMultiProfile = {
      ...instanceConfig,
      userProfileFilter: ['firstProfile', 'secondProfile', 'thidProfile'],
    };
    const client = createAPIClient(instanceConfigMultiProfile);
    expect(client.buildUserFilterConditions()).toEqual({
      profileId: {
        $in: ['firstProfile', 'secondProfile', 'thidProfile'],
      },
    });
  });

  test('combo multi single filter', () => {
    const instanceConfigMultiProfileSingleRole = {
      ...instanceConfig,
      userProfileFilter: ['firstProfile', 'secondProfile', 'thidProfile'],
      userRoleFilter: 'abcdef',
    };
    const client = createAPIClient(instanceConfigMultiProfileSingleRole);
    expect(client.buildUserFilterConditions()).toEqual({
      profileId: {
        $in: ['firstProfile', 'secondProfile', 'thidProfile'],
      },
      userRoleId: {
        $in: 'abcdef',
      },
    });
  });
});
