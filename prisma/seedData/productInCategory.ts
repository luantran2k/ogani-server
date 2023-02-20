import { Prisma } from '@prisma/client';
const categories: number[] = [1, 3, 3, 3, 3, 5, 3, 3];

export const seedProductInCategory = [
  {
    productId: 1,
    productCategoryId: 1,
  },
  {
    productId: 2,
    productCategoryId: 3,
  },
  {
    productId: 3,
    productCategoryId: 3,
  },
  {
    productId: 4,
    productCategoryId: 3,
  },
  {
    productId: 5,
    productCategoryId: 3,
  },
  {
    productId: 6,
    productCategoryId: 7,
  },
  {
    productId: 7,
    productCategoryId: 3,
  },
  {
    productId: 8,
    productCategoryId: 3,
  },
];
