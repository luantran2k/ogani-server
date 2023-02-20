import { Product } from '@prisma/client';
export class ProductEntity implements Product {
  quantity: number;
  id: number;
  name: string;
  images: string[];
  price: number;
  salePecent: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
