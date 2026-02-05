'use client'

import { useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search presentations...' }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`
      relative flex items-center gap-2 px-4 py-2.5 rounded-lg
      bg-white/5 border transition-all duration-200
      ${isFocused ? 'border-glean-blue/50 shadow-glow-sm' : 'border-white/5 hover:border-white/10'}
    `}>
      <svg
        className={`w-4 h-4 transition-colors ${isFocused ? 'text-glean-blue' : 'text-gray-500'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
