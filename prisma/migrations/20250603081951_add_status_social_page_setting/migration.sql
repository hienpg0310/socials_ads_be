-- CreateEnum
CREATE TYPE "SettingStatus" AS ENUM ('connected', 'not_connected');

-- AlterTable
ALTER TABLE "SocialPlatformSetting" ADD COLUMN     "status" "SettingStatus" NOT NULL DEFAULT 'not_connected';
