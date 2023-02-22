import { z } from "zod";
import { commentSchema } from "./comment";
import { userSchema } from "./user";

const blogSchema = z.object({
    id: z.number(),
    author: userSchema,
    title: z.string(),
    image: z.string(),
    description: z.string(),
    comments: z.array(commentSchema),
    createAt: z.date(),
    updateAt: z.date().optional(),
});

export type Blog = z.infer<typeof blogSchema>;

export type BlogPreview = Pick<
    Blog,
    "id" | "createAt" | "comments" | "title" | "description" | "image"
>;
