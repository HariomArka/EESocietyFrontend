import React, { useState, useEffect } from 'react';
import {
  adminLogin, fetchAllBlogs, fetchAdminProjects,
  approveBlog, updateBlog, deleteBlog, updateProject, deleteProject,
  fetchContactMessages, replyContactMessage, deleteContactMessage,
} from '../services/api';

type Blog = { _id: string; name: string; author: string; type: string; content: string; imageURL: string; isapproved: boolean; createdAt: string };
type Project = { _id: string; name: string; professor: string; description: string; expectation: string; duration: string; numberOfStudents: number; createdAt: string };
type ContactMsg = { _id: string; name: string; email: string; phone: string; subject: string; message: string; isReplied: boolean; repliedAt: string | null; createdAt: string };

// ── Shared input style ──────────────────────────────────────────────────────
const inp = 'w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all';

// ── Dark Modal Wrapper ──────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#060913] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/8">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl font-bold leading-none transition-colors">&times;</button>
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ approved }: { approved: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${approved ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${approved ? 'bg-emerald-400' : 'bg-amber-400'}`} />
      {approved ? 'Approved' : 'Pending'}
    </span>
  );
}

// ── Reply/Pending Badge for messages ────────────────────────────────────────
function MsgBadge({ replied }: { replied: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${replied ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${replied ? 'bg-emerald-400' : 'bg-blue-400'}`} />
      {replied ? 'Replied' : 'Pending'}
    </span>
  );
}

// ── Action Button ───────────────────────────────────────────────────────────
function ActionBtn({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  const cls: Record<string, string> = {
    blue: 'text-blue-400 border-blue-500/30 hover:bg-blue-500/15',
    green: 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/15',
    red: 'text-red-400 border-red-500/30 hover:bg-red-500/15',
    purple: 'text-purple-400 border-purple-500/30 hover:bg-purple-500/15',
  };
  return (
    <button onClick={onClick} className={`px-3 py-1 text-xs font-semibold border rounded-lg transition-colors ${cls[color]}`}>
      {label}
    </button>
  );
}

// ── Label ───────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{children}</label>;
}

const SUBJECT_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  event: 'Event Request',
  collaboration: 'Collaboration',
  feedback: 'Feedback',
  other: 'Other',
};

