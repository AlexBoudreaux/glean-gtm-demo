'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export function FullscreenPresentation({ slug }: { slug: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pin = searchParams.get('pin')
  const [html, setHtml] = useState<string | null>(null)
  const [error, setError] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Handle ESC key to exit fullscreen (back to deck view with PIN)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && pin) {
        router.push(`/deck/${slug}?pin=${pin}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slug, pin, router])

  useEffect(() => {
    if (!pin) {
      setError('PIN required. Access via the deck page first.')
      return
    }

    fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, pin }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setHtml(data.html)
        }
      })
      .catch(() => setError('Failed to load presentation'))
  }, [slug, pin])

  // Auto-focus iframe when presentation loads so arrow keys work immediately
  useEffect(() => {
    if (html && iframeRef.current) {
      const timer = setTimeout(() => {
        iframeRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [html])

  if (error) {
    return (
      <div className="w-screen h-screen bg-glean-dark flex items-center justify-center text-white">
        <p>{error}</p>
      </div>
    )
  }

  if (!html) {
    return (
      <div className="w-screen h-screen bg-glean-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-glean-blue animate-spin" />
          <p className="text-gray-500 text-sm">Loading presentation...</p>
        </div>
      </div>
    )
  }

  return (
    <iframe
      ref={iframeRef}
      srcDoc={html}
      className="w-screen h-screen border-0 outline-none"
      title="Presentation"
      tabIndex={0}
    />
  )
}
