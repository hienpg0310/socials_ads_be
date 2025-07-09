-- CreateEnum
CREATE TYPE "CampaignObjective" AS ENUM ('traffic', 'conversions', 'engagement', 'brand_awareness');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('active', 'paused', 'completed');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'page_admin', 'collaborator');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('processing', 'draft', 'checked', 'scheduled', 'publishing', 'live');

-- CreateEnum
CREATE TYPE "UploadFileType" AS ENUM ('video', 'image');

-- CreateEnum
CREATE TYPE "UploadSource" AS ENUM ('img_bb', 'google_drive');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('facebook', 'tiktok', 'instagram');

-- CreateEnum
CREATE TYPE "SettingStatus" AS ENUM ('connected', 'not_connected');

-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('OWNER', 'ADMIN', 'COLLABORATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "salt" TEXT,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "isVerified" BOOLEAN DEFAULT false,
    "isActivated" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "objective" "CampaignObjective" NOT NULL DEFAULT 'traffic',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "dailyBudget" DOUBLE PRECISION,
    "totalBudget" DOUBLE PRECISION,
    "status" "CampaignStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdUserId" TEXT,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "postedTime" TIMESTAMP(3) NOT NULL,
    "platformIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publishedUrl" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostSetting" (
    "postId" TEXT NOT NULL,
    "socialSettingId" TEXT NOT NULL,
    "model" TEXT,

    CONSTRAINT "PostSetting_pkey" PRIMARY KEY ("postId","socialSettingId")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "aspectRatio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadFile" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "UploadFileType" NOT NULL,
    "originalName" TEXT,
    "source" "UploadSource",
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialPlatformSetting" (
    "id" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "pageId" TEXT,
    "pageName" TEXT,
    "pageLink" TEXT,
    "accessToken" TEXT NOT NULL,
    "status" "SettingStatus" NOT NULL DEFAULT 'not_connected',
    "expiresAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" TEXT NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "SocialPlatformSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPageSetting" (
    "userId" TEXT NOT NULL,
    "socialSettingId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'collaborator',

    CONSTRAINT "UserPageSetting_pkey" PRIMARY KEY ("userId","socialSettingId")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "role" "TeamRole" NOT NULL DEFAULT 'COLLABORATOR',

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("userId","teamId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSetting" ADD CONSTRAINT "PostSetting_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSetting" ADD CONSTRAINT "PostSetting_socialSettingId_fkey" FOREIGN KEY ("socialSettingId") REFERENCES "SocialPlatformSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialPlatformSetting" ADD CONSTRAINT "SocialPlatformSetting_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialPlatformSetting" ADD CONSTRAINT "SocialPlatformSetting_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPageSetting" ADD CONSTRAINT "UserPageSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPageSetting" ADD CONSTRAINT "UserPageSetting_socialSettingId_fkey" FOREIGN KEY ("socialSettingId") REFERENCES "SocialPlatformSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
