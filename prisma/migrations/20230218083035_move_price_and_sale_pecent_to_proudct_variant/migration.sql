/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `salePecent` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `ProductVariants` table. All the data in the column will be lost.
  - Added the required column `price` to the `ProductVariants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isDeleted",
DROP COLUMN "price",
DROP COLUMN "salePecent";

-- AlterTable
ALTER TABLE "ProductVariants" DROP COLUMN "color",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "salePecent" INTEGER DEFAULT 0;
