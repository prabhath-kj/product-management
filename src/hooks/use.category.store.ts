import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllCategories } from "@/lib/actions/category.actions";
import {  ICategoryUpdate } from "@/types";

// interface Product {
//   _id: string
//   name: string
//   slug: string
//   description: string
//   categoryId: string
//   subcategoryId: string
//   images: string[]
//   variants: {
//     ram?: string
//     price: number
//     stock: number
//   }[]
//   isPublished: boolean
// }

interface CategoryStore {
  categories: ICategoryUpdate[];
  setCategories: (data: ICategoryUpdate[]) => void;
  clear: () => void;
}

export const useCategoryStore = create(
  persist<CategoryStore>(
    (set) => ({
      categories: [],

      setCategories: (data) => set({ categories: data }),
      clear: () => set({ categories: [] }),
    }),
    { name: "category-store" }
  )
);

// interface ProductStore {
//   products: Product[]
//   fetchProducts: () => Promise<void>
//   setProducts: (data: Product[]) => void
//   clear: () => void
// }

// export const useProductStore = create(
//   persist<ProductStore>(
//     (set) => ({
//       products: [],
//       fetchProducts: async () => {
//         const res = await getProducts()
//         if (res.success) set({ products: res.data })
//       },
//       setProducts: (data) => set({ products: data }),
//       clear: () => set({ products: [] }),
//     }),
//     { name: 'product-store' }
//   )
// )
