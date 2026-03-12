import { useState, useEffect } from 'react'
import EventModal from '../components/EventModal'

interface Event {
  id: number
  name: string
  description: string
  image: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/Data/events.json')
      .then(r => r.json())
      .then(data => { setEvents(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleReadMore = (event: Event) => { setSelectedEvent(event); setIsModalOpen(true) }
  const handleClose = () => { setIsModalOpen(false); setTimeout(() => setSelectedEvent(null), 300) }

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 opacity-10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">What's On</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">Upcoming <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Events</span></h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Discover workshops, tech talks, hackathons, and community gatherings hosted by EES.</p>
        </div>
      </section>

      {/* ── EVENTS GRID ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600 py-16">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {events.map(event => (
              <div
                key={event.id}
                className="group bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-400 hover:-translate-y-2 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-50 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{event.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                    {event.description.substring(0, 110)}…
                  </p>
                  <button
                    onClick={() => handleReadMore(event)}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30"
                  >
                    Read More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <EventModal isOpen={isModalOpen} event={selectedEvent} onClose={handleClose} />
    </main>
  )
}