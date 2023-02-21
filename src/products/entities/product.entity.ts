import { Product } from '@prisma/client';
export class ProductEntity implements Product {
  id: number;
  name: string;
  images: string[];
  description: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}
