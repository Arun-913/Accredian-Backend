/*
  Warnings:

  - The primary key for the `Referral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `referred` on the `Referral` table. All the data in the column will be lost.
  - Added the required column `message` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referredByEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Referral_email_key` ON `Referral`;

-- AlterTable
ALTER TABLE `Referral` DROP PRIMARY KEY,
    DROP COLUMN `referred`,
    ADD COLUMN `message` VARCHAR(191) NOT NULL,
    ADD COLUMN `referredByEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referredByEmail_fkey` FOREIGN KEY (`referredByEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
