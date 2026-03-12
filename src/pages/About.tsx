import { Link } from 'react-router-dom'

const features = [
  { icon: '🎓', title: 'Academic Excellence', desc: 'Fostering intellectual growth through seminars, workshops, and technical sessions.' },
  { icon: '🤝', title: 'Community Building', desc: 'Creating a strong network of students and faculty dedicated to innovation.' },
  { icon: '🔬', title: 'Research Collaboration', desc: 'Promoting collaborative research initiatives and technical projects.' },
  { icon: '🌟', title: 'Career Development', desc: 'Connecting students with industry professionals and opportunities.' },
]

const activities = [
  { emoji: '🎯', title: 'Workshops & Seminars', desc: 'Regular technical workshops and guest lectures from industry experts and renowned academics to enhance technical knowledge.' },
  { emoji: '🏭', title: 'Industrial Visits', desc: 'Immersive field trips to leading companies and research facilities to provide practical exposure and career insights.' },
  { emoji: '👥', title: 'Community Events', desc: 'Memorable gatherings including freshers\' welcomes, departmental celebrations, and networking events.' },
  { emoji: '💡', title: 'Research & Projects', desc: 'Facilitating collaborative research projects and innovation challenges to nurture creative problem-solving skills.' },
]

const values = [
  { title: 'Innovation', desc: 'Pioneering new ideas and solutions in electrical engineering' },
  { title: 'Excellence', desc: 'Pursuing the highest standards in all our endeavors' },
  { title: 'Collaboration', desc: 'Working together to achieve collective success' },
  { title: 'Inclusivity', desc: 'Welcoming diverse perspectives and backgrounds' },
]

export default function About() {
  return (
    <main className="bg-black text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 opacity-10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Who We Are</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">EES</span></h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">The Electrical Engineering Society at IIEST Shibpur — a community built on passion, innovation, and excellence.</p>
        </div>
      </section>

      {/* ── MISSION + VISION ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
          <h2 className="text-4xl font-extrabold mb-5">Why We Exist</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            The Electrical Engineering Society serves as a vital conduit between faculty and students within the esteemed Department of Electrical Engineering. As the custodian of various welfare initiatives, we are dedicated to enhancing the academic journey of our student community.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Through our dynamic platform, we illuminate the spectrum of opportunities and celebrate remarkable milestones achieved by both students and faculty.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
            <p className="text-blue-100 leading-relaxed">
              To be a beacon of innovation and excellence, fostering a vibrant community of electrical engineers who are equipped with the knowledge, skills, and vision to drive technological progress and societal advancement.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.02] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-4xl font-extrabold">Our Focus Areas</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Our society is a vibrant tapestry of diverse individuals, seamlessly collaborating to orchestrate impactful events and initiatives.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="group bg-black border border-white/8 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-blue-950/20 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Programs</p>
          <h2 className="text-4xl font-extrabold">Our Activities</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map(a => (
            <div key={a.title} className="flex gap-5 bg-white/[0.03] border border-white/8 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
              <div className="text-3xl flex-shrink-0">{a.emoji}</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.02] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Principles</p>
            <h2 className="text-4xl font-extrabold">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="bg-black border border-white/8 rounded-2xl p-6 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm mb-4">0{i + 1}</div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 p-12 text-center">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">Join Us Today</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Become part of a vibrant community dedicated to excellence, innovation, and the advancement of electrical engineering.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-0.5">
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
