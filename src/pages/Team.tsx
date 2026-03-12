import { useState, useEffect } from 'react'
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa'

type Member = {
  name: string
  post: 'advisor' | 'head' | 'subhead'
  image: string
  facebook: string
  insta: string
  linkedin: string
}

// Role config
const roleConfig = {
  advisor: {
    label: 'Faculty Advisors',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    cardBorder: 'hover:border-amber-500/30',
    dot: 'bg-amber-400',
    sectionAccent: 'text-amber-400',
    divider: 'from-amber-500/30',
  },
  head: {
    label: 'Society Heads',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    cardBorder: 'hover:border-blue-500/30',
    dot: 'bg-blue-400',
    sectionAccent: 'text-blue-400',
    divider: 'from-blue-500/30',
  },
  subhead: {
    label: 'Sub-Heads',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    cardBorder: 'hover:border-purple-500/30',
    dot: 'bg-purple-400',
    sectionAccent: 'text-purple-400',
    divider: 'from-purple-500/30',
  },
}

// ── Member card ──────────────────────────────────────────────────────────────
function MemberCard({ member }: { member: Member }) {
  const cfg = roleConfig[member.post]

  return (
    <div className={`group bg-white/[0.03] border border-white/8 ${cfg.cardBorder} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col`}>
      {/* Photo */}
      <div className="relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full aspect-[4/5] object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={e => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0a0a2e&color=3b82f6&size=400`
          }}
        />
        {/* Dark gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Social icons — slide up on hover */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 px-4 pb-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {member.linkedin && (
            <a
              href={member.linkedin} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-10 h-10 bg-white/15 hover:bg-[#0077B5] backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-[#0077B5]"
              title="LinkedIn"
            >
              <FaLinkedinIn size={16} />
            </a>
          )}
          {member.insta && (
            <a
              href={member.insta} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-10 h-10 bg-white/15 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-pink-500"
              title="Instagram"
            >
              <FaInstagram size={16} />
            </a>
          )}
          {member.facebook && (
            <a
              href={member.facebook} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-10 h-10 bg-white/15 hover:bg-[#1877F2] backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-[#1877F2]"
              title="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Name + badge */}
      <div className="p-5">
        <h3 className="font-bold text-white text-base leading-tight mb-2.5">{member.name}</h3>
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${cfg.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {member.post === 'subhead' ? 'Sub-Head' : member.post.charAt(0).toUpperCase() + member.post.slice(1)}
        </span>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
export default function Team() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/Data/team.json')
      .then(r => r.json())
      .then(data => { setMembers(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const advisors = members.filter(m => m.post === 'advisor')
  const heads = members.filter(m => m.post === 'head')
  const subheads = members.filter(m => m.post === 'subhead')

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">The People Behind EES</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">
            Meet Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Dedicated minds working together to foster innovation, community, and excellence in electrical engineering.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 pb-24 space-y-20">

          {/* ── ADVISORS ─────────────────────────────────────────── */}
          {advisors.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">Faculty</p>
                  <h2 className="text-3xl font-extrabold text-white">Advisors</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {advisors.map(m => <MemberCard key={m.name} member={m} />)}
              </div>
            </section>
          )}

          {/* ── HEADS ────────────────────────────────────────────── */}
          {heads.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div>
                  <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Leadership</p>
                  <h2 className="text-3xl font-extrabold text-white">Society Heads</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {heads.map(m => <MemberCard key={m.name} member={m} />)}
              </div>
            </section>
          )}

          {/* ── SUBHEADS ─────────────────────────────────────────── */}
          {subheads.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div>
                  <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">Core Team</p>
                  <h2 className="text-3xl font-extrabold text-white">Sub-Heads</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {subheads.map(m => <MemberCard key={m.name} member={m} />)}
              </div>
            </section>
          )}

        </div>
      )}
    </main>
  )
}