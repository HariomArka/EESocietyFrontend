import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 55, startDelay = 300, loop = false, loopDelay = 1000) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let intervalId: number | null = null
    let startTimer: number | null = null

    const startTyping = () => {
      setDisplayed('')
      setDone(false)
      let i = 0
      intervalId = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          if (intervalId) clearInterval(intervalId)
          setDone(true)
          if (loop) {
            startTimer = setTimeout(startTyping, loopDelay)
          }
        }
      }, speed)
    }

    startTimer = setTimeout(startTyping, startDelay)
    return () => {
      if (intervalId) clearInterval(intervalId)
      if (startTimer) clearTimeout(startTimer)
    }
  }, [text, speed, startDelay, loop, loopDelay])

  return { displayed, done }
}

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Power Systems',
    desc: 'Cutting-edge research on grid stability, renewable integration, and smart energy distribution.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Electronics & VLSI',
    desc: 'From circuit design to chip fabrication, explore the microscopic world that powers modern technology.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: 'Embedded Systems',
    desc: 'Hands-on projects with microcontrollers, FPGAs, IoT, and real-time operating systems.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Community & Events',
    desc: 'Workshops, hackathons, guest lectures, and alumni meets that bring brilliant minds together.',
  },
]

const stats = [
  { value: '500+', label: 'Active Members' },
  { value: '40+', label: 'Research Projects' },
  { value: '15+', label: 'Annual Events' },
  { value: '95%', label: 'Placement Rate' },
]

// ── Heading that types itself out on the hero section ─────────────────────
function HeroHeading() {
  // the piece of text now types repeatedly in a loop
  const { displayed, done } = useTypewriter(
    'Engineering the Future of Electricity',
    60,
    200,
    true, // enable looping
    1200 // wait 1.2s before restarting
  )

  return (
    <h1 className="text-5xl sm:text-6xl font-extrabold mb-5 flex items-center justify-center">
      {displayed}
      {/* simple cursor indicator */}
      <span
        className={
          'inline-block w-0.5 h-10 bg-white ml-1 transition-opacity duration-200 ' +
          (done ? 'opacity-0' : 'opacity-100 animate-pulse')
        }
      />
    </h1>
  )
}

export default function Home() {
  return (
    <main className="bg-black text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-0 w-72 h-72 bg-blue-800 opacity-10 rounded-full blur-3xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-950/60 border border-blue-700/40 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
            Electrical Engineering Society — IIT Kharagpur
          </div>

          <HeroHeading />

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A community of students and faculty driving research, innovation, and real-world impact in power systems, electronics, and embedded technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              Explore Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm"
            >
              Read Our Blogs
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / WELCOME ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
          <h2 className="text-4xl font-extrabold leading-tight mb-6">
            Where Curiosity Meets<br />
            <span className="text-blue-400">High Voltage</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-5">
            The Electrical Engineering Society at IIT Kharagpur has been a cornerstone of technical excellence for decades. We bring together the brightest minds to tackle real-world problems in energy, signal processing, and intelligent systems.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Whether you're a first year student beginning your journey or a seasoned researcher, EES is your platform to grow, connect, and create.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Learn more about us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Decorative card panel */}
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 space-y-4">
            {['Power Systems Lab', 'Electronics Workshop', 'VLSI Design Studio', 'IoT & Robotics Club', 'Annual IEEE Hackathon'].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-400 text-xs font-bold">0{i + 1}</span>
                </div>
                <span className="text-gray-300 text-sm font-medium">{item}</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────────── */}
      <section className="bg-white/[0.02] border-t border-white/5 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-4xl font-extrabold">Our Areas of Focus</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">From high-voltage labs to cutting-edge microchips, EES spans the full spectrum of electrical engineering.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="group bg-black border border-white/8 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-blue-950/20 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-600/25 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-3">Explore EES</h2>
          <p className="text-gray-500">Jump into what interests you most.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { to: '/events', label: 'Events', desc: 'Workshops, tech talks, and annual fests.', emoji: '🗓️' },
            { to: '/blogs', label: 'Blogs', desc: 'Student experiences: internships, courses, placements.', emoji: '✍️' },
            { to: '/projects', label: 'Research Projects', desc: 'Work with professors on groundbreaking research.', emoji: '🔬' },
            { to: '/gallery', label: 'Gallery', desc: 'Memories from our events and achievements.', emoji: '🖼️' },
            { to: '/about', label: 'About Us', desc: 'Our story, mission, and team.', emoji: '👥' },
            { to: '/contact', label: 'Contact', desc: 'Get in touch with the EES team.', emoji: '📬' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="group flex items-start gap-4 bg-white/[0.03] hover:bg-blue-600/10 border border-white/8 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
            >
              {/* <span className="text-3xl">{link.emoji}</span> */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{link.label}</h3>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors translate-x-0 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 p-12 text-center">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to be part of something big?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Join EES today and get access to exclusive events, research opportunities, and a network of driven engineers.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
