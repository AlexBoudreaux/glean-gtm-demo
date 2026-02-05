import Dashboard from '@/components/Dashboard'
import { getIndex, getMetadata } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface Deck {
  slug: string
  company: string
  createdAt: string
}

async function getDecks(): Promise<Deck[]> {
  const index = await getIndex()
  const decks = await Promise.all(
    index.map(async (slug) => {
      const meta = await getMetadata(slug)
      if (!meta) return null
      return { slug: meta.slug, company: meta.company, createdAt: meta.createdAt }
    })
  )
  return decks.filter(Boolean) as Deck[]
}

export default async function Home() {
  const decks = await getDecks()

  return <Dashboard initialDecks={decks} />
}
