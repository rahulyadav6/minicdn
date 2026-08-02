import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Passowrd must be at least 6 characters"),
});