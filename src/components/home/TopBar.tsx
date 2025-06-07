// Topbar.tsx
'use client'
import { Heart, ShoppingCart, User, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Topbar() {
  return (
    <div className="bg-[#003B5B] px-6 py-4 flex items-center justify-between">
      <div className="flex-1">
        <div className="max-w-lg mx-auto flex items-center rounded overflow-hidden bg-white">
          <Input placeholder="Search any things" className="border-0 focus-visible:ring-0" />
          <Button className="rounded-none rounded-r bg-yellow-500 text-white">Search</Button>
        </div>
      </div>
      <div className="flex items-center gap-4 text-white">
        <Heart size={20} />
        <User size={20} />
        <ShoppingCart size={20} />
      </div>
    </div>
  )
}