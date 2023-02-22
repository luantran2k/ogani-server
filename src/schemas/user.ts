import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    username: z.string(),
    name: z.string().optional(),
    email: z.string(),
    phone: z.string().optional(),
    avatar: z.string(),
    role: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserInfo = Pick<
    User,
    "id" | "username" | "name" | "email" | "avatar" | "phone" | "role"
>;
