import React, { useState } from 'react';
import { submitProject } from '../services/api';

export default function ProjectSubmit() {
  const [formData, setFormData] = useState({
    name: '',
    professor: '',
    description: '',
    expectation: '',
    duration: '2 semesters',
    numberOfStudents: 1
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await submitProject(formData);
      setMsg('Project submitted successfully and is now visible to students!');
      setFormData({
        name: '',
        professor: '',
        description: '',
        expectation: '',
        duration: '2 semesters',
        numberOfStudents: 1
      });
    } catch (error) {
      console.error(error);
      setMsg('Failed to submit project. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-900 px-8 py-6 text-white text-center">
             <h1 className="text-3xl font-bold">Submit a Research Project</h1>
             <p className="mt-2 opacity-90">For Faculty & Professors</p>
          </div>
          
          <div className="p-8">
            {msg && (
              <div className={`p-4 mb-6 rounded-lg ${msg.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {msg}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Professor Name</label>
                  <input type="text" name="professor" value={formData.professor} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Outline the main objectives and scope of the research..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student Expectations</label>
                <textarea name="expectation" value={formData.expectation} onChange={handleChange} required rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Required skills, time commitment..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <select name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white">
                    <option value="2 semesters">2 Semesters</option>
                    <option value="4 semesters">4 Semesters</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Students</label>
                  <input type="number" name="numberOfStudents" value={formData.numberOfStudents} onChange={handleChange} min={1} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  {loading ? 'Publishing Project...' : 'Publish Research Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
