'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ISubcategory } from '@/types'
import { SubcategorySchema } from '@/lib/validator'
import { useEffect } from 'react'
import { toSlug } from '@/lib/utils'
import { createSubcategory } from '@/lib/actions/subcategory.action'
import { toast } from 'sonner'
import { useCategoryStore } from '@/hooks/use.category.store'





export function AddSubCategoryModal({ children }: { children: React.ReactNode }) {
    const { categories } = useCategoryStore()

    const form = useForm<ISubcategory>({
        resolver: zodResolver(SubcategorySchema),
        defaultValues: {
            name: '',
            slug: '',
            categoryId: '',
        },
    })

    const name = form.watch('name')

    useEffect(() => {
        if (name) {
            form.setValue('slug', toSlug(name))
        }
    }, [name])

    const onSubmit = async (data: ISubcategory) => {
        const result = await createSubcategory(data)
        if (result.success) {
            toast.success('Category created successfully')
            form.reset()
        } else {
            toast.error(result.message || 'Failed to create category')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Subcategory</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Subcategory name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="subcategory-slug" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"

                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            {categories.map((cat) => (
                                                <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center gap-3">
                            <Button type="submit" className="bg-yellow-500 text-white">Add</Button>
                            <Button type="button" variant="outline">Discard</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
