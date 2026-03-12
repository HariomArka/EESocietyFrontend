import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/projects', label: 'Research Projects' },
  { to: '/contact', label: 'Contact' },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.203 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Twitter/X',
    url: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 002.856-3.915 9.958 9.958 0 01-2.828.856 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/8 text-white">

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo.jpg" alt="EES Logo" className="h-12 w-12 object-cover rounded-lg ring-2 ring-blue-600/50" />
            <div>
              <p className="font-bold text-white leading-tight">Electrical Engineering</p>
              <p className="text-blue-400 text-sm font-semibold">Society</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Advancing learning, research, and community in power systems, electronics, and embedded technology at IIEST Shibpur.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-9 h-9 rounded-lg bg-white/8 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h3>
          <nav className="space-y-2.5">
            {quickLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-400 text-sm font-medium transition-colors duration-200 group"
              >
                <span className="w-1 h-1 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Map Column */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Location</h3>
          <div className="rounded-xl overflow-hidden ring-1 ring-white/10 mb-3">
            <iframe
              title="EE Department Location"
              className="w-full h-44"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.7432247969897!2d87.30898532346033!3d22.304160979999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d4406b55555ab%3A0xf6a0850f803a0797!2sElectrical%20Engineering%20Department%2C%20IIT%20Kharagpur!5e0!3m2!1sen!2sin!4v1710150000000"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-gray-600 text-xs">IIEST Shibpur, Howrah, West Bengal, India</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>© 2026 Electrical Engineering Society, IIEST Shibpur. All rights reserved.</p>
          <p>Designed with <span className="text-blue-500">♥</span> for EES</p>
        </div>
      </div>
    </footer>
  )
}