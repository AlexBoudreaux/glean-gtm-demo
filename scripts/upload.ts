#!/usr/bin/env npx tsx

/**
 * Upload Script
 *
 * Uploads a generated presentation HTML file to the gallery.
 *
 * Usage:
 *   npx tsx scripts/upload.ts <file.html> "<Company Name>"
 *
 * Example:
 *   npx tsx scripts/upload.ts output/acme-corp-deck.html "Acme Corp"
 *
 * Environment variables:
 *   ADMIN_SECRET - Required for authentication
 *   GALLERY_URL  - Gallery app URL (default: http://localhost:3000)
 */

import { readFileSync } from 'fs'
import { basename } from 'path'

const GALLERY_URL = process.env.GALLERY_URL || 'http://localhost:3000'
const ADMIN_SECRET = process.env.ADMIN_SECRET

async function upload(filePath: string, company: string) {
  if (!ADMIN_SECRET) {
    console.error('Error: ADMIN_SECRET not set')
    console.error('Set it in your environment or .env.local file')
    process.exit(1)
  }

  // Read the HTML file
  let html: string
  try {
    html = readFileSync(filePath, 'utf-8')
  } catch {
    console.error(`Error: Could not read file ${filePath}`)
    process.exit(1)
  }

  // Create form data
  const formData = new FormData()
  formData.append('file', new Blob([html], { type: 'text/html' }), basename(filePath))
  formData.append('company', company)

  console.log(`Uploading presentation for ${company}...`)

  try {
    const response = await fetch(`${GALLERY_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ADMIN_SECRET}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      console.error(`Error: ${data.error}`)
      process.exit(1)
    }

    console.log('\n✓ Upload successful!\n')
    console.log(`Company: ${company}`)
    console.log(`URL: ${data.url}`)
    console.log(`PIN: ${data.pin}`)
    console.log('')
  } catch (err) {
    console.error('Error: Upload failed')
    console.error(err)
    process.exit(1)
  }
}

// CLI
const args = process.argv.slice(2)

if (args.length < 2) {
  console.log('Usage: npx tsx scripts/upload.ts <file.html> "<Company Name>"')
  console.log('')
  console.log('Example:')
  console.log('  npx tsx scripts/upload.ts output/acme-corp-deck.html "Acme Corp"')
  console.log('')
  console.log('Environment variables:')
  console.log('  ADMIN_SECRET - Required for authentication')
  console.log(`  GALLERY_URL  - Gallery app URL (default: ${GALLERY_URL})`)
  process.exit(1)
}

const [filePath, company] = args
upload(filePath, company)
