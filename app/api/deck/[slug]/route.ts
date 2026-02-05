import { NextResponse } from 'next/server'
import { deletePresentation, deleteMetadata, getIndex, setIndex } from '@/lib/storage'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug } = await params

    await deletePresentation(slug)
    await deleteMetadata(slug)

    const index = (await getIndex()).filter((s) => s !== slug)
    await setIndex(index)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    )
  }
}
