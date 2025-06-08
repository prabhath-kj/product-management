
'use client'

import ProductCard from "./ProductCard";


export default function ProductGrid({ products }: { products: { name: string; price: number; image: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, idx) => (
        <ProductCard key={idx} {...product} />
      ))}
    </div>
  )
}