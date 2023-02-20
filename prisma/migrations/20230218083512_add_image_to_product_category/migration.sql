-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ProductReview" ADD COLUMN     "images" TEXT[];
