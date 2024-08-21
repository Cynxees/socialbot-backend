/*
  Warnings:

  - You are about to drop the column `media_type` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "media_type",
ADD COLUMN     "mediaType" "MediaType" NOT NULL DEFAULT 'image',
ADD COLUMN     "scheduledDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Post_scheduledDate_idx" ON "Post"("scheduledDate");

-- CreateIndex
CREATE INDEX "Post_scheduledDate_authorId_idx" ON "Post"("scheduledDate", "authorId");
