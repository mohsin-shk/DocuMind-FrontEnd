import { z } from "zod";

export const registerSchema =
  z.object({
    fullName: z
      .string()
      .min(
        2,
        "Full name must be at least 2 characters"
      ),

    username: z
      .string()
      .min(
        3,
        "Username must be at least 3 characters"
      ),

    email: z.email(
      "Please enter a valid email"
    ),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      ),
  });

export type RegisterFormData =
  z.infer<typeof registerSchema>;