/*
  Warnings:

  - Changed the type of `rating` on the `ProductReview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProductReview" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Rating";
