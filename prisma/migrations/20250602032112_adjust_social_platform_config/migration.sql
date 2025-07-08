/*
  Warnings:

  - You are about to drop the column `tokenId` on the `SocialPlatformSetting` table. All the data in the column will be lost.
  - Made the column `accessToken` on table `SocialPlatformSetting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SocialPlatformSetting" DROP COLUMN "tokenId",
ADD COLUMN     "pageId" TEXT,
ADD COLUMN     "pageLink" TEXT,
ADD COLUMN     "pageName" TEXT,
ALTER COLUMN "accessToken" SET NOT NULL;
