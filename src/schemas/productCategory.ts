import { z } from "zod";

export const productCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
});

export const productCategorySchemaWithoutImage = productCategorySchema.omit({
    image: true,
});

export type ProductCategory = z.infer<typeof productCategorySchema>;

export type ProductCategoryPayload = Omit<ProductCategory, "id">;
