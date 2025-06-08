'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import CategoriesSidebar from './CategoriesSidebar'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'
import AddButtons from './AddButtons'
import { useCallback } from 'react'

export default function HomeClient({
  categories,
  subcategories,
  products,
  totalPages,
  currentPage,
  selectedSubcategory,
  totalItems,
  rowsPerPage,
}: {
  categories: any[]
  subcategories: any[]
  products: any[]
  totalPages: number
  currentPage: number
  selectedSubcategory: string
  totalItems: number
  rowsPerPage: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const buildQuery = useCallback(
    (params: { [key: string]: string | number }) => {
      const query = new URLSearchParams(searchParams.toString())
      Object.entries(params).forEach(([key, value]) => {
        query.set(key, String(value))
      })
      return `/?${query.toString()}`
    },
    [searchParams]
  )

  const handleSubcategorySelect = (id: string) => {
    router.push(buildQuery({ subcategory: id, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    router.push(buildQuery({ subcategory: selectedSubcategory, page }))
  }

  const handleRowsPerPageChange = (limit: number) => {
    router.push(buildQuery({ subcategory: selectedSubcategory, page: 1, limit }))
  }

  return (
    <div className="flex px-6 mt-4">
      <CategoriesSidebar
        categories={categories}
        subcategories={subcategories}
        selectedSubcategory={selectedSubcategory}
        onSelectSubcategory={handleSubcategorySelect}
      />

      <div className="flex-1">
        <div className="flex justify-end mb-4">
          <AddButtons />
        </div>

        <ProductGrid
          products={products.map((p) => ({
            name: p.name,
            price: p.variants[0]?.price,
            image: p.images[0],
          }))}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  )
}
