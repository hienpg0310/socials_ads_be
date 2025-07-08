/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "UserPageSetting" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'collaborator';
