'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Test from "../../../public/TEST.png"


export default function ProductCard({
  name,
  price,
  image,
}: {
  name: string
  price: number
  image: string
}) {
  return (
    <Card className="relative shadow-none border border-[#B6B6B6]">
      <CardContent className="p-4">
        <Heart className="absolute top-3 right-3 text-gray-400" size={18} />

        <div className="relative h-32 w-full mb-2">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>

        <h4 className="text-sm font-medium hover:underline cursor-pointer mb-1">
          {name}
        </h4>
        <p className="text-sm font-semibold mb-1">${price.toFixed(2)}</p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
