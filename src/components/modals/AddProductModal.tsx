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

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!

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

  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    setUploading(true)
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.secure_url) throw new Error('Image upload failed')
      form.setValue('images', [...form.getValues('images'), data.secure_url])
    } catch (error) {
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: IProduct) => {
    console.log('Submit product to action with images only as URLs:', data)
    toast.success('Product added successfully')
    form.reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            {fields.map((_, idx) => (
              <div className="grid grid-cols-4 gap-2" key={idx}>
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
                <Button variant="outline" type="button" onClick={() => remove(idx)}>
                  Remove
                </Button>
              </div>
            ))}

            <Button type="button" variant="secondary" onClick={() => append({ ram: '', price: 0, stock: 0 })}>
              Add Variant
            </Button>

            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories.map((s) => (
                        <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>
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
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Short description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Upload Image</FormLabel>
              <Input type="file" accept="image/*" onChange={onImageUpload} disabled={uploading} />
              <div className="flex gap-2 mt-2">
                {form.watch('images').map((img, i) => (
                  <div key={i} className="relative w-20 h-20">
                    <Image src={img} alt="preview" fill className="object-cover rounded" />
                  </div>
                ))}
              </div>
            </div>

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
              <Button type="button" variant="outline" onClick={() => form.reset()} disabled={form.formState.isSubmitting}>
                Discard
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
