import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/lib/db/models/user.model'

const JWT_SECRET = process.env.SEC_KEY!
const JWT_EXPIRES_IN = '7d' 

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    await connectToDatabase()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 })
    }

    const token = jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    const response = NextResponse.json({ success: true, message: 'Login successful' })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 })
  }
}
