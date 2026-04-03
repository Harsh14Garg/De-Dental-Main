import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-brand-dark)', color: 'rgba(255,255,255,0.7)' }} className="pt-20 pb-10 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 -z-0"
        style={{ background: 'var(--color-brand-primary)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-10 -z-0"
        style={{ background: 'var(--color-brand-secondary)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                  style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-accent))' }}>
                  DE
                </div>
                <span className="text-xl font-display font-bold text-white">DE Dental Square</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 font-light">
                Redefining dental excellence in Varanasi. Precision technology meets artistic care — for the smile you deserve.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-brand-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                  >
                    <Icon size={15} className="text-white" />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Links */}
          <div>
            <ScrollReveal delay={0.1}>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Our Services', path: '/services' },
                  { name: 'Testimonials', path: '/testimonials' },
                  { name: 'Book Appointment', path: '/appointment' },
                  { name: 'Contact', path: '/contact' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path}
                      className="text-sm flex items-center gap-2 group transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full transition-all" style={{ background: 'var(--color-brand-primary)', opacity: 0.5 }} />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Services */}
          <div>
            <ScrollReveal delay={0.2}>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Services</h4>
              <ul className="space-y-3">
                {['Dental Implants', 'Smile Makeover', 'Root Canal', 'Teeth Whitening', 'Orthodontics', 'Pediatric Care'].map((item) => (
                  <li key={item}>
                    <Link to="/services"
                      className="text-sm flex items-center gap-2 transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-brand-accent)', opacity: 0.5 }} />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Contact */}
          <div>
            <ScrollReveal delay={0.3}>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(232,115,90,0.15)' }}>
                    <Phone size={14} style={{ color: 'var(--color-brand-primary)' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'var(--color-brand-primary)' }}>Phone</div>
                    <a href="tel:8840066719" className="text-sm text-white hover:opacity-80 transition-opacity">+91 8840066719</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(244,162,97,0.15)' }}>
                    <Mail size={14} style={{ color: 'var(--color-brand-accent)' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: 'var(--color-brand-accent)' }}>Email</div>
                    <a href="mailto:info@dedentalsquare.com" className="text-sm text-white hover:opacity-80 transition-opacity">info@dedentalsquare.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(45,106,106,0.25)' }}>
                    <MapPin size={14} style={{ color: '#4ECDC4' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: '#4ECDC4' }}>Location</div>
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Varanasi, Uttar Pradesh</span>
                  </div>
                </li>
              </ul>
            </ScrollReveal>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2025 DE DENTAL SQUARE — ALL RIGHTS RESERVED
          </p>
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Made with <Heart size={11} className="fill-current" style={{ color: 'var(--color-brand-primary)' }} /> for better smiles
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</Link>
            <Link to="#" className="text-xs transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
