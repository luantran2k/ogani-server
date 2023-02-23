import { z } from 'zod';
import { ProductCategory, productCategorySchema } from './productCategory';

export const sizeEnum = z.enum(['small', 'medium', 'big']);
export type ProductSize = z.infer<typeof sizeEnum>;

export const productSchema = z.object({
  id: z.number(),
  images: z.array(z.string()),
  name: z.string().min(1, 'Name must be at least 1 character'),
  description: z.string().optional(),
  detail: z.string().optional(),
  categories: z
    .array(z.number())
    .min(1, 'Al least one product category required'),
});

export const productVariantSchema = z.object({
  variant: z.string(),
  price: z.number().min(0),
  salePercent: z
    .number()
    .min(0, 'Min sale is 0%')
    .max(100, 'Max sale is 100%')
    .optional(),
  quantity: z.number().min(0, 'At least 1'),
});

export const createProductSchema = productSchema
  .omit({
    id: true,
    images: true,
  })
  .merge(
    z.object({
      images: z.array(z.instanceof(File)).min(1, 'At least one images'),
      variants: z.array(productVariantSchema).min(1, 'At least one variant'),
    }),
  );
export type Product = z.infer<
  typeof productSchema & typeof productVariantSchema
>;
export type ProductInfo = z.infer<typeof productSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductCreate = z.infer<typeof createProductSchema>;
export type ProductPayload = Omit<Product, 'id'>;

export type ProductCart = Pick<
  Product,
  'id' | 'name' | 'price' | 'quantity' | 'salePercent' | 'variant'
> & {
  image: string;
  selected: boolean;
};

export type ProductCardType = Pick<Product, 'id' | 'name' | 'images'> & {
  variants: ProductVariant[];
  categories: ProductCategory[];
};

export default productSchema;
