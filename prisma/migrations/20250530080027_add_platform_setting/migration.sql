/*
  Warnings:

  - The values [paused,failed] on the enum `PostStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `objective` column on the `Campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `platform` on the `Post` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CampaignObjective" AS ENUM ('traffic', 'conversions', 'engagement', 'brand_awareness');

-- AlterEnum
BEGIN;
CREATE TYPE "PostStatus_new" AS ENUM ('processing', 'draft', 'checked', 'scheduled', 'publishing', 'live');
ALTER TABLE "Post" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "status" TYPE "PostStatus_new" USING ("status"::text::"PostStatus_new");
ALTER TYPE "PostStatus" RENAME TO "PostStatus_old";
ALTER TYPE "PostStatus_new" RENAME TO "PostStatus";
DROP TYPE "PostStatus_old";
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "objective",
ADD COLUMN     "objective" "CampaignObjective" NOT NULL DEFAULT 'traffic';

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "platform",
ADD COLUMN     "platforms" "Platform"[] DEFAULT ARRAY[]::"Platform"[],
ADD COLUMN     "publishedUrl" TEXT;

-- CreateTable
CREATE TABLE "SocialPlatformSetting" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "tokenId" TEXT,
    "accessToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialPlatformSetting_pkey" PRIMARY KEY ("id")
);
