import Topbar from '@/components/home/TopBar'
import CategoriesSidebar from '@/components/home/CategoriesSidebar'
import ProductGrid from '@/components/home/ProductGrid'
import Pagination from '@/components/home/Pagination'
import AddButtons from '@/components/home/AddButtons'
import { getAllSubcategories } from '@/lib/actions/subcategory.action'
import { getAllCategories } from '@/lib/actions/category.actions'

export default async function HomePage() {

    const categories = await getAllCategories();
    const subcategories = await getAllSubcategories()

    const products = [
        {
            name: 'HP AMD Ryzen 3',
            slug: 'hp-amd-ryzen-3',
            description: 'Powerful HP laptop with Ryzen 3',
            categoryId: '111111111111111111111111',
            subcategoryId: '222222222222222222222222',
            images: ['https://via.placeholder.com/150'],
            variants: [
                { ram: '8GB', price: 529.99, stock: 10 },
            ],
            isPublished: true,
        },
        {
            name: 'Dell i5 12th Gen',
            slug: 'dell-i5-12th',
            description: 'Slim Dell laptop with Intel i5',
            categoryId: '111111111111111111111111',
            subcategoryId: '222222222222222222222222',
            images: ['https://via.placeholder.com/150'],
            variants: [
                { ram: '16GB', price: 649.99, stock: 5 },
            ],
            isPublished: true,
        },
        {
            name: 'Lenovo Flex Ryzen 5',
            slug: 'lenovo-flex-r5',
            description: '2-in-1 convertible with Ryzen 5',
            categoryId: '111111111111111111111111',
            subcategoryId: '222222222222222222222222',
            images: ['https://via.placeholder.com/150'],
            variants: [
                { ram: '8GB', price: 579.99, stock: 8 },
            ],
            isPublished: true,
        },
    ]

    // Convert products into format ProductCard expects (name, price, image)
    const formattedProducts = products.map(p => ({
        name: p.name,
        price: p.variants[0].price,
        image: p.images[0],
    }))

    return (
        <div className="min-h-screen">
            <Topbar />
            <div className="flex px-6 mt-4">
                <CategoriesSidebar  categories={categories} subcategories={subcategories}/>
                <div className="flex-1">
                    <div className="flex justify-end mb-4">
                        <AddButtons />
                    </div>
                    <ProductGrid products={formattedProducts} />
                    <Pagination />
                </div>
            </div>
        </div>
    )
}
