import { put, del, list } from '@vercel/blob'

export interface DeckMetadata {
  slug: string
  company: string
  pin: string
  createdAt: string
}

// Internal helpers

async function readBlob(pathname: string): Promise<string | null> {
  const { blobs } = await list({ prefix: pathname, limit: 1 })
  if (blobs.length === 0) return null
  const res = await fetch(blobs[0].downloadUrl)
  return res.text()
}

async function writeBlob(pathname: string, content: string): Promise<void> {
  await put(pathname, content, { access: 'public', addRandomSuffix: false })
}

async function deleteBlob(pathname: string): Promise<void> {
  const { blobs } = await list({ prefix: pathname, limit: 1 })
  if (blobs.length > 0) await del(blobs[0].url)
}

// Presentations (HTML files)

export async function getPresentation(slug: string): Promise<string | null> {
  return readBlob(`presentations/${slug}.html`)
}

export async function setPresentation(slug: string, html: string): Promise<void> {
  await writeBlob(`presentations/${slug}.html`, html)
}

export async function deletePresentation(slug: string): Promise<void> {
  await deleteBlob(`presentations/${slug}.html`)
}

// Metadata (JSON files)

export async function getMetadata(slug: string): Promise<DeckMetadata | null> {
  const data = await readBlob(`metadata/${slug}.json`)
  if (!data) return null
  return JSON.parse(data)
}

export async function setMetadata(slug: string, data: DeckMetadata): Promise<void> {
  await writeBlob(`metadata/${slug}.json`, JSON.stringify(data, null, 2))
}

export async function deleteMetadata(slug: string): Promise<void> {
  await deleteBlob(`metadata/${slug}.json`)
}

// Index (list of all deck slugs)

export async function getIndex(): Promise<string[]> {
  const data = await readBlob('metadata/_index.json')
  if (!data) return []
  return JSON.parse(data)
}

export async function setIndex(index: string[]): Promise<void> {
  await writeBlob('metadata/_index.json', JSON.stringify(index, null, 2))
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
