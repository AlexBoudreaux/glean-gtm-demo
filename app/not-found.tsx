'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GleanLogo from '@/components/ui/GleanLogo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-glean-dark bg-gradient-radial from-glean-dark-alt to-glean-dark p-4">
      {/* Subtle noise texture */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <GleanLogo className="h-6 text-white" />
        </div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-6"
        >
          <h1 className="font-display text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 leading-none">
            404
          </h1>
          {/* Glow effect behind the number */}
          <div className="absolute inset-0 blur-3xl bg-glean-blue/10 -z-10" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-display text-xl font-semibold text-white mb-2">
            Presentation not found
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            The presentation you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-glean-lime text-glean-dark font-medium rounded-lg text-sm hover:brightness-110 hover:shadow-glow transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
