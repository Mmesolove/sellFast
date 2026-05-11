import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters").optional(),
  whatsapp: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid WhatsApp number (e.g. +2348012345678)")
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters").max(100),
  price: z.number().positive("Price must be a positive number"),
  description: z.string().max(500, "Description max 500 characters").optional(),
  imageUrl: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
});

export const updateProfileSchema = z.object({
  businessName: z.string().min(2).optional(),
  whatsapp: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid WhatsApp number")
    .optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
