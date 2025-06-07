import {  ISubcategoryUpdate } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SubcategoryStore {
  subcategories: ISubcategoryUpdate[]
  setSubcategories: (data: ISubcategoryUpdate[]) => void
  clear: () => void
}

export const useSubcategoryStore = create(
  persist<SubcategoryStore>(
    (set) => ({
      subcategories: [],
     
      setSubcategories: (data) => set({ subcategories: data }),
      clear: () => set({ subcategories: [] }),
    }),
    { name: 'subcategory-store' }
  )
)
