/*
  Warnings:

  - You are about to drop the column `platforms` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "platforms";

-- CreateTable
CREATE TABLE "PostSetting" (
    "postId" TEXT NOT NULL,
    "socialSettingId" TEXT NOT NULL,
    "model" TEXT,

    CONSTRAINT "PostSetting_pkey" PRIMARY KEY ("postId","socialSettingId")
);

-- AddForeignKey
ALTER TABLE "PostSetting" ADD CONSTRAINT "PostSetting_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSetting" ADD CONSTRAINT "PostSetting_socialSettingId_fkey" FOREIGN KEY ("socialSettingId") REFERENCES "SocialPlatformSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
