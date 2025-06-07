'use client'

import { useForm } from 'react-hook-form'
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
import { toast } from "sonner"
import Link from 'next/link'
import { IUserSignUp } from '@/types'
import { UserSignUpSchema } from '@/lib/validator'
import { registerUser } from '@/lib/actions/user.actions'




export default function RegisterPage() {
    const router = useRouter()

    const form = useForm<IUserSignUp>({
        resolver: zodResolver(UserSignUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: IUserSignUp) => {
        try {
            const res = await registerUser(data)
            
            if (!res?.success) {

                toast.warning(res.message || 'Something went wrong',
                {
                    position:"top-center"
                }
                )
                return
            }
            toast.success('Registration successful!',
            )
            form.reset()
            router.push('/sign-in')
        } catch (err: any) {
            toast.error(
                err?.message || 'Unexpected error occurred',
            )
        }
    }


    return (
        <div className="flex min-h-screen overflow-hidden">
            {/* Left Panel */}
            <div className="hidden w-1/2 bg-[#003B5B] text-white md:flex flex-col items-center justify-center px-10">
                <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-sm mb-6 text-center">
                    To keep connected with us please login with your personal info
                </p>

                <Link href="/sign-in">
                    <button className="border-2 px-6 py-2 rounded-full hover:bg-white hover:text-[#003B5B] transition cursor-pointer">
                        SIGN IN
                    </button>
                </Link>
            </div>

            {/* Right Panel */}
            <div className="flex w-full md:w-1/2 flex-col items-center justify-center p-8 sm:p-16">
                <h2 className="text-3xl font-bold text-yellow-500 mb-8">Create Account</h2>

                <div className="w-full max-w-md">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                    className="pl-10 bg-gray-100 rounded-none "
                                                    placeholder="Name"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

                                <Button type="submit" className=" rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer">
                                    {form.formState.isSubmitting ? 'Creating Account...' : 'SIGN UP'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
