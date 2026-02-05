export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-glean-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-glean-blue animate-spin" />
        <p className="text-gray-500 text-sm">Loading presentation...</p>
      </div>
    </div>
  )
}
