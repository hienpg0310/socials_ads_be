-- AlterTable
ALTER TABLE "SocialPlatformSetting" ADD COLUMN     "createdBy" TEXT;

-- AddForeignKey
ALTER TABLE "SocialPlatformSetting" ADD CONSTRAINT "SocialPlatformSetting_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
