/*
  Warnings:

  - You are about to drop the column `fileId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_fileId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "fileId",
ADD COLUMN     "fileIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
