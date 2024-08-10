export type RolePermissionsType = {
  [key in Role]: {
    [key in Permissions]?: boolean;
  };
};

export enum Role {
  USER = 'User',
  SUPER_ADMIN = 'Super Admin',
}

export enum Permissions {

  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

}

export const RolePermissions : RolePermissionsType = {
  [Role.USER]: {
    [Permissions.USER_READ]: true,
  },
  [Role.SUPER_ADMIN]: {
    [Permissions.USER_CREATE]: true,
    [Permissions.USER_READ]: true,
    [Permissions.USER_UPDATE]: true,
    [Permissions.USER_DELETE]: true,
  },
};