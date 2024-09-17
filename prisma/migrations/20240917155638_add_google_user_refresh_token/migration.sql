/*
  Warnings:

  - Added the required column `refreshToken` to the `GoogleUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoogleUser" ADD COLUMN     "refreshToken" TEXT NOT NULL;
