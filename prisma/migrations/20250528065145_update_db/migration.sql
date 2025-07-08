/*
  Warnings:

  - You are about to drop the column `postId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `PostConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostConfig" DROP CONSTRAINT "PostConfig_postId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageIds" TEXT[];

-- DropTable
DROP TABLE "PostConfig";
