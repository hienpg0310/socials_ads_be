/*
  Warnings:

  - Made the column `teamId` on table `Campaign` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamId` on table `SocialPlatformSetting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "teamId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SocialPlatformSetting" ALTER COLUMN "teamId" SET NOT NULL;
