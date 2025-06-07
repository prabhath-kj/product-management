'use client'
import { Button } from '@/components/ui/button'

export default function AddButtons() {
  return (
    <div className="flex gap-3">
      <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">Add category</Button>
      <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">Add sub category</Button>
      <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">Add product</Button>
    </div>
  )
}



