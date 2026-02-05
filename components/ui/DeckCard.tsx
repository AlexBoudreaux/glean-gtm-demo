'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CopyButton } from './CopyButton'

interface Deck {
  slug: string
  company: string
  createdAt: string
}

interface DeckCardProps {
  deck: Deck
  onDelete?: (slug: string) => void
  compact?: boolean
}

// Generate consistent colors based on company name
function getThemeColors(name: string): { primary: string; secondary: string; accent: string } {
  const themes = [
    { primary: '#D8FD49', secondary: '#343CED', accent: '#E4FD7A' },
    { primary: '#343CED', secondary: '#8151F5', accent: '#D8FD49' },
    { primary: '#10B981', secondary: '#D8FD49', accent: '#34D399' },
    { primary: '#FF7E4C', secondary: '#D8FD49', accent: '#FBBF24' },
    { primary: '#E16BFF', secondary: '#343CED', accent: '#F472B6' },
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return themes[index % themes.length]
}

// Thumbnail with gradient that fades to black + fading grid
function ThumbnailPattern({ name, compact = false }: { name: string; compact?: boolean }) {
  const colors = getThemeColors(name)
  const firstWord = name.split(' ')[0]

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Primary gradient blob - bottom right, fades to black */}
      <div
        className="absolute bottom-0 right-0 w-full h-full rounded-full blur-3xl opacity-60"
        style={{
          background: `radial-gradient(circle at 80% 80%, ${colors.primary} 0%, transparent 50%)`
        }}
      />

      {/* Secondary accent - top area, subtle */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full blur-3xl opacity-40"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${colors.secondary} 0%, transparent 40%)`
        }}
      />

      {/* Grid overlay - fades with the gradient using mask */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)
          `,
          backgroundSize: compact ? '16px 16px' : '24px 24px',
          maskImage: `radial-gradient(circle at 80% 80%, black 0%, transparent 30%), radial-gradient(circle at 20% 20%, black 0%, transparent 20%)`,
          WebkitMaskImage: `radial-gradient(circle at 80% 80%, black 0%, transparent 30%), radial-gradient(circle at 20% 20%, black 0%, transparent 20%)`
        }}
      />

      {/* Company first word */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-display font-bold ${compact ? 'text-base' : 'text-3xl'} text-white/[0.55] tracking-wide`}
        >
          {firstWord}
        </span>
      </div>
    </div>
  )
}

export function DeckCard({ deck, onDelete, compact = false }: DeckCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/deck/${deck.slug}`
    : `/deck/${deck.slug}`

  const handleDelete = async () => {
    if (!onDelete || isDeleting) return
    if (!confirm(`Delete presentation for ${deck.company}?`)) return

    setIsDeleting(true)
    onDelete(deck.slug)
  }

  const formattedDate = new Date(deck.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  if (compact) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="group bg-glean-dark-alt border border-white/5 rounded-xl overflow-hidden hover:border-glean-blue/30 transition-all duration-200"
      >
        <Link href={`/deck/${deck.slug}`} className="block">
          {/* Compact Thumbnail */}
          <div className="h-20 relative overflow-hidden bg-glean-dark">
            <ThumbnailPattern name={deck.company} compact />
          </div>

          {/* Compact Content */}
          <div className="p-3">
            <h3 className="font-display font-semibold text-white text-sm truncate group-hover:text-glean-lime transition-colors">
              {deck.company}
            </h3>
            <p className="font-mono text-xs text-gray-500 mt-0.5">{formattedDate}</p>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className="group bg-glean-dark-alt border border-white/5 rounded-xl overflow-hidden hover:border-glean-blue/30 hover:shadow-card-hover transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/8] relative overflow-hidden bg-glean-dark">
        <ThumbnailPattern name={deck.company} />

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />

        {/* Delete button (visible on hover) */}
        {onDelete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 text-gray-400 hover:text-red-400 hover:bg-black/70 transition-colors disabled:opacity-50"
            title="Delete presentation"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h2 className="font-display font-semibold text-base text-white mb-0.5 group-hover:text-glean-lime transition-colors">
          {deck.company}
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span className="font-body">Created by Alex</span>
          <span className="text-gray-600">·</span>
          <span className="font-mono text-xs">{formattedDate}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/deck/${deck.slug}`}
            className="flex-1 text-center px-4 py-2.5 bg-glean-lime text-glean-dark font-medium rounded-lg hover:brightness-110 hover:shadow-glow-sm transition-all text-sm"
          >
            View
          </Link>
          <CopyButton text={url} />
        </div>
      </div>
    </motion.div>
  )
}
