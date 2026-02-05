import { FullscreenPresentation } from '@/components/FullscreenPresentation'

export default async function PresentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <FullscreenPresentation slug={slug} />
}
