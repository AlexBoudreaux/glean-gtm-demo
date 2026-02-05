import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs'
import { join } from 'path'

export interface DeckMetadata {
  slug: string
  company: string
  pin: string
  createdAt: string
}

const DATA_DIR = join(process.cwd(), 'data')
const PRESENTATIONS_DIR = join(DATA_DIR, 'presentations')
const METADATA_DIR = join(DATA_DIR, 'metadata')

function ensureDirs() {
  for (const dir of [DATA_DIR, PRESENTATIONS_DIR, METADATA_DIR]) {
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  }
}

// Presentations (HTML files)

export function getPresentation(slug: string): string | null {
  const path = join(PRESENTATIONS_DIR, `${slug}.html`)
  if (!existsSync(path)) return null
  return readFileSync(path, 'utf-8')
}

export function setPresentation(slug: string, html: string): void {
  ensureDirs()
  writeFileSync(join(PRESENTATIONS_DIR, `${slug}.html`), html)
}

export function deletePresentation(slug: string): void {
  const path = join(PRESENTATIONS_DIR, `${slug}.html`)
  if (existsSync(path)) unlinkSync(path)
}

// Metadata (JSON files)

export function getMetadata(slug: string): DeckMetadata | null {
  const path = join(METADATA_DIR, `${slug}.json`)
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf-8'))
}

export function setMetadata(slug: string, data: DeckMetadata): void {
  ensureDirs()
  writeFileSync(join(METADATA_DIR, `${slug}.json`), JSON.stringify(data, null, 2))
}

export function deleteMetadata(slug: string): void {
  const path = join(METADATA_DIR, `${slug}.json`)
  if (existsSync(path)) unlinkSync(path)
}

// Index (list of all deck slugs)

export function getIndex(): string[] {
  const path = join(METADATA_DIR, '_index.json')
  if (!existsSync(path)) return []
  return JSON.parse(readFileSync(path, 'utf-8'))
}

export function setIndex(index: string[]): void {
  ensureDirs()
  writeFileSync(join(METADATA_DIR, '_index.json'), JSON.stringify(index, null, 2))
}

// Helpers

export function slugify(company: string): string {
  return company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function generatePin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}
