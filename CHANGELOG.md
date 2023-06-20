# v1.2.0 (Tue Jun 20 2023)

#### 🚀 Enhancement

- INT-8376 - User filters [#67](https://github.com/JupiterOne/graph-salesforce/pull/67) ([@adam-in-ict](https://github.com/adam-in-ict))

#### 🐛 Bug Fix

- Update integration-deployments.yml [#66](https://github.com/JupiterOne/graph-salesforce/pull/66) ([@Nick-NCSU](https://github.com/Nick-NCSU))

#### Authors: 2

- Adam Pierson ([@adam-in-ict](https://github.com/adam-in-ict))
- Nick Thompson ([@Nick-NCSU](https://github.com/Nick-NCSU))

---

# v1.1.5 (Tue May 09 2023)

#### 🐛 Bug Fix

- Bumped integration-github-actions package version [#65](https://github.com/JupiterOne/graph-salesforce/pull/65) (gonzaloavalosribas@Gonzalos-MacBook-Pro.local)

#### Authors: 1

- Gonzalo Avalos Ribas ([@Gonzalo-Avalos-Ribas](https://github.com/Gonzalo-Avalos-Ribas))

---

# v1.1.4 (Tue May 09 2023)

#### 🐛 Bug Fix

- Int 7897: Auto + test improvements [#63](https://github.com/JupiterOne/graph-salesforce/pull/63) (gonzaloavalosribas@Gonzalos-MacBook-Pro.local [@ndowmon](https://github.com/ndowmon))

#### Authors: 2

- Gonzalo Avalos Ribas ([@Gonzalo-Avalos-Ribas](https://github.com/Gonzalo-Avalos-Ribas))
- Nick Dowmon ([@ndowmon](https://github.com/ndowmon))

---

# v0.1.1 (Fri Apr 28 2023)

#### 🐛 Bug Fix

- move auto to devDeps [#64](https://github.com/JupiterOne/graph-salesforce/pull/64) ([@zemberdotnet](https://github.com/zemberdotnet))
- Fix auto error [#62](https://github.com/JupiterOne/graph-salesforce/pull/62) (gonzaloavalosribas@Gonzalos-MacBook-Pro.local)

#### Authors: 2

- Gonzalo Avalos Ribas ([@Gonzalo-Avalos-Ribas](https://github.com/Gonzalo-Avalos-Ribas))
- Matthew Zember ([@zemberdotnet](https://github.com/zemberdotnet))

---

## 1.1.3 - 2023-04-28

- Move `auto` to devDependencies

## 1.1.2 - 2023-04-25

- Added `auto` package to help with builds, versioning and npm packaging

## 1.1.1 - 2023-04-06

### Added

- New properties added to entities:

  | Entity            | Properties |
  | ----------------- | ---------- |
  | `salesforce_user` | `email`    |

## 1.0.0 - 2022-03-17

## 1.1.0 - 2022-03-18

### Added

- New properties added to entities:

  | Entity            | Properties |
  | ----------------- | ---------- |
  | `salesforce_user` | `active`   |

## 1.0.0 - 2022-03-17

### Added

- New properties added to entities:

  | Entity            | Properties |
  | ----------------- | ---------- |
  | `salesforce_user` | `userType` |

## 0.2.0 2021-10-27

### Changed

- Updated `@jupiterone/integration-sdk-*` packages

## 0.1.4 2021-07-08

### Changed

- Updated user to permission set and user to user role relationships from has to
  assigned:

  | Source                 | \_class    | Target                 |
  | ---------------------- | ---------- | ---------------------- |
  | `salesforce_group`     | `ASSIGNED` | `salesforce_user_role` |
  | `salesforce_user_role` | `CONTAINS` | `salesforce_user_role` |

## 0.1.3 2021-07-01

### Changed

- Updated user to permission set and user to user role relationships from has to
  assigned:

  | Source            | \_class    | Target                      |
  | ----------------- | ---------- | --------------------------- |
  | `salesforce_user` | `ASSIGNED` | `salesforce_permission_set` |
  | `salesforce_user` | `ASSIGNED` | `salesforce_user_role`      |

## 0.1.2 2021-06-21

### Added

- Added support for ingesting the following **new** resources:

  | Service       | Resource / Entity           |
  | ------------- | --------------------------- |
  | Group         | `salesforce_group`          |
  | PermissionSet | `salesforce_permission_set` |
  | Profile       | `salesforce_profile`        |
  | User          | `salesforce_user`           |
  | UserRole      | `salesforce_user_role`      |

* Added support for ingesting the following **new** relationships:

  | Source                 | \_class | Target                      |
  | ---------------------- | ------- | --------------------------- |
  | `salesforce_group`     | `HAS`   | `salesforce_group`          |
  | `salesforce_group`     | `HAS`   | `salesforce_user`           |
  | `salesforce_group`     | `HAS`   | `salesforce_user_role`      |
  | `salesforce_profile`   | `HAS`   | `salesforce_permission_set` |
  | `salesforce_user`      | `HAS`   | `salesforce_permission_set` |
  | `salesforce_user`      | `HAS`   | `salesforce_profile`        |
  | `salesforce_user`      | `HAS`   | `salesforce_user_role`      |
  | `salesforce_user_role` | `HAS`   | `salesforce_user_role`      |

### Added

- User Group Entity
- User Entity
- Profile Entity
- Permission Set Entity
- User Role Entity
- User Group User Relationship
- User Permission Set Relationship
- User Profile Relationship
- User Role User Relationship
- Profile Permission Set Relationship
- Group User Role Relationship
