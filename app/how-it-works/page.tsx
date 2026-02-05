'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HowItWorks() {
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
            href="/architecture"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            View Architecture
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
            How It Works
          </h1>
          <p className="font-body text-lg text-gray-400 max-w-2xl">
            Generate a personalized sales deck in 3 commands. Each step builds on the previous one, turning a company name into a shareable presentation.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <span className="font-mono text-sm text-gray-400">Company Name</span>
              </div>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-glean-lime/10 rounded-lg border border-glean-lime/30">
                <span className="font-mono text-sm text-glean-lime">/research</span>
              </div>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-glean-blue/10 rounded-lg border border-glean-blue/30">
                <span className="font-mono text-sm text-glean-blue">/position</span>
              </div>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-glean-purple/10 rounded-lg border border-glean-purple/30">
                <span className="font-mono text-sm text-glean-purple">/presentation</span>
              </div>
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
              <span className="font-mono text-sm text-green-400">Live URL + PIN</span>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12">
          {/* Step 1: Research */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-glean-lime/10 rounded-xl flex items-center justify-center border border-glean-lime/30">
                <svg className="w-6 h-6 text-glean-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-glean-lime bg-glean-lime/10 px-2 py-0.5 rounded">STEP 1</span>
                  <h2 className="font-display text-xl font-semibold text-white">Research</h2>
                </div>
                <p className="font-body text-gray-400 mb-4">
                  Gathers public information about the prospect. Searches company website, news, product features, tech stack, and growth signals.
                </p>

                {/* Command */}
                <div className="bg-glean-dark-alt rounded-lg border border-white/5 overflow-hidden mb-4">
                  <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">Command</span>
                  </div>
                  <div className="p-4">
                    <code className="font-mono text-sm text-glean-lime">/research jasper-ai</code>
                  </div>
                </div>

                {/* Output Preview */}
                <div className="bg-glean-dark-alt rounded-lg border border-white/5 overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">Output Preview</span>
                    <span className="text-gray-600 text-xs">jasper-ai-research.md</span>
                  </div>
                  <div className="p-4 font-mono text-sm text-gray-400 space-y-2 max-h-48 overflow-y-auto">
                    <p className="text-white">## Company Overview</p>
                    <p>Enterprise AI content automation platform for marketing teams. Recently pivoted to &quot;first multi-agent platform built for marketers.&quot;</p>
                    <p className="text-white mt-3">## Potential Friction Points</p>
                    <p>• No native deployment capability. All content delivery relies on third-party CMS platforms.</p>
                    <p>• Integration quality inconsistent. G2 reviews cite &quot;works 70% of the time.&quot;</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Step 2: Position */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-glean-blue/10 rounded-xl flex items-center justify-center border border-glean-blue/30">
                <svg className="w-6 h-6 text-glean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-glean-blue bg-glean-blue/10 px-2 py-0.5 rounded">STEP 2</span>
                  <h2 className="font-display text-xl font-semibold text-white">Position</h2>
                </div>
                <p className="font-body text-gray-400 mb-4">
                  Converts research into sales positioning. Identifies the opportunity, matches relevant case studies, and structures the pitch narrative.
                </p>

                {/* Command */}
                <div className="bg-glean-dark-alt rounded-lg border border-white/5 overflow-hidden mb-4">
                  <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">Command</span>
                  </div>
                  <div className="p-4">
                    <code className="font-mono text-sm text-glean-blue">/position jasper-ai</code>
                  </div>
                </div>

                {/* Output Preview */}
                <div className="bg-glean-dark-alt rounded-lg border border-white/5 overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">Output Preview</span>
                    <span className="text-gray-600 text-xs">jasper-ai-strategy.md</span>
                  </div>
                  <div className="p-4 font-mono text-sm text-gray-400 space-y-2 max-h-48 overflow-y-auto">
                    <p className="text-white">### The Opportunity</p>
                    <p>Jasper builds AI agents that create marketing content. But those agents can&apos;t deploy anything. Users copy/paste into Google Docs, push through flaky Zapier workflows. Jasper owns creation. Nobody owns delivery. That&apos;s the gap.</p>
                    <p className="text-white mt-3">### Recommended Case Study</p>
                    <p><span className="text-glean-lime">Bolt.new</span>: 1M+ sites deployed via AI agents. Same pattern. AI creates content, Glean helps find it.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Step 3: Presentation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-glean-purple/10 rounded-xl flex items-center justify-center border border-glean-purple/30">
                <svg className="w-6 h-6 text-glean-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-glean-purple bg-glean-purple/10 px-2 py-0.5 rounded">STEP 3</span>
                  <h2 className="font-display text-xl font-semibold text-white">Presentation</h2>
                </div>
                <p className="font-body text-gray-400 mb-4">
                  Generates a polished Reveal.js presentation from the strategy. Builds the deck, uploads to the gallery, and returns a shareable URL with PIN.
                </p>

                {/* Command */}
                <div className="bg-glean-dark-alt rounded-lg border border-white/5 overflow-hidden mb-4">
                  <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">Command</span>
                  </div>
                  <div className="p-4">
                    <code className="font-mono text-sm text-glean-purple">/presentation jasper-ai</code>
                  </div>
                </div>

                {/* Output Preview */}
                <div className="bg-glean-dark-alt rounded-lg border border-white/5 overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/5 flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-mono">Output</span>
                  </div>
                  <div className="p-4 font-mono text-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-400">Deck built and uploaded</span>
                    </div>
                    <div className="pl-7 space-y-1">
                      <p><span className="text-gray-500">URL:</span> <span className="text-glean-lime">https://glean-gallery.vercel.app/deck/jasper-ai</span></p>
                      <p><span className="text-gray-500">PIN:</span> <span className="text-white">4821</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-gray-500">
              Questions about the technical implementation?
            </p>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 text-sm text-glean-blue hover:text-glean-lime transition-colors"
            >
              View Architecture
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
