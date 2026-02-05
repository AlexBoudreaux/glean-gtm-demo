'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GleanLogo from '@/components/ui/GleanLogo'

export default function Error({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-glean-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <GleanLogo className="h-6 text-white" />
        </div>

        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="font-display text-xl font-semibold text-white mb-2">
          Failed to load deck
        </h1>
        <p className="text-gray-500 mb-6">
          Something went wrong loading this presentation.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2.5 bg-glean-lime text-glean-dark font-medium rounded-lg text-sm hover:brightness-110 hover:shadow-glow-sm transition-all"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2.5 border border-white/10 text-gray-400 rounded-lg text-sm hover:text-white hover:border-white/20 transition-all"
          >
            Back to Gallery
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
