/*
  Warnings:

  - You are about to drop the column `slug` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `user` table. All the data in the column will be lost.
  - Added the required column `hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `slug`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `token`,
    ADD COLUMN `hash` VARCHAR(191) NOT NULL;
