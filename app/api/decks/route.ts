import { NextResponse } from 'next/server'
import { getIndex, getMetadata } from '@/lib/storage'

export async function GET() {
  try {
    const index = await getIndex()

    const decks = (
      await Promise.all(
        index.map(async (slug) => {
          const meta = await getMetadata(slug)
          if (!meta) return null
          return {
            slug: meta.slug,
            company: meta.company,
            createdAt: meta.createdAt,
          }
        })
      )
    ).filter(Boolean)

    return NextResponse.json({ decks })
  } catch (error) {
    console.error('List error:', error)
    return NextResponse.json(
      { error: 'Failed to list decks' },
      { status: 500 }
    )
  }
}
