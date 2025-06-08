import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  const data = await req.formData()
  const file = data.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file found' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((err: { message: any }, result: { secure_url: any }) => {
      if (err || !result) {
        reject(NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 }))
        return
      }
      resolve(NextResponse.json({ url: result.secure_url }))
    })
    stream.end(buffer)
  })
}
