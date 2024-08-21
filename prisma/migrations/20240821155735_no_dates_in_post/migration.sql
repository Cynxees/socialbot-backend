/*
  Warnings:

  - You are about to drop the column `date` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_date_authorId_idx";

-- DropIndex
DROP INDEX "Post_date_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "date";
