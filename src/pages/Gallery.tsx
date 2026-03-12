import { useState, useEffect } from 'react'

interface GalleryImage { id: number; url: string; description: string }
interface GalleryData { [year: string]: GalleryImage[] }

const years = ['2026', '2025', '2024']

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<GalleryData>({})
  const [selectedYear, setSelectedYear] = useState('2026')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/gallery.json')
      .then(r => r.json())
      .then(data => { setGalleryData(data); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }, [])

  const currentImages = galleryData[selectedYear] || []

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Moments & Memories</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">
            EES <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Snapshots from our workshops, seminars, cultural fests, and landmark events.
          </p>
        </div>
      </section>

      {/* ── YEAR FILTER ──────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-3 px-6 mb-12 flex-wrap">
        {years.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-7 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              selectedYear === year
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:-translate-y-0.5'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* ── GALLERY GRID ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Grid */}
        {!isLoading && currentImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentImages.map(image => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-blue-500/40 transition-all duration-400 cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square overflow-hidden bg-white/5">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <p className="text-white text-sm font-semibold line-clamp-2">{image.description}</p>
                </div>
                {/* Expand icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && currentImages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-semibold">No images available for {selectedYear}</p>
          </div>
        )}
      </section>

      {/* ── LIGHTBOX MODAL ───────────────────────────────────────────────── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>

            {/* Image wrapper — glow + ring border ON the image */}
            <div className="relative w-full">
              {/* Glow behind image */}
              <div className="absolute -inset-3 bg-blue-600/20 rounded-3xl blur-2xl pointer-events-none" />

              {/* Image with ring border applied directly on it */}
              <img
                src={selectedImage.url}
                alt={selectedImage.description}
                className="relative w-full max-h-[70vh] object-contain rounded-2xl ring-2 ring-blue-500/70 shadow-[0_0_60px_rgba(59,130,246,0.25)]"
              />

              {/* Close button — top-right corner, on the image */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/60 hover:bg-red-600/90 border border-white/20 hover:border-red-500 text-white rounded-xl flex items-center justify-center transition-all duration-200 backdrop-blur-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Caption bar */}
            <div className="mt-4 w-full flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-3.5 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <p className="text-gray-200 font-medium text-sm leading-snug">{selectedImage.description}</p>
            </div>

            {/* Hint */}
            <p className="mt-3 text-gray-700 text-xs">Click anywhere outside to close</p>
          </div>
        </div>
      )}
    </main>
  )
}
