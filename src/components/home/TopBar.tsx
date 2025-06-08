'use client'

import { Heart, ShoppingCart, User, LogOut } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useAuthStore } from '@/hooks/use.auth.store'
import { toast } from 'sonner'

export default function Topbar() {
  const router = useRouter()
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated)

  const handleLogout = async () => {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    })

    if (!res.ok) {
      throw new Error('Logout failed')
    }

    setAuthenticated(false)
    toast.success('Successfully logged out')
    router.push('/sign-in')
  } catch (error: any) {
    toast.error('Logout error', {
      description: error.message || 'Something went wrong',
    })
  }
}


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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <User size={20} className='cursor-pointer' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ShoppingCart size={20} />
      </div>
    </div>
  )
}
