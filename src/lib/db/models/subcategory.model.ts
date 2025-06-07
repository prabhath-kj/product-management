import mongoose, { Schema, Types } from "mongoose"

export interface ISubcategory extends Document {
  name: string
  slug: string
  categoryId: Types.ObjectId
  isPublished: boolean
}

const SubcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  isPublished: { type: Boolean, default: true },
})

export const Subcategory = mongoose.models.Subcategory || mongoose.model<ISubcategory>('Subcategory', SubcategorySchema)