'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  rowsPerPage: number
  onRowsPerPageChange: (value: number) => void
  totalItems: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalItems,
}: PaginationProps) {
  const visiblePages = () => {
    const maxPagesToShow = 5
    const pages = []

    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, start + maxPagesToShow - 1)

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
      <p className="text-sm text-gray-500">
        {Math.min((currentPage - 1) * rowsPerPage + 1, totalItems)} -{' '}
        {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems} items
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
        {/* Page navigation */}
        <ul className="flex justify-center gap-1 w-full">
          {currentPage > 1 && (
            <li
              onClick={() => onPageChange(currentPage - 1)}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </li>
          )}

          {visiblePages().map((page) => (
            <li
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded cursor-pointer transition ${
                page === currentPage
                  ? 'bg-yellow-500 text-white font-semibold'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </li>
          ))}

          {currentPage < totalPages && (
            <li
              onClick={() => onPageChange(currentPage + 1)}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </li>
          )}
        </ul>

        {/* Rows per page */}
        <Select
          value={rowsPerPage.toString()}
          onValueChange={(value) => onRowsPerPageChange(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            {[6, 9, 12].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value} rows
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
