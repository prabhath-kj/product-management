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
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { useSubcategoryStore } from '@/hooks/use.subcategory.store'
import { ProductSchema } from '@/lib/validator'
import { IProduct } from '@/types'
import { toast } from 'sonner'
import { toSlug } from '@/lib/utils'
import { createProduct } from '@/lib/actions/product.action'

export function AddProductModal({ children }: { children: React.ReactNode }) {
  const { subcategories } = useSubcategoryStore()
  const [uploading, setUploading] = useState(false)

  const form = useForm<IProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      subcategoryId: '',
      variants: [{ ram: '', price: 0, stock: 0 }],
      images: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'variants',
    control: form.control,
  })

  const name = form.watch('name')
  useEffect(() => {
    if (name) form.setValue('slug', toSlug(name))
  }, [name])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const result = await res.json()
    setUploading(false)

    if (result.url) {
      const current = form.getValues('images')
      form.setValue('images', [...current, result.url])
      toast.success('Image uploaded')
    } else {
      toast.error(result.error || 'Upload failed')
    }
  }

  const onSubmit = async (data: IProduct) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('slug', data.slug)
    formData.append('description', data.description)
    formData.append('subcategoryId', data.subcategoryId.toString())
    formData.append('images', JSON.stringify(data.images))
    formData.append('variants', JSON.stringify(data.variants))

    const result = await createProduct(formData)

    if (result.success) {
      toast.success(result.message || 'Product added successfully')
      form.reset()
    } else {
      toast.error(result.message || 'Failed to add product')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
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
                      <Input readOnly {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subcategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subcategories.map((s) => (
                          <SelectItem key={s._id} value={s._id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Variants Section */}
            <div className="space-y-4">
              <FormLabel>Variants</FormLabel>
              {fields.map((_, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                  <FormField
                    control={form.control}
                    name={`variants.${idx}.ram`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RAM</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 8 GB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${idx}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`variants.${idx}.stock`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="outline" onClick={() => remove(idx)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => append({ ram: '', price: 0, stock: 0 })}
              >
                + Add Variant
              </Button>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <FormLabel>Upload Images</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

              <div className="flex gap-2 flex-wrap pt-2">
                {form.watch('images').map((img, i) => (
                  <div key={i} className="relative w-24 h-24 group">
                    <Image
                      src={img}
                      alt="preview"
                      fill
                      className="object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const imgs = [...form.getValues('images')]
                        imgs.splice(i, 1)
                        form.setValue('images', imgs)
                      }}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full text-xs hidden group-hover:block"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Button Bar */}
            <div className="sticky bottom-0 bg-white pt-4 flex justify-end gap-3 border-t mt-6">
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
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}
              >
                Discard
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  )
}
