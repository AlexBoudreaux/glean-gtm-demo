import Dashboard from '@/components/Dashboard'
import { getIndex, getMetadata } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface Deck {
  slug: string
  company: string
  createdAt: string
}

function getDecks(): Deck[] {
  const index = getIndex()
  return index
    .map((slug) => {
      const meta = getMetadata(slug)
      if (!meta) return null
      return { slug: meta.slug, company: meta.company, createdAt: meta.createdAt }
    })
    .filter(Boolean) as Deck[]
}

export default async function Home() {
  const decks = getDecks()

  return <Dashboard initialDecks={decks} />
}
