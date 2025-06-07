"use server";

import { connectToDatabase } from "../db";
import { ISubcategory } from "@/types";
import { getUserFromToken } from "../auth";
import { SubcategorySchema } from "../validator";
import { Subcategory } from "../db/models/subcategory.model";
import { formatError } from "../utils";
import { revalidatePath } from "next/cache";

export async function createSubcategory(data: ISubcategory) {
  try {
    await connectToDatabase();

    const user = getUserFromToken();
    if (!user) throw new Error("Unauthorized");

    const parsed = SubcategorySchema.parse(data);

    const exists = await Subcategory.findOne({ slug: parsed.slug });
    if (exists) throw new Error("Subcategory already exists");

    const created = await Subcategory.create(parsed);
    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(created)),
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getAllSubcategories() {
  await connectToDatabase();
  const subcategories = await Subcategory.find();
  return JSON.parse(JSON.stringify(subcategories));
}
