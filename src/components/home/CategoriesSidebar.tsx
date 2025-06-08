'use client'

import { useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ICategoryUpdate, ISubcategoryUpdate } from '@/types'
import { useCategoryStore } from '@/hooks/use.category.store'
import { useSubcategoryStore } from '@/hooks/use.subcategory.store'

export default function CategoriesSidebar({
  categories,
  subcategories,
  selectedSubcategory,
  onSelectSubcategory,
}: {
  categories: ICategoryUpdate[]
  subcategories: ISubcategoryUpdate[]
  selectedSubcategory: string
  onSelectSubcategory: (id: string) => void
}) {
  const { setCategories } = useCategoryStore()
  const { setSubcategories } = useSubcategoryStore()

  useEffect(() => {
    setCategories(categories)
    setSubcategories(subcategories)
  }, [categories, subcategories])

  return (
    <div className="w-60 pr-4">
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <ul className="text-sm space-y-2 mb-4">
        <li
          className={`cursor-pointer ${
            !selectedSubcategory ? 'text-yellow-600 font-medium' : ''
          }`}
          onClick={() => onSelectSubcategory('')}
        >
          All categories
        </li>
      </ul>

      {categories.map((cat) => {
        const subList = subcategories.filter(
          (sub) => sub.categoryId === cat._id
        )

        return (
          <Accordion key={cat?._id} type="single" collapsible>
            <AccordionItem value={cat.slug}>
              <AccordionTrigger>{cat.name}</AccordionTrigger>
              <AccordionContent className="space-y-2 pl-4">
                {subList.map((sub) => (
                  <div className="flex items-center gap-2" key={sub._id}>
                    <Checkbox
                      id={sub._id}
                      checked={selectedSubcategory === sub._id}
                      onCheckedChange={() => onSelectSubcategory(sub._id)}
                    />
                    <label
                      htmlFor={sub._id}
                      className="cursor-pointer text-sm"
                    >
                      {sub.name}
                    </label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
    </div>
  )
}
