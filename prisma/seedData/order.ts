import { Prisma } from '@prisma/client';

export const orderSeed: Prisma.OrderCreateManyInput[] = [
  {
    id: 1,
    userId: 1,
  },
  {
    id: 2,
    userId: 1,
  },
  {
    id: 3,
    userId: 1,
  },
];

export const orderStatusSeed: Prisma.OrderStatusCreateManyInput[] = [
  {
    id: 1,
    orderId: 1,
    status: 'Pedding',
  },
  {
    id: 2,
    orderId: 1,
    status: 'Delivered',
  },
  {
    id: 3,
    orderId: 1,
    status: 'Successful',
  },
  {
    id: 4,
    orderId: 2,
    status: 'Pedding',
  },
  {
    id: 5,
    orderId: 3,
    status: 'Cancelled',
  },
];

export const orderItemsSeed: Prisma.OrderItemCreateManyInput[] = [
  {
    id: 1,
    orderId: 1,
    productId: 1,
    productVariantId: 1,
    quantity: 2,
  },
  {
    id: 2,
    orderId: 1,
    productId: 1,
    productVariantId: 2,
    quantity: 3,
  },
  {
    id: 3,
    orderId: 1,
    productId: 4,
    productVariantId: 6,
    quantity: 2,
  },
  {
    id: 4,
    orderId: 2,
    productId: 6,
    productVariantId: 11,
    quantity: 3,
  },
  {
    id: 5,
    orderId: 3,
    productId: 2,
    productVariantId: 4,
    quantity: 3,
  },
];
