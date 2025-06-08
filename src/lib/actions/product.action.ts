"use server";

import { revalidatePath } from "next/cache";
import { ProductSchema } from "@/lib/validator";
import { formatError } from "../utils";
import { connectToDatabase } from "../db";
import { Product } from "../db/models/product.model";

export async function createProduct(formData: FormData) {
  try {
    await connectToDatabase();

    const data = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      subcategoryId: formData.get("subcategoryId"),
      images: JSON.parse(formData.get("images") as string),
      variants: JSON.parse(formData.get("variants") as string),
      isPublished: true,
    };

    const validated = ProductSchema.parse(data);

    await Product.create(validated);

    revalidatePath("/");

    return { success: true, message: "Product created successfully." };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

interface GetAllProductsParams {
  page?: number;
  limit?: number;
  subcategoryId?: string[];
}

export async function getAllProducts({
  page = 1,
  limit = 10,
  subcategoryId,
}: GetAllProductsParams) {
  await connectToDatabase();

  const filter: any = {};

  // Subcategory filter (array or undefined)
  if (subcategoryId && subcategoryId.length > 0) {
    filter.subcategoryId = { $in: subcategoryId };
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

    Product.countDocuments(filter),
  ]);

  return {
    data: JSON.parse(JSON.stringify(products)),
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}
