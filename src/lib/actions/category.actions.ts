"use server";

import { connectToDatabase } from "../db";
import { getUserFromToken } from "../auth";
import { CategorySchema } from "../validator";
import { Category } from "../db/models/category.model";
import { ICategory } from "@/types";
import { formatError } from "../utils";

export async function createCategory(formData: ICategory) {
  try {
    await connectToDatabase();

    const user = await getUserFromToken();
    if (!user) return { success: false, message: "Unauthorized" };

    const data = CategorySchema.parse(formData);

    const exists = await Category.findOne({ slug: data.slug });
    if (exists) throw new Error("Category already exists");

    const created = await Category.create({ ...data });
    return { success: true, data:  JSON.parse(JSON.stringify(created)) };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
