import React, { useState } from 'react'
import { submitContactMessage } from '../services/api'

const contactInfo = [
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: 'Email',
    content: 'ees@iitkgp.ac.in',
    link: 'mailto:ees@iitkgp.ac.in',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    title: 'Phone',
    content: '+91 (0) 3222 282382',
    link: 'tel:+91-3222-282382',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'Location',
    content: 'EE Dept., IIT Kharagpur',
    link: null,
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Office Hours',
    content: 'Mon–Fri: 2:00 PM – 6:00 PM',
    link: null,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError('')
    try {
      await submitContactMessage(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 6000)
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all'

  return (
    <main className="bg-black text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-28 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-700 opacity-10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <p className="text-blue-500 text-sm font-semibold uppercase tracking-widest mb-3">Reach Out</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-5">Contact <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Us</span></h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">We'd love to hear from you. Get in touch with us today!</p>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactInfo.map(info => (
            <div key={info.title} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 text-center hover:border-blue-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-3">{info.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{info.title}</h3>
              {info.link
                ? <a href={info.link} className="text-gray-500 text-xs hover:text-blue-400 transition-colors">{info.content}</a>
                : <p className="text-gray-500 text-xs">{info.content}</p>
              }
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM + MAP ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-3xl font-extrabold mb-8">Send Us a <span className="text-blue-400">Message</span></h2>

          {/* Success banner */}
          {submitted && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Message sent! We'll get back to you soon.
            </div>
          )}

          {/* Error banner */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="Your name" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone (optional)</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} required className={inputCls + ' bg-black'}>
                <option value="" className="bg-black">Select a subject</option>
                <option value="general" className="bg-black">General Inquiry</option>
                <option value="event" className="bg-black">Event Request</option>
                <option value="collaboration" className="bg-black">Collaboration</option>
                <option value="feedback" className="bg-black">Feedback</option>
                <option value="other" className="bg-black">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={inputCls + ' resize-none'} placeholder="Tell us what's on your mind…" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                  Sending…
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Map + Address */}
        <div>
          <h2 className="text-3xl font-extrabold mb-8">Our <span className="text-blue-400">Location</span></h2>
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 mb-6 h-72">
            <iframe
              title="EES Location Map"
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.7432247969897!2d87.30898532346033!3d22.304160979999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d4406b55555ab%3A0xf6a0850f803a0797!2sElectrical%20Engineering%20Department%2C%20IIT%20Kharagpur!5e0!3m2!1sen!2sin!4v1710150000000"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 border-l-2 border-l-blue-600">
            <h3 className="font-bold text-white mb-1">Electrical Engineering Department</h3>
            <p className="text-gray-400 text-sm">IIT Kharagpur</p>
            <p className="text-gray-400 text-sm">West Bengal 711103, India</p>
          </div>
        </div>
      </section>
    </main>
  )
}
