import mongoose, { Schema } from "mongoose"
import { Types } from "mongoose"

export interface IWishlist extends Document {
  userId: Types.ObjectId
  productId: Types.ObjectId
  createdAt?: Date
}

const WishlistSchema = new Schema<IWishlist>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Wishlist = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema)