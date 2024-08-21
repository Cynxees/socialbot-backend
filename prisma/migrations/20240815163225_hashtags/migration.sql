/*
  Warnings:

  - You are about to drop the column `hastags` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "hastags",
ADD COLUMN     "hashtags" TEXT[] DEFAULT ARRAY[]::TEXT[];
