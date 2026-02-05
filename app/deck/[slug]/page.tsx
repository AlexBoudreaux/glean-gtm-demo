import { PinGate } from '@/components/PinGate'

export default async function DeckPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main className="min-h-screen bg-glean-dark">
      <PinGate slug={slug} />
    </main>
  )
}
