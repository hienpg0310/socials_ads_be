/*
  Warnings:

  - You are about to drop the column `platforms` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "platforms",
ADD COLUMN     "platformIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
