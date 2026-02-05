import { NextResponse } from 'next/server'
import {
  setPresentation,
  setMetadata,
  getIndex,
  setIndex,
  slugify,
  generatePin,
  DeckMetadata,
} from '@/lib/storage'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const company = formData.get('company') as string

    if (!file || !company) {
      return NextResponse.json(
        { error: 'Missing file or company' },
        { status: 400 }
      )
    }

    const slug = slugify(company)
    const pin = generatePin()
    const html = await file.text()

    setPresentation(slug, html)

    const metadata: DeckMetadata = {
      slug,
      company,
      pin,
      createdAt: new Date().toISOString(),
    }
    setMetadata(slug, metadata)

    const index = getIndex()
    if (!index.includes(slug)) {
      index.push(slug)
      setIndex(index)
    }

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.URL || 'http://localhost:3000'

    return NextResponse.json({
      success: true,
      slug,
      pin,
      url: `${baseUrl}/deck/${slug}`,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
