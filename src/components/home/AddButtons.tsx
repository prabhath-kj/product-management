'use client'

import { Button } from '@/components/ui/button'
import { AddCategoryModal } from '../modals/AddCategoryModal'
import { AddSubCategoryModal } from '../modals/AddSubcategoryModal'
import { AddProductModal } from '../modals/AddProductModal'

export default function AddButtons() {
    return (
        <div className="flex gap-3">
            <AddCategoryModal>
                <Button
                    variant="default"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white "
                >
                    Add category
                </Button>
            </AddCategoryModal>

            <AddSubCategoryModal>
                <Button
                    variant="default"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                    Add sub category
                </Button>
            </AddSubCategoryModal>

            <AddProductModal>
                <Button
                    variant="default"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                    Add product
                </Button>
            </AddProductModal>
        </div>
    )
}
