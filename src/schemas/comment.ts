import { z } from "zod";
import { userSchema } from "./user";

export const commentSchema = z.object({
    id: z.number(),
    user: userSchema,
    content: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
