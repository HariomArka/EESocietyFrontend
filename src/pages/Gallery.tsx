import { useState, useEffect } from 'react'

interface GalleryImage { id: number; url: string; description: string }
interface GalleryData { [year: string]: GalleryImage[] }

const years = ['2026', '2025', '2024']

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<GalleryData>({})
  const [selectedYear, setSelectedYear] = useState('2026')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetch('/gallery.json')
      .then(r => r.json())
      .then(data => { setGalleryData(data); setIsLoading(false) })
      .catch(() => setIsLoading(false))
  }, [])

  const currentImages = galleryData[selectedYear] || []

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedImage(null), 300) // Wait for animation
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % currentImages.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(currentImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(currentImages[prevIndex])
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-32 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 opacity-10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="relative z-10 animate-fade-in-up">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-4 opacity-0 animate-fade-in-up animation-delay-200">Moments & Memories</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 opacity-0 animate-fade-in-up animation-delay-400">
            EES <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-600 leading-relaxed">
            Snapshots from our workshops, seminars, cultural fests, and landmark events that capture the spirit of innovation and collaboration.
          </p>
        </div>
      </section>

      {/* ── YEAR FILTER ──────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-4 px-6 mb-16 flex-wrap animate-fade-in-up animation-delay-800">
        {years.map((year, index) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all duration-500 transform hover:scale-105 ${
              selectedYear === year
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl shadow-blue-600/40 hover:shadow-blue-500/60 scale-105'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20'
            }`}
            style={{ animationDelay: `${1000 + index * 100}ms` }}
          >
            {year}
          </button>
        ))}
      </div>

      {/* ── GALLERY GRID ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-32">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-500 rounded-full animate-spin" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin animation-reverse" style={{ animationDuration: '1.5s' }} />
            </div>
          </div>
        )}

        {/* Grid */}
        {!isLoading && currentImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up animation-delay-1000">
            {currentImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-3xl border border-white/8 hover:border-blue-500/50 transition-all duration-700 cursor-pointer hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl hover:shadow-blue-500/20 transform-gpu"
                onClick={() => openModal(image, index)}
                style={{ animationDelay: `${1200 + index * 50}ms` }}
              >
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-white/5 to-white/10 relative">
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Hover overlay with enhanced design */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-blue-300 text-xs font-medium uppercase tracking-wide">View Details</span>
                  </div>
                  <p className="text-white text-sm font-semibold leading-tight line-clamp-3">{image.description}</p>
                </div>

                {/* Expand icon with glow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 border border-white/20 shadow-lg group-hover:shadow-blue-500/30 group-hover:border-blue-400/50 transform scale-75 group-hover:scale-100">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-blue-500 border-t-[20px] border-t-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && currentImages.length === 0 && (
          <div className="text-center py-32 animate-fade-in-up animation-delay-1000">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute -inset-1 bg-blue-500/10 rounded-3xl blur-xl" />
            </div>
            <h3 className="text-gray-400 text-xl font-semibold mb-2">No images available for {selectedYear}</h3>
            <p className="text-gray-600 text-sm">Check back later for new memories!</p>
          </div>
        )}
      </section>

      {/* ── LIGHTBOX MODAL ───────────────────────────────────────────────── */}
      {selectedImage && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/95 backdrop-blur-2xl transition-all duration-500 ${
            isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeModal}
        >
          <div
            className={`relative max-w-5xl w-full flex flex-col items-center transform transition-all duration-500 ${
              isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
            onClick={e => e.stopPropagation()}
          >

            {/* Image wrapper with enhanced glow */}
            <div className="relative w-full mb-6">
              {/* Multi-layer glow effect */}
              <div className="absolute -inset-4 bg-blue-600/15 rounded-3xl blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -inset-2 bg-cyan-500/10 rounded-3xl blur-2xl pointer-events-none animate-pulse animation-delay-500" />

              {/* Image with enhanced styling */}
              <img
                src={selectedImage.url}
                alt={selectedImage.description}
                className="relative w-full max-h-[75vh] object-contain rounded-3xl ring-2 ring-blue-500/60 shadow-[0_0_80px_rgba(59,130,246,0.3)] transition-all duration-500"
              />

              {/* Close button with enhanced design */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/70 hover:bg-red-600/90 border border-white/20 hover:border-red-500 text-white rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:scale-110 shadow-lg hover:shadow-red-500/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left arrow */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/70 hover:bg-blue-600/90 border border-white/20 hover:border-blue-500 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:scale-110 shadow-lg hover:shadow-blue-500/30"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right arrow */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/70 hover:bg-blue-600/90 border border-white/20 hover:border-blue-500 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:scale-110 shadow-lg hover:shadow-blue-500/30"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Enhanced caption bar */}
            <div className="w-full max-w-2xl flex items-center gap-4 bg-gradient-to-r from-white/[0.08] to-white/[0.05] border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse animation-delay-200" />
              </div>
              <p className="text-gray-200 font-medium text-base leading-relaxed flex-1">{selectedImage.description}</p>
            </div>

            {/* Enhanced hint */}
            <p className="mt-4 text-gray-600 text-sm font-medium opacity-0 animate-fade-in-up animation-delay-300">Click anywhere outside or press ESC to close</p>
          </div>
        </div>
      )}
    </main>
  )
}
