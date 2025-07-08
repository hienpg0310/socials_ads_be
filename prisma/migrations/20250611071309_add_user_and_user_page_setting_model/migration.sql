-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'page_admin', 'collaborator');

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salt" TEXT,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "role" "UserRole" NOT NULL DEFAULT 'collaborator',
    "isVerified" BOOLEAN DEFAULT false,
    "isActivated" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPageSetting" (
    "userId" TEXT NOT NULL,
    "socialSettingId" TEXT NOT NULL,

    CONSTRAINT "UserPageSetting_pkey" PRIMARY KEY ("userId","socialSettingId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserPageSetting" ADD CONSTRAINT "UserPageSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPageSetting" ADD CONSTRAINT "UserPageSetting_socialSettingId_fkey" FOREIGN KEY ("socialSettingId") REFERENCES "SocialPlatformSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
