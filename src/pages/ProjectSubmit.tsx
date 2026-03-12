import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitProject } from '../services/api';

const inputCls = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 text-sm transition-all';
const labelCls = 'block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5';

export default function ProjectSubmit() {
  const [formData, setFormData] = useState({
    name: '',
    professor: '',
    description: '',
    expectation: '',
    duration: '2 semesters',
    numberOfStudents: 1,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    try {
      await submitProject({ ...formData, numberOfStudents: Number(formData.numberOfStudents) });
      setMsg({ text: 'Project published successfully! Students can now discover it on the Projects page.', ok: true });
      setFormData({ name: '', professor: '', description: '', expectation: '', duration: '2 semesters', numberOfStudents: 1 });
    } catch {
      setMsg({ text: 'Failed to publish. Please check your connection and try again.', ok: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-700 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">For Faculty & Professors</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            Post a Research <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Project</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Share your research opportunity with talented students in the EE department.
          </p>
        </div>
      </section>

      {/* ── FORM CARD ────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">

        {/* Info banner */}
        <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-8">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-blue-300 text-sm">
            Submitted projects appear <strong>immediately</strong> on the public Projects page. Students can search and filter them by keyword.
          </p>
        </div>

        {/* Success / Error message */}
        {msg && (
          <div className={`flex items-start gap-3 p-4 mb-6 rounded-2xl text-sm border ${msg.ok ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {msg.ok
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
            </svg>
            {msg.text}
          </div>
        )}

        {/* Form */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Project Title</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="e.g. AI in Power Grids" />
              </div>
              <div>
                <label className={labelCls}>Your Name</label>
                <input type="text" name="professor" value={formData.professor} onChange={handleChange} required className={inputCls} placeholder="Prof. Full Name" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelCls}>Project Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className={inputCls + ' resize-none'} placeholder="Outline the main objectives, scope, and research questions of the project…" />
            </div>

            {/* Expectations */}
            <div>
              <label className={labelCls}>Student Expectations</label>
              <textarea name="expectation" value={formData.expectation} onChange={handleChange} required rows={3} className={inputCls + ' resize-none'} placeholder="Required skills, prior coursework, time commitment per week…" />
            </div>

            {/* Row 2 */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Duration</label>
                <select name="duration" value={formData.duration} onChange={handleChange} className={inputCls + ' bg-black'}>
                  <option value="2 semesters" className="bg-black">2 Semesters</option>
                  <option value="4 semesters" className="bg-black">4 Semesters</option>
                  <option value="others" className="bg-black">Others</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Number of Students</label>
                <input type="number" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} min={1} max={20} required className={inputCls} />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row gap-3">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Publishing…</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> Publish Research Project</>
                )}
              </button>
              <Link to="/projects" className="px-6 py-3.5 border border-white/10 text-gray-400 hover:text-white font-semibold rounded-xl transition-all hover:bg-white/5 text-center text-sm">
                View Projects →
              </Link>
            </div>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-700 text-xs mt-6">
          Projects appear publicly on the <Link to="/projects" className="text-blue-500 hover:underline">Projects page</Link> immediately. Contact the Admin to remove or edit a project.
        </p>
      </section>
    </main>
  );
}
