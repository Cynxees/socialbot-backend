/*
  Warnings:

  - The values [both] on the enum `MediaType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `caption` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postGroupId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `published` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `scheduledDate` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Destination" AS ENUM ('INSTAGRAM_POST', 'INSTAGRAM_REEL', 'TIKTOK_SLIDES', 'TIKTOK_VIDEO', 'YOUTUBE_SHORT', 'YOUTUBE_VIDEO');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('SINGLE_SHORT_FORM_CONTENT', 'SINGLE_VIDEO_CONTENT', 'SINGLE_IMAGE_CONTENT', 'MULTIPLE_MIXED_CONTENT');

-- AlterEnum
BEGIN;
CREATE TYPE "MediaType_new" AS ENUM ('image', 'video');
ALTER TABLE "File" ALTER COLUMN "mediaType" DROP DEFAULT;
ALTER TABLE "File" ALTER COLUMN "mediaType" TYPE "MediaType_new" USING ("mediaType"::text::"MediaType_new");
ALTER TYPE "MediaType" RENAME TO "MediaType_old";
ALTER TYPE "MediaType_new" RENAME TO "MediaType";
DROP TYPE "MediaType_old";
ALTER TABLE "File" ALTER COLUMN "mediaType" SET DEFAULT 'image';
COMMIT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "caption",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "postGroupId" INTEGER NOT NULL,
ALTER COLUMN "published" SET NOT NULL,
ALTER COLUMN "scheduledDate" SET NOT NULL;

-- CreateTable
CREATE TABLE "PostGroup" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "fileIds" INTEGER[],
    "musicId" INTEGER,

    CONSTRAINT "PostGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postGroupId_fkey" FOREIGN KEY ("postGroupId") REFERENCES "PostGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
