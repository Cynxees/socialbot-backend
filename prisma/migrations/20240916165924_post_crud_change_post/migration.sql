/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `fileIds` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `music` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `musicId` on the `PostGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "Post_authorId_idx";

-- DropIndex
DROP INDEX "Post_scheduledDate_authorId_idx";

-- DropIndex
DROP INDEX "Post_scheduledDate_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
DROP COLUMN "fileIds",
DROP COLUMN "music",
DROP COLUMN "scheduledDate";

-- AlterTable
ALTER TABLE "PostGroup" DROP COLUMN "musicId";

-- AddForeignKey
ALTER TABLE "PostGroup" ADD CONSTRAINT "PostGroup_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