// ════════════════════════════════════════════════════════════════════════════
export default function Admin() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'blogs' | 'projects' | 'messages'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [viewBlog, setViewBlog] = useState<Blog | null>(null);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [viewMsg, setViewMsg] = useState<ContactMsg | null>(null);
  const [replyMsg, setReplyMsg] = useState<ContactMsg | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replySending, setReplySending] = useState(false);
  const [replyError, setReplyError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'blog' | 'project' | 'message'; id: string; name: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (token) { loadBlogs(); loadProjects(); loadMessages(); } }, [token]);

  const loadBlogs = async () => { try { setBlogs(await fetchAllBlogs(token!)); } catch { handleLogout(); } };
  const loadProjects = async () => { try { setProjects(await fetchAdminProjects(token!)); } catch (e) { console.error(e); } };
  const loadMessages = async () => { try { setMessages(await fetchContactMessages(token!)); } catch (e) { console.error(e); } };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginLoading(true); setLoginError('');
    try {
      const res = await adminLogin({ username, password });
      setToken(res.token); localStorage.setItem('adminToken', res.token);
    } catch { setLoginError('Invalid username or password.'); }
    finally { setLoginLoading(false); }
  };

  const handleLogout = () => { setToken(null); localStorage.removeItem('adminToken'); setBlogs([]); setProjects([]); setMessages([]); };
  const handleApprove = async (id: string) => { await approveBlog(id, token!); loadBlogs(); };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return; setSaving(true);
    try {
      if (deleteConfirm.type === 'blog') { await deleteBlog(deleteConfirm.id, token!); loadBlogs(); }
      else if (deleteConfirm.type === 'project') { await deleteProject(deleteConfirm.id, token!); loadProjects(); }
      else { await deleteContactMessage(deleteConfirm.id, token!); loadMessages(); }
      setDeleteConfirm(null);
    } finally { setSaving(false); }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editBlog) return; setSaving(true);
    try {
      await updateBlog(editBlog._id, token!, { name: editBlog.name, author: editBlog.author, type: editBlog.type, content: editBlog.content, imageURL: editBlog.imageURL, isapproved: editBlog.isapproved });
      setEditBlog(null); loadBlogs();
    } finally { setSaving(false); }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault(); if (!editProject) return; setSaving(true);
    try {
      await updateProject(editProject._id, token!, { name: editProject.name, professor: editProject.professor, description: editProject.description, expectation: editProject.expectation, duration: editProject.duration, numberOfStudents: editProject.numberOfStudents });
      setEditProject(null); loadProjects();
    } finally { setSaving(false); }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault(); if (!replyMsg) return;
    setReplySending(true); setReplyError('');
    try {
      await replyContactMessage(replyMsg._id, token!, replyText);
      setReplyMsg(null); setReplyText('');
      loadMessages();
    } catch (err: unknown) {
      setReplyError(err instanceof Error ? err.message : 'Failed to send reply. Please try again.');
    } finally { setReplySending(false); }
  };

  // ═══════════════ LOGIN SCREEN ═══════════════════════════════════════════
  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-700 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-5 shadow-lg shadow-blue-600/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Admin Portal</h1>
            <p className="text-blue-400 mt-1 text-sm font-medium">EES Blog & Project Management</p>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label>Username</Label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className={inp} placeholder="Enter username" autoFocus />
              </div>
              <div>
                <Label>Password</Label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className={inp} placeholder="Enter password" />
              </div>
              <button type="submit" disabled={loginLoading} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 mt-2">
                {loginLoading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════ DASHBOARD ═══════════════════════════════════════════════
  const unreadMsgs = messages.filter(m => !m.isReplied).length;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Top Bar */}
      <div className="bg-black/80 border-b border-white/8 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/30">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="font-bold text-white text-base">EES Admin</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Blogs', value: blogs.length, color: 'text-blue-400' },
            { label: 'Pending Approval', value: blogs.filter(b => !b.isapproved).length, color: 'text-amber-400' },
            { label: 'Approved Blogs', value: blogs.filter(b => b.isapproved).length, color: 'text-emerald-400' },
            { label: 'Research Projects', value: projects.length, color: 'text-purple-400' },
            { label: 'Unread Messages', value: unreadMsgs, color: 'text-cyan-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider">{stat.label}</p>
              <p className={`text-4xl font-extrabold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 border border-white/8 p-1 rounded-xl w-fit mb-6">
          {(['blogs', 'projects', 'messages'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all relative ${activeTab === tab ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-gray-500 hover:text-gray-300'}`}>
              {tab === 'blogs' ? `Blogs (${blogs.length})` : tab === 'projects' ? `Projects (${projects.length})` : (
                <span className="flex items-center gap-2">
                  Messages ({messages.length})
                  {unreadMsgs > 0 && (
                    <span className="bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {unreadMsgs}
                    </span>
                  )}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── BLOGS TABLE ─────────────────────────────────────────────────── */}
        {activeTab === 'blogs' && (
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex justify-between items-center">
              <h2 className="font-bold text-white">All Blog Submissions</h2>
              <span className="text-xs text-amber-400 font-semibold">{blogs.filter(b => !b.isapproved).length} pending review</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600 uppercase tracking-wider border-b border-white/5">
                    <th className="px-6 py-3 font-semibold">Blog</th>
                    <th className="px-6 py-3 font-semibold">Author</th>
                    <th className="px-6 py-3 font-semibold">Type</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blogs.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-600">No blogs found.</td></tr>}
                  {blogs.map(blog => (
                    <tr key={blog._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={blog.imageURL} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-white/5"
                            onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/0a0a1a/3b82f6?text=?'; }} />
                          <span className="font-medium text-gray-200 line-clamp-1 max-w-xs">{blog.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{blog.author}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-500/15 text-blue-400 text-xs px-2.5 py-1 rounded-full capitalize font-medium">{blog.type}</span>
                      </td>
                      <td className="px-6 py-4"><StatusBadge approved={blog.isapproved} /></td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 flex-wrap">
                          <ActionBtn label="View" color="blue" onClick={() => setViewBlog(blog)} />
                          {!blog.isapproved && <ActionBtn label="Approve" color="green" onClick={() => handleApprove(blog._id)} />}
                          <ActionBtn label="Edit" color="blue" onClick={() => setEditBlog({ ...blog })} />
                          <ActionBtn label="Delete" color="red" onClick={() => setDeleteConfirm({ type: 'blog', id: blog._id, name: blog.name })} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PROJECTS TABLE ───────────────────────────────────────────────── */}
        {activeTab === 'projects' && (
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8">
              <h2 className="font-bold text-white">All Research Projects</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600 uppercase tracking-wider border-b border-white/5">
                    <th className="px-6 py-3 font-semibold">Project</th>
                    <th className="px-6 py-3 font-semibold">Professor</th>
                    <th className="px-6 py-3 font-semibold">Duration</th>
                    <th className="px-6 py-3 font-semibold">Students</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-600">No projects found.</td></tr>}
                  {projects.map(proj => (
                    <tr key={proj._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-200 max-w-xs line-clamp-1">{proj.name}</p>
                        <p className="text-xs text-gray-600 mt-0.5 max-w-xs line-clamp-1">{proj.description}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-400">Prof. {proj.professor}</td>
                      <td className="px-6 py-4">
                        <span className="bg-purple-500/15 text-purple-400 text-xs px-2.5 py-1 rounded-full font-medium">{proj.duration}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 font-medium">{proj.numberOfStudents}</td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{new Date(proj.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <ActionBtn label="Edit" color="blue" onClick={() => setEditProject({ ...proj })} />
                          <ActionBtn label="Delete" color="red" onClick={() => setDeleteConfirm({ type: 'project', id: proj._id, name: proj.name })} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── MESSAGES TABLE ───────────────────────────────────────────────── */}
        {activeTab === 'messages' && (
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/8 flex justify-between items-center">
              <h2 className="font-bold text-white">Contact Messages</h2>
              {unreadMsgs > 0 && (
                <span className="text-xs text-cyan-400 font-semibold">{unreadMsgs} awaiting reply</span>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600 uppercase tracking-wider border-b border-white/5">
                    <th className="px-6 py-3 font-semibold">Sender</th>
                    <th className="px-6 py-3 font-semibold">Email</th>
                    <th className="px-6 py-3 font-semibold">Subject</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {messages.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-600">No messages yet.</td></tr>}
                  {messages.map(msg => (
                    <tr key={msg._id} className={`hover:bg-white/[0.02] transition-colors ${!msg.isReplied ? 'border-l-2 border-l-cyan-500/50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-200">{msg.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{msg.email}</td>
                      <td className="px-6 py-4">
                        <span className="bg-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
                          {SUBJECT_LABELS[msg.subject] || msg.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4"><MsgBadge replied={msg.isReplied} /></td>
                      <td className="px-6 py-4 text-gray-600 text-xs">{new Date(msg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <ActionBtn label="View" color="blue" onClick={() => setViewMsg(msg)} />
                          <ActionBtn label="Reply" color="purple" onClick={() => { setReplyMsg(msg); setReplyText(''); setReplyError(''); }} />
                          <ActionBtn label="Delete" color="red" onClick={() => setDeleteConfirm({ type: 'message', id: msg._id, name: msg.name })} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ═══ VIEW BLOG MODAL ════════════════════════════════════════════════ */}
      {viewBlog && (
        <Modal title="Blog Preview" onClose={() => setViewBlog(null)}>
          <img src={viewBlog.imageURL} alt={viewBlog.name} className="w-full h-48 object-cover rounded-xl mb-5"
            onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x200/0a0a1a/3b82f6?text=No+Image'; }} />
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-500/15 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full capitalize">{viewBlog.type}</span>
            <StatusBadge approved={viewBlog.isapproved} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{viewBlog.name}</h2>
          <p className="text-sm text-gray-500 mb-4">By <span className="font-semibold text-gray-300">{viewBlog.author}</span> · {new Date(viewBlog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          <hr className="border-white/8 mb-4" />
          <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{viewBlog.content}</p>
          <div className="mt-6 flex gap-3">
            {!viewBlog.isapproved && (
              <button onClick={() => { handleApprove(viewBlog._id); setViewBlog(null); }} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-colors hover:-translate-y-0.5">
                Approve Blog
              </button>
            )}
            <button onClick={() => { setEditBlog({ ...viewBlog }); setViewBlog(null); }} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors hover:-translate-y-0.5">
              Edit Blog
            </button>
          </div>
        </Modal>
      )}

      {/* ═══ EDIT BLOG MODAL ════════════════════════════════════════════════ */}
      {editBlog && (
        <Modal title="Edit Blog" onClose={() => setEditBlog(null)}>
          <form onSubmit={handleSaveBlog} className="space-y-4">
            <div><Label>Title</Label><input type="text" value={editBlog.name} onChange={e => setEditBlog({ ...editBlog, name: e.target.value })} required className={inp} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Author</Label><input type="text" value={editBlog.author} onChange={e => setEditBlog({ ...editBlog, author: e.target.value })} required className={inp} /></div>
              <div>
                <Label>Type</Label>
                <select value={editBlog.type} onChange={e => setEditBlog({ ...editBlog, type: e.target.value })} className={inp + ' bg-[#060913]'}>
                  <option value="internship" className="bg-black">Internship</option>
                  <option value="placement" className="bg-black">Placement</option>
                  <option value="courses" className="bg-black">Courses</option>
                  <option value="others" className="bg-black">Others</option>
                </select>
              </div>
            </div>
            <div><Label>Image URL</Label><input type="url" value={editBlog.imageURL} onChange={e => setEditBlog({ ...editBlog, imageURL: e.target.value })} required className={inp} /></div>
            <div><Label>Content</Label><textarea rows={6} value={editBlog.content} onChange={e => setEditBlog({ ...editBlog, content: e.target.value })} required className={inp + ' resize-none'} /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isApproved" checked={editBlog.isapproved} onChange={e => setEditBlog({ ...editBlog, isapproved: e.target.checked })} className="w-4 h-4 accent-emerald-500" />
              <label htmlFor="isApproved" className="text-sm text-gray-400 font-medium">Approved (visible to public)</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60">{saving ? 'Saving…' : 'Save Changes'}</button>
              <button type="button" onClick={() => setEditBlog(null)} className="px-5 py-2.5 border border-white/10 text-gray-400 font-semibold rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ═══ EDIT PROJECT MODAL ═════════════════════════════════════════════ */}
      {editProject && (
        <Modal title="Edit Research Project" onClose={() => setEditProject(null)}>
          <form onSubmit={handleSaveProject} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Project Name</Label><input type="text" value={editProject.name} onChange={e => setEditProject({ ...editProject, name: e.target.value })} required className={inp} /></div>
              <div><Label>Professor</Label><input type="text" value={editProject.professor} onChange={e => setEditProject({ ...editProject, professor: e.target.value })} required className={inp} /></div>
            </div>
            <div><Label>Description</Label><textarea rows={3} value={editProject.description} onChange={e => setEditProject({ ...editProject, description: e.target.value })} required className={inp + ' resize-none'} /></div>
            <div><Label>Expectation</Label><textarea rows={3} value={editProject.expectation} onChange={e => setEditProject({ ...editProject, expectation: e.target.value })} required className={inp + ' resize-none'} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Duration</Label>
                <select value={editProject.duration} onChange={e => setEditProject({ ...editProject, duration: e.target.value })} className={inp + ' bg-[#060913]'}>
                  <option value="2 semesters" className="bg-black">2 Semesters</option>
                  <option value="4 semesters" className="bg-black">4 Semesters</option>
                  <option value="others" className="bg-black">Others</option>
                </select>
              </div>
              <div><Label>Number of Students</Label><input type="number" min={1} value={editProject.numberOfStudents} onChange={e => setEditProject({ ...editProject, numberOfStudents: Number(e.target.value) })} required className={inp} /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60">{saving ? 'Saving…' : 'Save Changes'}</button>
              <button type="button" onClick={() => setEditProject(null)} className="px-5 py-2.5 border border-white/10 text-gray-400 font-semibold rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ═══ VIEW MESSAGE MODAL ══════════════════════════════════════════════ */}
      {viewMsg && (
        <Modal title="Contact Message" onClose={() => setViewMsg(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {viewMsg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-white">{viewMsg.name}</p>
                <a href={`mailto:${viewMsg.email}`} className="text-blue-400 text-sm hover:underline">{viewMsg.email}</a>
                {viewMsg.phone && <p className="text-gray-500 text-xs mt-0.5">{viewMsg.phone}</p>}
              </div>
              <div className="ml-auto"><MsgBadge replied={viewMsg.isReplied} /></div>
            </div>
            <div className="bg-white/5 border border-white/8 rounded-xl p-4">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Subject</p>
              <p className="text-gray-200 font-medium">{SUBJECT_LABELS[viewMsg.subject] || viewMsg.subject}</p>
            </div>
            <div className="bg-white/5 border border-white/8 rounded-xl p-4">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Message</p>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{viewMsg.message}</p>
            </div>
            <p className="text-xs text-gray-600">Received: {new Date(viewMsg.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            {viewMsg.isReplied && viewMsg.repliedAt && (
              <p className="text-xs text-emerald-500">Replied: {new Date(viewMsg.repliedAt).toLocaleString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            )}
            <div className="flex gap-3 pt-2">
              <button onClick={() => { setReplyMsg(viewMsg); setViewMsg(null); setReplyText(''); setReplyError(''); }}
                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5">
                Reply to {viewMsg.name.split(' ')[0]}
              </button>
              <button onClick={() => setViewMsg(null)} className="px-5 py-2.5 border border-white/10 text-gray-400 font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ═══ REPLY MESSAGE MODAL ══════════════════════════════════════════════ */}
      {replyMsg && (
        <Modal title={`Reply to ${replyMsg.name}`} onClose={() => setReplyMsg(null)}>
          <div className="mb-5 bg-white/5 border border-white/8 rounded-xl p-4">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Replying to</p>
            <p className="text-gray-200 font-medium">{replyMsg.name}</p>
            <a href={`mailto:${replyMsg.email}`} className="text-blue-400 text-sm hover:underline">{replyMsg.email}</a>
            <p className="text-xs text-gray-600 mt-2 line-clamp-2">"{replyMsg.message}"</p>
          </div>
          <form onSubmit={handleReply} className="space-y-4">
            <div>
              <Label>Your Reply</Label>
              <textarea
                rows={7}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                required
                className={inp + ' resize-none'}
                placeholder={`Dear ${replyMsg.name.split(' ')[0]},\n\nThank you for reaching out...`}
              />
            </div>
            {replyError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                {replyError}
              </div>
            )}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={replySending}
                className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
                {replySending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    Send Reply
                  </>
                )}
              </button>
              <button type="button" onClick={() => setReplyMsg(null)} className="px-5 py-2.5 border border-white/10 text-gray-400 font-semibold rounded-xl hover:bg-white/5 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ═══ DELETE CONFIRM MODAL ═══════════════════════════════════════════ */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#060913] border border-white/10 w-full max-w-sm rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-red-500/15 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Confirm Deletion</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete <span className="font-semibold text-gray-300">"{deleteConfirm.name}"</span>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-white/10 text-gray-400 font-semibold py-2.5 rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={handleDeleteConfirm} disabled={saving} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-60">
                {saving ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
