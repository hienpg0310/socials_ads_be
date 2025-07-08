-- CreateEnum
CREATE TYPE "UploadFileType" AS ENUM ('video', 'image');

-- CreateEnum
CREATE TYPE "UploadSource" AS ENUM ('img_bb', 'google_drive');

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
