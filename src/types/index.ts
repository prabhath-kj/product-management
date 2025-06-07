import { z } from 'zod'
import {
  UserSignInSchema,
  UserSignUpSchema,
  CategorySchema,
  CategoryUpdateSchema,
  SubcategorySchema,
  SubcategoryUpdateSchema,
  ProductSchema,
  ProductUpdateSchema,
  WishlistSchema,
} from '../lib/validator' 

// Auth
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>

// Category
export type ICategory = z.infer<typeof CategorySchema>
export type ICategoryUpdate = z.infer<typeof CategoryUpdateSchema>

// Subcategory
export type ISubcategory = z.infer<typeof SubcategorySchema>
export type ISubcategoryUpdate = z.infer<typeof SubcategoryUpdateSchema>

// Product
export type IProduct = z.infer<typeof ProductSchema>
export type IProductUpdate = z.infer<typeof ProductUpdateSchema>

//Wishlist
export type IWishlist = z.infer<typeof WishlistSchema>
