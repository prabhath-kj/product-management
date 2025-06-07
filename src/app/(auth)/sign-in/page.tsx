'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
// import { registerUser } from '@/lib/actions/auth.actions'
import { toast } from "sonner"
import Link from 'next/link'
import { IUserSignIn } from '@/types'
import { UserSignInSchema } from '@/lib/validator'



export default function LoginPage() {
    const router = useRouter()

    const form = useForm<IUserSignIn>({
        resolver: zodResolver(UserSignInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })


    const onSubmit = async (data: IUserSignIn) => {
        try {
            const res = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (!res.ok || !result.success) {
                toast('Login failed', {
                    description: result.message || 'Invalid credentials',
                    action: {
                        label: 'Retry',
                        onClick: () => { },
                    },
                })
                return
            }

            toast('Login successful!', {
                description: 'Welcome back!',
            })

            form.reset()
            router.push('/')
        } catch (err: any) {
            toast('Something went wrong', {
                description: err?.message || 'Unexpected error occurred',
            })
        }
    }


    return (
        <div className="flex min-h-screen overflow-hidden">
            {/* Left Panel */}

            <div className="flex w-full md:w-1/2 flex-col items-center justify-center p-8 sm:p-16">
                <h2 className="text-3xl font-bold text-yellow-500 mb-8">Sign in to your account</h2>

                <div className="w-full max-w-md">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                    className="pl-10 bg-gray-100 rounded-none"
                                                    placeholder="Email"
                                                    type="email"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                    className="pl-10 bg-gray-100 rounded-none"
                                                    placeholder="Password"
                                                    type="password"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    className="rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                                >
                                    {form.formState.isSubmitting ? 'SIGN IN...' : 'SIGN IN'}
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
            {/* Right Panel */}
            <div className="hidden w-1/2 bg-[#003B5B] text-white md:flex flex-col items-center justify-center px-10">
                <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>
                <p className="text-sm mb-6 text-center">
                    Enter your personal details and start your journy with us
                </p>
                <Link href="/sign-up">
                    <button className="border-2 px-6 py-2 rounded-full hover:bg-white hover:text-[#003B5B] transition cursor-pointer">
                        SIGN UP
                    </button>
                </Link>
            </div>

        </div>
    )
}
