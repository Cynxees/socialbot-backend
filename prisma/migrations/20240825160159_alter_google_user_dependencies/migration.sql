/*
  Warnings:

  - You are about to drop the column `userId` on the `GoogleUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GoogleUser" DROP CONSTRAINT "GoogleUser_userId_fkey";

-- DropIndex
DROP INDEX "GoogleUser_userId_key";

-- AlterTable
ALTER TABLE "GoogleUser" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleUserId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleUserId_key" ON "User"("googleUserId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
