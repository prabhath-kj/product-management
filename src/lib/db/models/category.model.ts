import mongoose from "mongoose"
import { Schema } from "mongoose"


export interface ICategory extends Document {
  name: string
  slug: string
  isPublished: boolean
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
})

export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)
