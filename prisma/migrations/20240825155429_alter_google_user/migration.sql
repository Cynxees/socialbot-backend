/*
  Warnings:

  - You are about to drop the column `googleUserId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `GoogleUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `GoogleUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_googleUserId_fkey";

-- AlterTable
ALTER TABLE "GoogleUser" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleUserId";

-- CreateIndex
CREATE UNIQUE INDEX "GoogleUser_userId_key" ON "GoogleUser"("userId");

-- AddForeignKey
ALTER TABLE "GoogleUser" ADD CONSTRAINT "GoogleUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
