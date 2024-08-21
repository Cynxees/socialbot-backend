export type RolePermissionsType = {
  [key in Role]: {
    [key in Permission]?: boolean;
  };
};

export enum Role {
  USER = 'User',
  SUPER_ADMIN = 'Super Admin',
}

export enum Permission {

  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

}

export const RolePermissions : RolePermissionsType = {
  [Role.USER]: {
    [Permission.USER_READ]: true,
  },
  [Role.SUPER_ADMIN]: {
    [Permission.USER_CREATE]: true,
    [Permission.USER_READ]: true,
    [Permission.USER_UPDATE]: true,
    [Permission.USER_DELETE]: true,
  },
};