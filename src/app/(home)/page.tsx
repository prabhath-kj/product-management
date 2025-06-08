import { getAllCategories } from '@/lib/actions/category.actions'
import { getAllSubcategories } from '@/lib/actions/subcategory.action'
import HomeClient from '@/components/home/HomeClient'
import { getAllProducts } from '@/lib/actions/product.action'
import Topbar from '@/components/home/TopBar'

interface Props {
  searchParams: Promise<{
    subcategory?: string
    page?: string
    limit?: string
  }>
}

export default async function HomePage({ searchParams }: Props) {

    const params = await searchParams

    const currentPage = Number( params.page) || 1
    const limit = Number( params.limit) || 6
    const selectedSubcategory =  params.subcategory || ''
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
        <>
            <Topbar />

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
            </>
    )
}
