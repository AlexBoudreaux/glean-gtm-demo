#!/usr/bin/env npx tsx

/**
 * Build Deck Script
 *
 * Takes AI-generated slide content and combines it with the Reveal.js boilerplate
 * to produce a complete, self-contained HTML presentation.
 *
 * Usage:
 *   npx tsx scripts/build-deck.ts <slides-file> <output-file>
 *
 * Example:
 *   npx tsx scripts/build-deck.ts output/acme-corp-slides.html output/acme-corp-deck.html
 *
 * The slides file should contain three marked sections:
 *   <!-- CUSTOM_STYLES -->
 *   <style>...</style>
 *
 *   <!-- SLIDES -->
 *   <section>...</section>
 *
 *   <!-- CUSTOM_SCRIPTS -->
 *   <script>...</script>
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Get the directory of this script
const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

// Template file location
const TEMPLATE_PATH = join(projectRoot, 'templates', 'reveal-base.html')

interface ParsedSlides {
  customStyles: string
  slides: string
  customScripts: string
  title: string
}

/**
 * Strip wrapping tags from content.
 * The AI might include <style>...</style> or <script>...</script> tags,
 * but the template already provides these, so we need to extract just the inner content.
 */
function stripTag(content: string, tagName: string): string {
  // Match <tag>content</tag> and extract just the content
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, 'i')
  const match = content.match(regex)
  if (match) {
    return match[1].trim()
  }
  // If no tags found, return as-is (might just be raw CSS/JS)
  return content.trim()
}

function parseAIOutput(content: string): ParsedSlides {
  // Extract title from TITLE comment
  let title = 'Presentation'
  const titleMatch = content.match(/<!--\s*TITLE:\s*(.+?)\s*-->/)
  if (titleMatch) {
    title = titleMatch[1]
  }

  // Extract custom styles (everything between <!-- CUSTOM_STYLES --> and <!-- SLIDES -->)
  let customStyles = ''
  const stylesMatch = content.match(/<!--\s*CUSTOM_STYLES\s*-->([\s\S]*?)(?=<!--\s*SLIDES\s*-->)/i)
  if (stylesMatch) {
    // Strip <style> tags if present, we just want the CSS
    customStyles = stripTag(stylesMatch[1], 'style')
  }

  // Extract slides (everything between <!-- SLIDES --> and <!-- CUSTOM_SCRIPTS --> or end)
  let slides = ''
  const slidesMatch = content.match(/<!--\s*SLIDES\s*-->([\s\S]*?)(?=<!--\s*CUSTOM_SCRIPTS\s*-->|$)/i)
  if (slidesMatch) {
    slides = slidesMatch[1].trim()
  }

  // Extract custom scripts (everything after <!-- CUSTOM_SCRIPTS -->)
  let customScripts = ''
  const scriptsMatch = content.match(/<!--\s*CUSTOM_SCRIPTS\s*-->([\s\S]*?)$/i)
  if (scriptsMatch) {
    // Strip <script> tags if present, we just want the JS
    customScripts = stripTag(scriptsMatch[1], 'script')
  }

  return { customStyles, slides, customScripts, title }
}

function buildDeck(slidesFile: string, outputFile: string): void {
  // Check if files exist
  if (!existsSync(slidesFile)) {
    console.error(`Error: Slides file not found: ${slidesFile}`)
    process.exit(1)
  }

  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`Error: Template not found: ${TEMPLATE_PATH}`)
    console.error('Run this script from the project root.')
    process.exit(1)
  }

  // Read files
  const slidesContent = readFileSync(slidesFile, 'utf-8')
  const template = readFileSync(TEMPLATE_PATH, 'utf-8')

  // Parse the AI output
  const parsed = parseAIOutput(slidesContent)

  if (!parsed.slides) {
    console.error('Error: No slides found in input file.')
    console.error('Make sure the file contains a <!-- SLIDES --> marker.')
    process.exit(1)
  }

  // Replace placeholders in template
  let output = template
    .replace('{{TITLE}}', parsed.title)
    .replace('{{CUSTOM_STYLES}}', parsed.customStyles)
    .replace('{{SLIDES}}', parsed.slides)
    .replace('{{CUSTOM_SCRIPTS}}', parsed.customScripts)

  // Write output
  writeFileSync(outputFile, output, 'utf-8')

  console.log(`✓ Built deck: ${outputFile}`)
  console.log(`  - Title: ${parsed.title}`)
  console.log(`  - Slides: ${(parsed.slides.match(/<section/g) || []).length} sections`)
  console.log(`  - Custom styles: ${parsed.customStyles ? 'yes' : 'none'}`)
  console.log(`  - Custom scripts: ${parsed.customScripts ? 'yes' : 'none'}`)
}

// CLI
const args = process.argv.slice(2)

if (args.length < 2) {
  console.log('Usage: npx tsx scripts/build-deck.ts <slides-file> <output-file>')
  console.log('')
  console.log('Example:')
  console.log('  npx tsx scripts/build-deck.ts output/acme-slides.html output/acme-deck.html')
  process.exit(1)
}

const [slidesFile, outputFile] = args
buildDeck(slidesFile, outputFile)
