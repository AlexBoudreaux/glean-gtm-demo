'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import { DeckCard } from './ui/DeckCard'
import { SearchBar } from './ui/SearchBar'
import { SortDropdown, SortOption } from './ui/SortDropdown'
import EmptyState from './EmptyState'

interface Deck {
  slug: string
  company: string
  createdAt: string
}

interface DashboardProps {
  initialDecks: Deck[]
}

const RECENTLY_VIEWED_KEY = 'recentlyViewed'
const MAX_RECENT = 3

export default function Dashboard({ initialDecks }: DashboardProps) {
  const [activeFolder, setActiveFolder] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('date-desc')
  const [decks, setDecks] = useState(initialDecks)
  const [recentSlugs, setRecentSlugs] = useState<string[]>([])

  // Load recently viewed from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY)
    if (stored) {
      try {
        setRecentSlugs(JSON.parse(stored))
      } catch {
        setRecentSlugs([])
      }
    }
  }, [])

  // Filter and sort decks
  const filteredDecks = useMemo(() => {
    let result = [...decks]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(deck =>
        deck.company.toLowerCase().includes(query)
      )
    }

    // Apply sort
    result.sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'name-asc':
          return a.company.localeCompare(b.company)
        case 'name-desc':
          return b.company.localeCompare(a.company)
        default:
          return 0
      }
    })

    return result
  }, [decks, searchQuery, sortOption])

  // Get recently viewed decks
  const recentDecks = useMemo(() => {
    return recentSlugs
      .map(slug => decks.find(d => d.slug === slug))
      .filter((d): d is Deck => d !== undefined)
      .slice(0, MAX_RECENT)
  }, [recentSlugs, decks])

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/deck/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET || ''}`,
        },
      })

      if (res.ok) {
        setDecks(prev => prev.filter(d => d.slug !== slug))
        setRecentSlugs(prev => prev.filter(s => s !== slug))
        localStorage.setItem(
          RECENTLY_VIEWED_KEY,
          JSON.stringify(recentSlugs.filter(s => s !== slug))
        )
      }
    } catch (error) {
      console.error('Failed to delete deck:', error)
    }
  }

  return (
    <div className="flex h-screen bg-glean-dark overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeFolder={activeFolder} onFolderChange={setActiveFolder} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Page Header - matches sidebar header height */}
        <div className="h-[73px] px-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-semibold text-white">
              Sales Deck Gallery
            </h1>
            <p className="text-gray-500 text-xs">
              Personalized presentations powered by AI
            </p>
          </div>

          <div className="flex items-center gap-3">
            {decks.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-glean-lime" />
                <span className="font-mono">{decks.length}</span> deck{decks.length !== 1 ? 's' : ''}
              </span>
            )}

            {/* Info Buttons */}
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How It Works
            </Link>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Architecture
            </Link>
            <a
              href="https://github.com/AlexBoudreaux/glean-gtm-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div className="p-8">
          {/* Search and Sort */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search presentations..."
              />
            </div>
            <SortDropdown value={sortOption} onChange={setSortOption} />
          </div>

          {decks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-10">
              {/* Recently Viewed Section */}
              {recentDecks.length > 0 && !searchQuery && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-sm font-medium text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Recently Viewed
                  </h2>
                  <div className="relative">
                    {/* Fade edge on right */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-glean-dark to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mr-8 pr-8">
                      {recentDecks.map((deck, index) => (
                        <motion.div
                          key={deck.slug}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex-shrink-0 w-56"
                        >
                          <DeckCard deck={deck} compact />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

              {/* All Presentations Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: recentDecks.length > 0 ? 0.2 : 0 }}
              >
                <h2 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {searchQuery ? `Search Results` : 'All Presentations'}
                  <span className="font-mono text-sm text-gray-500 ml-2">
                    ({filteredDecks.length})
                  </span>
                </h2>

                {filteredDecks.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>No presentations match your search.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDecks.map((deck, index) => (
                      <motion.div
                        key={deck.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <DeckCard deck={deck} onDelete={handleDelete} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
