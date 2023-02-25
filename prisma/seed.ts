import { productVariantSeed } from './seedData/productVariant';
import { seedProducts } from './seedData/products';
import { PrismaClient } from '@prisma/client';
import { seedCategogriese } from './seedData/productCategory';
import { seedProductInCategory } from './seedData/productInCategory';
import { orderSeed, orderItemsSeed, orderStatusSeed } from './seedData/order';

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
  const productVariants = productVariantSeed.map((variant) => {
    return prisma.productVariants.upsert({
      where: { id: variant.id },
      create: { ...variant },
      update: { ...variant },
    });
  });
  const orders = orderSeed.map((order) => {
    return prisma.order.upsert({
      where: { id: order.id },
      create: order,
      update: order,
    });
  });
  const ordersItems = orderItemsSeed.map((orderItem) => {
    return prisma.orderItem.upsert({
      where: { id: orderItem.id },
      create: orderItem,
      update: orderItem,
    });
  });
  const orderStatuses = orderStatusSeed.map((orderStatus) => {
    return prisma.orderStatus.upsert({
      where: { id: orderStatus.id },
      create: orderStatus,
      update: orderStatus,
    });
  });

  Promise.all([
    ...seedProductsPromise,
    ...productCategories,
    ...productsInCategories,
    ...productVariants,
    ...orders,
    ...ordersItems,
    ...orderStatuses,
  ]);
}

main()
  .then(async () => {
    console.log('Seed Successfully');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
