import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.SEC_KEY!

export async function getUserFromToken() {
  const token = (await cookies()).get('token')?.value
  if (!token) return null

  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email?: string }
  } catch {
    return null
  }
}
