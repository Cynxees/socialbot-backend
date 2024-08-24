/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video', 'both');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "hastags" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "media_type" "MediaType" NOT NULL DEFAULT 'image',
ADD COLUMN     "music" TEXT,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Test";
