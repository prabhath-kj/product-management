// Pagination.tsx
'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Pagination() {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-sm text-gray-500">10 of 456 items</p>
      <div className="flex gap-2 items-center">
        <ul className="flex gap-1">
          {[1, 2, 3, 4, 5].map((p) => (
            <li
              key={p}
              className={`px-3 py-1 border rounded cursor-pointer ${p === 1 ? 'bg-yellow-500 text-white' : ''}`}
            >
              {p}
            </li>
          ))}
        </ul>
        <Select defaultValue="10">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="30">30 rows</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
