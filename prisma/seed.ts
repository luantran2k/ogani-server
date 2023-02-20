import { seedProducts } from './seedData/products';
import { PrismaClient } from '@prisma/client';
import { seedCategogriese } from './seedData/productCategory';
import { seedProductInCategory } from './seedData/productInCategory';

const prisma = new PrismaClient();
async function main() {
  const seedProductsPromise = seedProducts.map(async (product) => {
    return prisma.product.upsert({
      where: {
        id: product.id,
      },
      update: {
        ...product,
      },
      create: {
        ...product,
      },
    });
  });
  const productCategories = seedCategogriese.map(async (category) => {
    return prisma.productCategory.upsert({
      where: { id: category.id },
      create: {
        ...category,
      },
      update: {
        ...category,
      },
    });
  });
  const productsInCategories = seedProductInCategory.map(
    async ({ productId, productCategoryId }) => {
      return prisma.productInCategory.upsert({
        where: {
          productId_productCategoryId: {
            productCategoryId,
            productId,
          },
        },
        create: {
          productId,
          productCategoryId,
        },
        update: {
          productId,
          productCategoryId,
        },
      });
    },
  );

  Promise.all([
    ...seedProductsPromise,
    ...productCategories,
    ...productsInCategories,
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
