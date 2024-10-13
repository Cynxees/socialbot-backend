export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}


export type AppSubjects = {
  User: 'USER',
  Post: 'POST',
  PostGroup: 'POST_GROUP',
  File: 'FILE',
} | 'ALL';