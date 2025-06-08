import { getAllCategories } from '@/lib/actions/category.actions'
import { getAllSubcategories } from '@/lib/actions/subcategory.action'
import HomeClient from '@/components/home/HomeClient'
import { getAllProducts } from '@/lib/actions/product.action'

interface Props {
  searchParams: {
    subcategory?: string
    page?: string
    limit?: string
  }
}

export default async function HomePage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 6
  const selectedSubcategory = searchParams.subcategory || ''
  const subcategoryArray = selectedSubcategory ? [selectedSubcategory] : []

  const [categoriesRes, subcategoriesRes, productRes] = await Promise.all([
    getAllCategories(),
    getAllSubcategories(),
    getAllProducts({
      page: currentPage,
      limit,
      subcategoryId: subcategoryArray.length > 0 ? subcategoryArray : undefined,
    }),
  ])

  return (
    <HomeClient
      categories={categoriesRes}
      subcategories={subcategoriesRes}
      products={productRes.data}
      totalPages={productRes.totalPages}
      currentPage={productRes.currentPage}
      selectedSubcategory={selectedSubcategory}
      totalItems={productRes.total} 
      rowsPerPage={limit} 
    />
  )
}
