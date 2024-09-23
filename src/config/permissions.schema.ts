import { PureAbility } from "@casl/ability";
import { PrismaQuery, Subjects } from "@casl/prisma";
import { File, Post, PostGroup, Prisma, User } from "@prisma/client";

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AppSubjects = Subjects<{
  User: User,
  Post: Post,
  PostGroup: PostGroup,
  File: File,
}> | 'all';

export type SubjectWhereInput<T> = T extends 'User'
  ? Prisma.UserWhereInput
  : T extends 'Post'
  ? Prisma.PostWhereInput
  : T extends 'PostGroup'
  ? Prisma.PostGroupWhereInput
  : T extends 'File'
  ? Prisma.FileWhereInput
  : never;

export type Ability = PureAbility<[Action, AppSubjects], PrismaQuery>;