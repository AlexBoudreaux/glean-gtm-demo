'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import GleanLogo from './ui/GleanLogo'
import { CopyButton } from './ui/CopyButton'

interface PinGateProps {
  slug: string
}

const RECENTLY_VIEWED_KEY = 'recentlyViewed'
const MAX_RECENT = 3

export function PinGate({ slug }: PinGateProps) {
  const searchParams = useSearchParams()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [html, setHtml] = useState<string | null>(null)
  const [company, setCompany] = useState('')
  const [unlockSuccess, setUnlockSuccess] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const pendingHtml = useRef<string | null>(null)
  const pendingCompany = useRef<string>('')
  const autoValidated = useRef(false)

  // Auto-validate if PIN is in URL (coming back from fullscreen)
  useEffect(() => {
    const urlPin = searchParams.get('pin')
    if (urlPin && !autoValidated.current) {
      autoValidated.current = true
      setPin(urlPin)
      // Validate immediately
      fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, pin: urlPin }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.html) {
            setHtml(data.html)
            setCompany(data.company)
          }
        })
        .catch(() => {})
    }
  }, [searchParams, slug])

  // Fetch company name on mount
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await fetch(`/api/decks`)
        if (res.ok) {
          const data = await res.json()
          const deck = data.decks?.find((d: { slug: string }) => d.slug === slug)
          if (deck) setCompany(deck.company)
        }
      } catch {
        // Silent fail, company name is optional
      }
    }
    fetchMeta()
  }, [slug])

  // Auto-focus iframe when presentation loads so arrow keys work immediately
  useEffect(() => {
    if (html && iframeRef.current) {
      // Small delay to ensure iframe content has initialized
      const timer = setTimeout(() => {
        iframeRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [html])

  // Track recently viewed after unlock
  const trackRecentlyViewed = () => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY)
      const recent: string[] = stored ? JSON.parse(stored) : []
      const updated = [slug, ...recent.filter(s => s !== slug)].slice(0, MAX_RECENT)
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated))
    } catch {
      // Silent fail
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, pin }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid PIN')
        setShake(true)
        setTimeout(() => setShake(false), 500)
        setLoading(false)
        return
      }

      // Store the data for after animation
      pendingHtml.current = data.html
      pendingCompany.current = data.company

      // Show success state on the PIN form
      setUnlockSuccess(true)
      setLoading(false)

      // Wait for success animation to play, then transition
      setTimeout(() => {
        setHtml(pendingHtml.current)
        setCompany(pendingCompany.current)
        trackRecentlyViewed()
      }, 1800)

    } catch {
      setError('Something went wrong')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setLoading(false)
    }
  }

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/deck/${slug}`
    : `/deck/${slug}`

  // Show presentation if unlocked
  if (html) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="min-h-screen flex flex-col bg-glean-dark"
      >
        {/* Header */}
        <header className="bg-glean-dark border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <GleanLogo className="h-5 text-white hover:text-glean-lime transition-colors" />
            </Link>
            <div className="w-px h-6 bg-white/10" />
            <div>
              <h1 className="font-display font-semibold text-white">{company}</h1>
              <p className="text-xs text-gray-500">Sales Presentation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CopyButton text={url} variant="icon-only" />

            <Link
              href="/"
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Back to Gallery
            </Link>

            <Link
              href={`/deck/${slug}/present?pin=${pin}`}
              className="px-4 py-2 bg-glean-lime text-glean-dark font-medium rounded-lg text-sm hover:brightness-110 hover:shadow-glow-sm transition-all"
            >
              Present Fullscreen
            </Link>
          </div>
        </header>

        {/* Presentation */}
        <div className="flex-1 bg-glean-dark">
          <iframe
            ref={iframeRef}
            srcDoc={html}
            className="w-full h-full min-h-[calc(100vh-73px)] outline-none"
            title={company}
            tabIndex={0}
          />
        </div>
      </motion.div>
    )
  }

  // Show PIN entry form
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-glean-dark bg-gradient-radial from-glean-dark-alt to-glean-dark">
      {/* Subtle noise texture */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={`relative bg-glean-dark-alt border rounded-2xl p-8 max-w-sm w-full shadow-xl transition-colors duration-500 ${
          shake ? 'animate-shake' : ''
        } ${
          unlockSuccess ? 'border-glean-blue/50' : 'border-white/10'
        }`}
      >
        {/* Success glow effect */}
        <AnimatePresence>
          {unlockSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: '0 0 60px rgba(52, 60, 237, 0.3), inset 0 0 60px rgba(52, 60, 237, 0.05)'
              }}
            />
          )}
        </AnimatePresence>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <GleanLogo className="h-10 text-white" />
        </div>

        {/* Context */}
        <div className="text-center mb-8">
          <motion.p
            animate={{ color: unlockSuccess ? '#343CED' : '#6B7280' }}
            transition={{ duration: 0.4 }}
            className="text-sm mb-1"
          >
            {unlockSuccess ? 'Access granted' : 'Presentation for'}
          </motion.p>
          <h1 className="font-display text-xl font-semibold text-white">
            {company || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </h1>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <motion.input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              disabled={unlockSuccess}
              animate={{
                borderColor: unlockSuccess ? 'rgba(52, 60, 237, 0.5)' : undefined,
                boxShadow: unlockSuccess ? '0 0 30px rgba(52, 60, 237, 0.3)' : undefined,
              }}
              transition={{ duration: 0.5 }}
              style={{ caretColor: pin.length > 0 ? '#343CED' : 'transparent' }}
              className={`
                w-full px-6 py-4 bg-white/5 border rounded-xl
                text-center font-mono text-2xl tracking-[0.3em] text-white
                placeholder-gray-600
                focus:outline-none transition-all duration-300
                disabled:cursor-default
                ${error
                  ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                  : unlockSuccess
                    ? 'border-glean-blue/50'
                    : 'border-white/10 focus:border-glean-blue/50 focus:shadow-glow'
                }
              `}
              autoFocus
            />

            {/* Success checkmark */}
            <AnimatePresence>
              {unlockSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="absolute right-4 top-0 bottom-0 flex items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-glean-blue/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-glean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-red-400 text-sm text-center mb-4"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || pin.length < 4 || unlockSuccess}
            animate={{
              backgroundColor: unlockSuccess ? 'rgba(52, 60, 237, 0.2)' : undefined,
            }}
            transition={{ duration: 0.3 }}
            className={`
              w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300
              ${unlockSuccess
                ? 'bg-glean-blue/20 text-glean-blue cursor-default'
                : loading || pin.length < 4
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                  : 'bg-glean-lime text-glean-dark hover:brightness-110 hover:shadow-glow'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </span>
            ) : unlockSuccess ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Unlocking...
              </span>
            ) : (
              'View Presentation'
            )}
          </motion.button>
        </form>

        {/* Back Link */}
        <Link
          href="/"
          className={`block text-center text-sm mt-6 transition-colors ${
            unlockSuccess ? 'text-gray-600 pointer-events-none' : 'text-gray-500 hover:text-glean-blue'
          }`}
        >
          Back to Gallery
        </Link>
      </motion.div>
    </div>
  )
}
