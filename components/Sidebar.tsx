'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GleanLogo from './ui/GleanLogo'

interface FolderItem {
  id: string
  name: string
  icon: React.ReactNode
  count?: number
}

const systemFolders: FolderItem[] = [
  {
    id: 'all',
    name: 'All Presentations',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'recent',
    name: 'Recently Viewed',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'favorites',
    name: 'Favorites',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    id: 'archived',
    name: 'Archived',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
  },
]

const userFolders: FolderItem[] = [
  {
    id: 'q1-2026',
    name: 'Q1 2026 Prospects',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    count: 3,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Accounts',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    count: 2,
  },
  {
    id: 'closed-won',
    name: 'Closed Won',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    count: 1,
  },
]

interface SidebarProps {
  activeFolder: string
  onFolderChange: (folderId: string) => void
}

export default function Sidebar({ activeFolder, onFolderChange }: SidebarProps) {
  const [isNewFolderHovered, setIsNewFolderHovered] = useState(false)

  const FolderButton = ({ folder, isActive }: { folder: FolderItem; isActive: boolean }) => (
    <button
      onClick={() => onFolderChange(folder.id)}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
        transition-all duration-200 relative group
        ${isActive
          ? 'bg-glean-dark-alt text-white'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      {/* Active indicator - simple, reliable */}
      <div
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full
          transition-all duration-200
          ${isActive ? 'bg-glean-lime shadow-glow opacity-100' : 'opacity-0'}
        `}
      />

      <span className={`${isActive ? 'text-glean-lime' : 'text-gray-500 group-hover:text-gray-400'} transition-colors duration-200`}>
        {folder.icon}
      </span>

      <span className="flex-1 text-left truncate">{folder.name}</span>

      {folder.count !== undefined && (
        <span className={`
          font-mono text-xs px-1.5 py-0.5 rounded transition-colors duration-200
          ${isActive ? 'bg-glean-lime/20 text-glean-lime' : 'bg-white/5 text-gray-500'}
        `}>
          {folder.count}
        </span>
      )}
    </button>
  )

  return (
    <aside className="w-64 h-screen bg-glean-dark border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-white/5">
        <GleanLogo className="h-10 text-white" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* System Folders */}
        <div className="space-y-1">
          {systemFolders.map(folder => (
            <FolderButton
              key={folder.id}
              folder={folder}
              isActive={activeFolder === folder.id}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* User Folders */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Folders
            </span>
            <button
              onMouseEnter={() => setIsNewFolderHovered(true)}
              onMouseLeave={() => setIsNewFolderHovered(false)}
              className="p-1 rounded text-gray-500 hover:text-glean-lime hover:bg-white/5 transition-colors"
              title="New Folder"
            >
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isNewFolderHovered ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </motion.svg>
            </button>
          </div>

          {userFolders.map(folder => (
            <FolderButton
              key={folder.id}
              folder={folder}
              isActive={activeFolder === folder.id}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glean-lime to-glean-blue flex items-center justify-center text-glean-dark text-sm font-medium">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">Alex Boudreaux</p>
            <p className="text-xs text-gray-500 truncate">GTM Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
