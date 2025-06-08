import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"

interface IVariant {
  ram?: string
  price: number
  stock: number
}

export interface IProduct  {
  name: string
  slug: string
  description: string
  subcategoryId: Types.ObjectId
  images: string[]
  variants: IVariant[]
  isPublished: boolean
}

const VariantSchema = new Schema<IVariant>({
  ram: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
}, { _id: false })

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  images: [{ type: String, required: true }],
  variants: { type: [VariantSchema], required: true },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true })

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)