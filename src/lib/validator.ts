import { z } from 'zod'

// Utility
export const MongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid MongoDB ID' })

const UserName = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters' })
  .max(50, { message: 'Name must be at most 50 characters' })
const Email = z.string().min(1, 'Email is required').email('Email is invalid')
const Password = z.string().min(6, 'Password must be at least 6 characters')

// ================== AUTH ==================

export const UserSignInSchema = z.object({
  email: Email,
  password: Password,
})

export const UserSignUpSchema = z
  .object({
    name: UserName,
    email: Email,
    password: Password,
  })

// ================== CATEGORY ==================

export const CategorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().min(2, 'Slug is required'),
})

export const CategoryUpdateSchema = CategorySchema.extend({
  _id: MongoId,
})

// ================== SUBCATEGORY ==================

export const SubcategorySchema = z.object({
  name: z.string().min(2, 'Subcategory name is required'),
  slug: z.string().min(2, 'Slug is required'),
  categoryId: MongoId,
  isPublished: z.boolean().default(true),
})

export const SubcategoryUpdateSchema = SubcategorySchema.extend({
  _id: MongoId,
})

// ================== PRODUCT ==================

const VariantSchema = z.object({
  ram: z.string().optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
})

export const ProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: MongoId,
  subcategoryId: MongoId,
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  variants: z.array(VariantSchema).min(1, 'At least one variant is required'),
  isPublished: z.boolean().default(false),
})

export const ProductUpdateSchema = ProductSchema.extend({
  _id: MongoId,
})


export const WishlistSchema = z.object({
  userId: MongoId,
  productId: MongoId,
  createdAt: z.date().optional(),
})
