'use client'

import { useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {  ICategoryUpdate, ISubcategoryUpdate } from '@/types'
import { useCategoryStore } from '@/hooks/use.category.store'
import { useSubcategoryStore } from '@/hooks/use.subcategory.store'

export default function CategoriesSidebar({
  categories,
  subcategories,
}: {
  categories:ICategoryUpdate []
  subcategories: ISubcategoryUpdate[]
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
      <ul className="text-sm space-y-2">
        <li className="font-semibold">All categories</li>
      </ul>

      {categories.map((cat) => {
        const subList = subcategories.filter((sub) => sub.categoryId === cat._id)

        return (
          <Accordion key={cat?._id} type="single" collapsible>
            <AccordionItem value={cat.slug}>
              <AccordionTrigger>{cat.name}</AccordionTrigger>
              <AccordionContent className="space-y-2 pl-4">
                {subList.map((sub) => (
                  <div className="flex items-center gap-2" key={sub._id}>
                    <Checkbox id={sub._id} />
                    <label htmlFor={sub._id}>{sub.name}</label>
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
