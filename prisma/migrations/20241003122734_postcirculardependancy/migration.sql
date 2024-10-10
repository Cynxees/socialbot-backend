-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postGroupId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "postGroupId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postGroupId_fkey" FOREIGN KEY ("postGroupId") REFERENCES "PostGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
