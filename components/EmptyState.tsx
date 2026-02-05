'use client'

import { motion } from 'framer-motion'

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-8"
    >
      {/* Illustration */}
      <div className="relative mb-8">
        {/* Background glow */}
        <div className="absolute inset-0 blur-3xl bg-glean-blue/10 rounded-full scale-150" />

        {/* Stacked cards illustration */}
        <div className="relative">
          {/* Back card */}
          <motion.div
            initial={{ opacity: 0, y: 10, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -left-4 -top-2 w-20 h-14 rounded-lg bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5"
          />

          {/* Middle card */}
          <motion.div
            initial={{ opacity: 0, y: 10, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute -right-3 -top-1 w-20 h-14 rounded-lg bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5"
          />

          {/* Front card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative w-24 h-16 rounded-xl bg-gradient-to-br from-glean-dark-alt to-glean-dark border border-white/10 flex items-center justify-center overflow-hidden"
          >
            {/* Mesh pattern inside */}
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="emptyGrad1" cx="20%" cy="20%" r="60%">
                  <stop offset="0%" stopColor="#D8FD49" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D8FD49" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="emptyGrad2" cx="80%" cy="80%" r="50%">
                  <stop offset="0%" stopColor="#343CED" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#343CED" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#emptyGrad1)" />
              <rect width="100%" height="100%" fill="url(#emptyGrad2)" />
            </svg>

            {/* Placeholder lines */}
            <div className="relative flex flex-col gap-1.5 w-14">
              <div className="h-1 rounded-full bg-white/20 w-full" />
              <div className="h-1 rounded-full bg-white/10 w-3/4" />
              <div className="h-1 rounded-full bg-white/10 w-1/2" />
            </div>
          </motion.div>

          {/* Decorative plus */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6, type: 'spring' }}
            className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-glean-lime/20 border border-glean-lime/30 flex items-center justify-center"
          >
            <svg className="w-3.5 h-3.5 text-glean-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Text */}
      <h3 className="font-display text-xl font-semibold text-white mb-2">
        No presentations yet
      </h3>
      <p className="text-gray-500 text-center max-w-sm mb-6">
        Generate your first personalized sales deck by running the research, position, and presentation skills.
      </p>

      {/* CLI hint */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Quick start</span>
        </div>
        <code className="font-mono text-sm text-gray-400 block">
          <span className="text-glean-lime">/research</span>{' '}
          <span className="text-gray-500">&quot;Company Name&quot;</span>
        </code>
      </motion.div>
    </motion.div>
  )
}
