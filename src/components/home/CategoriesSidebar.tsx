'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function CategoriesSidebar() {
  return (
    <div className="w-60 pr-4">
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <ul className="text-sm space-y-2">
        <li className="font-semibold">All categories</li>
      </ul>
      <Accordion type="single" collapsible>
        <AccordionItem value="laptop">
          <AccordionTrigger>Laptop</AccordionTrigger>
          <AccordionContent className="space-y-2 pl-4">
            <div className="flex items-center gap-2">
              <Checkbox id="hp" /> <label htmlFor="hp">HP</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="dell" /> <label htmlFor="dell">Dell</label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-4 space-y-2">
        <div>Tablet</div>
        <div>Headphones</div>
      </div>
    </div>
  )
}

