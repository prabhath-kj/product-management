'use server'

import { IUserSignUp } from '@/types'
import { connectToDatabase } from '../db'
import { UserSignUpSchema } from '../validator'
import { User } from '../db/models/user.model'
import bcrypt from "bcryptjs"
import { formatError } from '../utils'
 
// Register user server action
export async function registerUser(userData: IUserSignUp) {
  try {
    await connectToDatabase()
    const user = await UserSignUpSchema.parseAsync(userData)
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) {
      return { success: false, message: 'Email already registered' }
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    await User.create({ ...user, password: hashedPassword })
    return { success: true, message: 'User registered successfully' }
  } catch (error) {
    return { success: false, message: formatError(error)}
  }
}
