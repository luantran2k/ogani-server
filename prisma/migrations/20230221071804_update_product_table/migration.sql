/*
  Warnings:

  - You are about to drop the column `size` on the `ProductVariants` table. All the data in the column will be lost.
  - Added the required column `variant` to the `ProductVariants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "details" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ProductVariants" DROP COLUMN "size",
ADD COLUMN     "variant" TEXT NOT NULL;
