import { z } from "zod";

// Utility
export const MongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid MongoDB ID" });

const UserName = z
  .string()
  .min(2, { message: "Name must be at least 2 characters" })
  .max(50, { message: "Name must be at most 50 characters" });
const Email = z.string().min(1, "Email is required").email("Email is invalid");
const Password = z.string().min(6, "Password must be at least 6 characters");

// ================== AUTH ==================

export const UserSignInSchema = z.object({
  email: Email,
  password: Password,
});

export const UserSignUpSchema = z.object({
  name: UserName,
  email: Email,
  password: Password,
});

// ================== CATEGORY ==================

export const CategorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  slug: z.string().min(2, "Slug is required"),
});

export const CategoryUpdateSchema = CategorySchema.extend({
  _id: MongoId,
});

// ================== SUBCATEGORY ==================

export const SubcategorySchema = z.object({
  name: z.string().min(2, "Subcategory name is required"),
  slug: z.string().min(2, "Slug is required"),
  categoryId: MongoId,
});

export const SubcategoryUpdateSchema = SubcategorySchema.extend({
  _id: MongoId,
});

// ================== PRODUCT ==================

const VariantSchema = z.object({
  ram: z.string(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
});

export const ProductSchema = z.object({
  name: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description required"),
  subcategoryId: z.string().min(1, "Subcategory is required"),
  slug: z.string().min(2, "Slug is required"),
  variants: z
    .array(
      z.object({
        ram: z.string(),
        price: z.coerce.number().min(0),
        stock: z.coerce.number().min(0),
      })
    )
    .min(1, "At least one variant"),
  images: z.array(z.string().url()).min(1, "Upload at least one image"),
});

export const ProductUpdateSchema = ProductSchema.extend({
  _id: MongoId,
});

export const WishlistSchema = z.object({
  userId: MongoId,
  productId: MongoId,
  createdAt: z.date().optional(),
});
