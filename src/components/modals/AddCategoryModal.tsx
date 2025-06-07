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
import { CategorySchema } from "@/lib/validator"
import { ICategory } from '@/types'
import { useEffect } from 'react'
import { toSlug } from '@/lib/utils'
import { createCategory } from '@/lib/actions/category.actions'
import { toast } from 'sonner'

export function AddCategoryModal({ children }: { children: React.ReactNode }) {
    const form = useForm<ICategory>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    })

    const name = form.watch('name')

    useEffect(() => {
        if (name) {
            form.setValue('slug', toSlug(name))
        }
    }, [name])


    const onSubmit = async (data: ICategory) => {
        const result = await createCategory(data)

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
                    <DialogTitle>Add Category</DialogTitle>
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
                                        <Input placeholder="Category name" {...field} />
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
                                        <Input placeholder="category-slug" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center gap-3">
                            <Button type="submit" className="bg-yellow-500 text-white" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Adding...
                                    </div>
                                ) : (
                                    'Add'
                                )}
                            </Button>

                            <Button type="button" variant="outline" disabled={form.formState.isSubmitting}>
                                Discard
                            </Button>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
