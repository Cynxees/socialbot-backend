-- CreateEnum
CREATE TYPE "BearerToken" AS ENUM ('bearer');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleUserId" INTEGER;

-- CreateTable
CREATE TABLE "GoogleUser" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "tokenType" "BearerToken" NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,
    "scopes" TEXT[],

    CONSTRAINT "GoogleUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
