'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Architecture() {
  return (
    <div className="min-h-screen bg-glean-dark">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-body text-sm">Back to Gallery</span>
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How It Works
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Architecture
          </h1>
          <p className="font-body text-lg text-gray-400 max-w-2xl">
            How the system works under the hood. Claude Code / Cowork skills running locally, connected to a Next.js gallery app deployed on Vercel.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-display text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            System Overview
          </h2>

          <div className="bg-glean-dark-alt rounded-xl border border-white/5 p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              {/* Local Side */}
              <div className="flex-1">
                <div className="h-full bg-white/[0.02] rounded-lg border border-white/10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="font-mono text-xs text-gray-400">LOCAL</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-4">Claude Code / Cowork</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-3 py-2 bg-glean-lime/10 rounded-lg border border-glean-lime/20">
                      <svg className="w-4 h-4 text-glean-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-mono text-sm text-glean-lime">/research</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 bg-glean-blue/10 rounded-lg border border-glean-blue/20">
                      <svg className="w-4 h-4 text-glean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="font-mono text-sm text-glean-blue">/position</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 bg-glean-purple/10 rounded-lg border border-glean-purple/20">
                      <svg className="w-4 h-4 text-glean-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-mono text-sm text-glean-purple">/presentation</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5">
                    <p className="font-mono text-xs text-gray-500">Skills are markdown files with instructions, context, and reference data.</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center lg:flex-col">
                <div className="hidden lg:flex flex-col items-center gap-2">
                  <span className="font-mono text-xs text-gray-500">POST /api/upload</span>
                  <svg className="w-8 h-8 text-glean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <div className="lg:hidden flex items-center gap-2">
                  <svg className="w-8 h-8 text-glean-blue rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="font-mono text-xs text-gray-500">POST /api/upload</span>
                </div>
              </div>

              {/* Deployed Side */}
              <div className="flex-1">
                <div className="h-full bg-white/[0.02] rounded-lg border border-white/10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-glean-blue"></div>
                    <span className="font-mono text-xs text-gray-400">DEPLOYED ON VERCEL</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-4">Gallery App</h3>

                  <div className="space-y-3">
                    <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                        <span className="font-mono text-sm text-gray-300">File Storage</span>
                      </div>
                      <p className="font-mono text-xs text-gray-500 pl-6">Stores HTML presentations + metadata</p>
                    </div>
                    <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-mono text-sm text-gray-300">API Routes</span>
                      </div>
                      <p className="font-mono text-xs text-gray-500 pl-6">API routes for upload, validation, listing</p>
                    </div>
                    <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="font-mono text-sm text-gray-300">PIN Validation</span>
                      </div>
                      <p className="font-mono text-xs text-gray-500 pl-6">Server-side access control per deck</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-display text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            Tech Stack
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Next.js 14', desc: 'App Router', color: 'white' },
              { name: 'Vercel', desc: 'Hosting', color: 'white' },
              { name: 'File Storage', desc: 'Persistence', color: 'glean-blue' },
              { name: 'Reveal.js', desc: 'Presentations', color: 'glean-orange' },
              { name: 'Tailwind CSS', desc: 'Styling', color: 'sky-400' },
              { name: 'Framer Motion', desc: 'Animations', color: 'pink-400' },
              { name: 'Claude Skills', desc: 'AI Workflow', color: 'glean-purple' },
              { name: 'TypeScript', desc: 'Type Safety', color: 'blue-400' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="bg-glean-dark-alt rounded-lg border border-white/5 p-4 hover:border-white/10 transition-colors"
              >
                <p className={`font-display font-semibold text-${tech.color} mb-1`}>{tech.name}</p>
                <p className="font-mono text-xs text-gray-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Data Flow */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-display text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            Data Flow
          </h2>

          <div className="bg-glean-dark-alt rounded-xl border border-white/5 p-6">
            <ol className="space-y-4">
              {[
                { step: '1', text: 'User runs /research <company> in Claude Code / Cowork', color: 'glean-lime' },
                { step: '2', text: 'Research skill searches web, outputs prospect-research.md', color: 'glean-lime' },
                { step: '3', text: 'User runs /position <company>, reads research file', color: 'glean-blue' },
                { step: '4', text: 'Position skill outputs prospect-strategy.md with positioning', color: 'glean-blue' },
                { step: '5', text: 'User runs /presentation <company>, reads strategy file', color: 'glean-purple' },
                { step: '6', text: 'Presentation skill generates HTML slides, runs build script', color: 'glean-purple' },
                { step: '7', text: 'Upload script POSTs to /api/upload with HTML + metadata', color: 'gray-400' },
                { step: '8', text: 'Gallery stores presentation, returns URL + PIN', color: 'green-400' },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-${item.color}/10 border border-${item.color}/30 flex items-center justify-center font-mono text-xs text-${item.color}`}>
                    {item.step}
                  </span>
                  <span className="font-body text-gray-300 pt-0.5">{item.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* API Routes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="font-display text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
            API Endpoints
          </h2>

          <div className="bg-glean-dark-alt rounded-xl border border-white/5 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-3 font-mono text-xs text-gray-500 font-normal">Method</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-gray-500 font-normal">Endpoint</th>
                  <th className="text-left px-6 py-3 font-mono text-xs text-gray-500 font-normal">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-6 py-3"><span className="font-mono text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">POST</span></td>
                  <td className="px-6 py-3 font-mono text-sm text-gray-300">/api/upload</td>
                  <td className="px-6 py-3 font-body text-sm text-gray-400">Upload new presentation</td>
                </tr>
                <tr>
                  <td className="px-6 py-3"><span className="font-mono text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">GET</span></td>
                  <td className="px-6 py-3 font-mono text-sm text-gray-300">/api/decks</td>
                  <td className="px-6 py-3 font-body text-sm text-gray-400">List all deck metadata</td>
                </tr>
                <tr>
                  <td className="px-6 py-3"><span className="font-mono text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">POST</span></td>
                  <td className="px-6 py-3 font-mono text-sm text-gray-300">/api/validate</td>
                  <td className="px-6 py-3 font-body text-sm text-gray-400">Validate PIN, return deck HTML</td>
                </tr>
                <tr>
                  <td className="px-6 py-3"><span className="font-mono text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded">DELETE</span></td>
                  <td className="px-6 py-3 font-mono text-sm text-gray-300">/api/deck/[slug]</td>
                  <td className="px-6 py-3 font-body text-sm text-gray-400">Remove a deck</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-gray-500">
              Built for the Glean GTM Engineer application
            </p>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm text-glean-blue hover:text-glean-lime transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              How It Works
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
