import { NextResponse } from 'next/server'
import { getPresentation, getMetadata } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const { slug, pin } = await request.json()

    if (!slug || !pin) {
      return NextResponse.json(
        { error: 'Missing slug or pin' },
        { status: 400 }
      )
    }

    const metadata = await getMetadata(slug)

    if (!metadata) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 })
    }

    if (metadata.pin !== pin) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const html = await getPresentation(slug)

    if (!html) {
      return NextResponse.json({ error: 'Presentation not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      html,
      company: metadata.company,
    })
  } catch (error) {
    console.error('Validate error:', error)
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 500 }
    )
  }
}
