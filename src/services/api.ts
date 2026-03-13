const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ========================
// BLOGS API
// ========================
export const fetchApprovedBlogs = async () => {
  const res = await fetch(`${API_URL}/blogs`);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

export const submitBlog = async (blogData: Record<string, unknown>) => {
  const res = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });
  if (!res.ok) throw new Error('Failed to submit blog');
  return res.json();
};

// ========================
// ADMIN API
// ========================
export const adminLogin = async (credentials: Record<string, string>) => {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  return res.json();
};

export const fetchAllBlogs = async (token: string) => {
  const res = await fetch(`${API_URL}/admin/blogs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch all blogs');
  return res.json();
};

export const approveBlog = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/admin/blogs/${id}/approve`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to approve blog');
  return res.json();
};

export const updateBlog = async (id: string, token: string, data: Record<string, unknown>) => {
  const res = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update blog');
  return res.json();
};

export const deleteBlog = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete blog');
  return res.json();
};

// ========================
// PROJECTS API
// ========================
export const fetchProjects = async () => {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const submitProject = async (projectData: Record<string, unknown>) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) throw new Error('Failed to submit project');
  return res.json();
};

export const fetchAdminProjects = async (token: string) => {
  const res = await fetch(`${API_URL}/admin/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const updateProject = async (id: string, token: string, data: Record<string, unknown>) => {
  const res = await fetch(`${API_URL}/admin/projects/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
};

export const deleteProject = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
};

// ========================
// CONTACT MESSAGES API
// ========================
export const submitContactMessage = async (data: Record<string, string>) => {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to send message');
  }
  return res.json();
};

export const fetchContactMessages = async (token: string) => {
  const res = await fetch(`${API_URL}/contact`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
};

export const replyContactMessage = async (id: string, token: string, replyText: string) => {
  const res = await fetch(`${API_URL}/contact/${id}/reply`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ replyText }),
  });
  if (!res.ok) throw new Error('Failed to send reply');
  return res.json();
};

export const deleteContactMessage = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/contact/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete message');
  return res.json();
};
