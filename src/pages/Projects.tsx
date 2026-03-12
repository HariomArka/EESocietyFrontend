import { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';

type Project = {
  _id: string; name: string; professor: string; description: string;
  expectation: string; duration: string; numberOfStudents: number; createdAt: string
}

const durationColor: Record<string, string> = {
  '2 semesters': 'bg-blue-500/15 text-blue-400',
  '4 semesters': 'bg-purple-500/15 text-purple-400',
  'others': 'bg-gray-500/15 text-gray-400',
}

// ── Detail Slide-over Panel ──────────────────────────────────────────────────
function ProjectPanel({ proj, onClose }: { proj: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      {/* Dim backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" />

      {/* Slide-in panel */}
      <div
        className="w-full max-w-lg bg-[#060913] border-l border-white/10 h-full overflow-y-auto flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 sticky top-0 bg-[#060913] z-10">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${durationColor[proj.duration] || durationColor.others}`}>
            {proj.duration}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 space-y-6">
          {/* Title + Professor */}
          <div>
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-3">{proj.name}</h2>
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Prof. {proj.professor}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.04] border border-white/8 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">Duration</p>
              <p className="text-white font-bold">{proj.duration}</p>
            </div>
            <div className="bg-white/[0.04] border border-white/8 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">Openings</p>
              <p className="text-blue-400 font-bold text-lg">{proj.numberOfStudents}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-blue-600 inline-block" />
              Project Description
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">{proj.description}</p>
          </div>

          {/* Expectations */}
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
              <span className="w-4 h-px bg-blue-600 inline-block" />
              What We Expect From You
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">{proj.expectation}</p>
          </div>

          {/* Posted date */}
          <p className="text-xs text-gray-600 pt-4 border-t border-white/5">
            Posted: {new Date(proj.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects().then(data => setProjects(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  // Filter by query — searches name, professor, description, expectation
  const filtered = projects.filter(p => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.professor.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.expectation.toLowerCase().includes(q) ||
      p.duration.toLowerCase().includes(q)
    );
  });

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 opacity-10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Faculty Research</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">
            Research <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore ongoing and upcoming research opportunities offered by our esteemed professors.
          </p>
        </div>
      </section>

      {/* ── SEARCH BAR ───────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 mb-10">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by topic, professor, keyword…"
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-sm transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {query && (
          <p className="text-xs text-gray-600 mt-2 ml-1">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<span className="text-blue-400">{query}</span>"
          </p>
        )}
      </div>

      {/* ── PROJECTS GRID ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-medium">
              {query ? `No projects match "${query}"` : 'No research projects currently available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map(proj => (
              <div key={proj._id} className="group bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300">
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${durationColor[proj.duration] || durationColor.others}`}>{proj.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{proj.name}</h3>
                <p className="text-blue-500 text-sm font-semibold mb-4 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Prof. {proj.professor}
                </p>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{proj.description}</p>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="bg-blue-600/15 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {proj.numberOfStudents} Student{proj.numberOfStudents !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex items-center gap-1.5 text-xs font-bold bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    View Details
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── DETAIL PANEL ─────────────────────────────────────────────────── */}
      {selectedProject && (
        <ProjectPanel proj={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

    </main>
  )
}
