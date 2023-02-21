/*
  Warnings:

  - You are about to drop the column `salePecent` on the `ProductVariants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariants" DROP COLUMN "salePecent",
ADD COLUMN     "salePercent" INTEGER DEFAULT 0;
