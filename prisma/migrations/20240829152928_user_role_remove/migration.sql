/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('super_admin', 'admin', 'user');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";
