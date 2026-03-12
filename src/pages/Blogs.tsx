import React, { useState, useEffect } from 'react';
import { fetchApprovedBlogs, submitBlog } from '../services/api';

type Blog = { _id: string; name: string; author: string; type: string; content: string; imageURL: string; createdAt: string }

const typeColors: Record<string, string> = {
  internship: 'bg-blue-500/15 text-blue-400',
  placement: 'bg-emerald-500/15 text-emerald-400',
  courses: 'bg-purple-500/15 text-purple-400',
  others: 'bg-gray-500/15 text-gray-400',
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ name: '', author: '', type: 'internship', content: '', imageURL: '' });
  const [loading, setLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try { setBlogs(await fetchApprovedBlogs()); } catch (e) { console.error(e); } finally { setBlogsLoading(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    try {
      await submitBlog(formData);
      setMsg('Blog submitted! Awaiting admin approval.');
      setFormData({ name: '', author: '', type: 'internship', content: '', imageURL: '' });
      setTimeout(() => setIsModalOpen(false), 3000);
    } catch { setMsg('Failed to submit. Try again.'); }
    finally { setLoading(false); }
  };

  const inputCls = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all';

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-700 opacity-10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Student Stories</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">EES <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Blogs</span></h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">Read about internships, placements, courses, and more written by our students.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
          >
            Write a Blog
          </button>
        </div>
      </section>

      {/* ── SUBMIT MODAL ─────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0a0a0f] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/8">
              <h2 className="text-lg font-bold text-white">Submit Your Blog</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white text-2xl font-bold">&times;</button>
            </div>
            <div className="p-6">
              {msg && <div className={`p-3 mb-5 rounded-xl text-sm ${msg.includes('submitted') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>{msg}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Blog Title</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="An amazing experience at…" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Author Name</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className={inputCls + ' bg-[#0a0a0f]'}>
                      <option value="internship">Internship</option>
                      <option value="placement">Placement</option>
                      <option value="courses">Courses</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Image URL</label>
                  <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} required className={inputCls} placeholder="https://…" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Content</label>
                  <textarea name="content" value={formData.content} onChange={handleChange} required rows={6} className={inputCls + ' resize-none'} placeholder="Share your experience…" />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60">
                  {loading ? 'Submitting…' : 'Submit for Approval'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW BLOG MODAL ──────────────────────────────────────────────── */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4" onClick={() => setSelectedBlog(null)}>
          <div className="bg-[#060913] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/8 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${typeColors[selectedBlog.type] || typeColors.others}`}>{selectedBlog.type}</span>
                <span className="text-gray-600 text-xs">{new Date(selectedBlog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
              <button onClick={() => setSelectedBlog(null)} className="text-gray-500 hover:text-white text-2xl font-bold leading-none transition-colors">&times;</button>
            </div>
            {/* Scrollable body */}
            <div className="overflow-y-auto">
              <img
                src={selectedBlog.imageURL}
                alt={selectedBlog.name}
                className="w-full h-56 object-cover"
                onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/0a0a1a/3b82f6?text=EES+Blog' }}
              />
              <div className="p-6">
                <h2 className="text-2xl font-extrabold text-white mb-2 leading-tight">{selectedBlog.name}</h2>
                <p className="text-sm text-gray-500 mb-6">
                  By <span className="font-semibold text-blue-400">{selectedBlog.author}</span>
                </p>
                <hr className="border-white/8 mb-6" />
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{selectedBlog.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BLOG GRID ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {blogsLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No approved blogs yet. Be the first to write one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {blogs.map(blog => (
              <div key={blog._id} className="group bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <img
                  src={blog.imageURL}
                  alt={blog.name}
                  className="w-full h-48 object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/0a0a1a/3b82f6?text=EES+Blog' }}
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${typeColors[blog.type] || typeColors.others}`}>{blog.type}</span>
                    <span className="text-gray-600 text-xs">{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">{blog.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{blog.content}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-400">By {blog.author}</p>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/btn cursor-pointer"
                    >
                      Read More
                      <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
