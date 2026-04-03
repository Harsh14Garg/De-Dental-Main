import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, CheckCircle2, Users } from 'lucide-react';
import SplineHero from './spline/SplineHero';
import { ScrollReveal } from './animations/ScrollReveal';

const SPLINE_SCENE = 'https://prod.spline.design/kZSsqHs9srYG9D7p/scene.splinecode';

const stats = [
  { value: '15k+', label: 'Patients Treated' },
  { value: '12+', label: 'Years Experience' },
  { value: '99%', label: 'Success Rate' },
  { value: '50+', label: 'Procedures' },
];

export default function Hero() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-animated-gradient -z-20" />

        {/* Spline 3D */}
        <SplineHero scene={SPLINE_SCENE} interactive opacity={0.45} />

        {/* Blobs */}
        <div className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob -z-10"
          style={{ background: 'var(--color-brand-primary)' }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 -z-10"
          style={{ background: 'var(--color-brand-accent)' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-blob animation-delay-4000 -z-10"
          style={{ background: 'var(--color-brand-secondary)' }} />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-pattern opacity-40 -z-10" />

        <div className="container mx-auto px-6 relative z-10 pt-28 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8 text-sm font-bold"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              <Star size={14} className="fill-current" />
              <span>Gold Medalist · Dr. Neeraj Agrawal · Varanasi</span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-brand-primary)' }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-display font-black leading-[0.9] mb-6 tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Precision
              <br />
              <span className="text-gradient font-serif italic font-normal tracking-normal">meets</span>
              <br />
              Artistry
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Experience world-class dental care powered by advanced technology
              and the gentle expertise of <strong className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Dr. Neeraj Agrawal</strong>.
              Your perfect smile, engineered to last.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link to="/appointment">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary flex items-center gap-2 px-10 py-4 text-base"
                >
                  Book Consultation <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="btn-secondary flex items-center gap-2 px-10 py-4 text-base"
                >
                  Our Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="glass rounded-2xl py-4 px-3 text-center"
                >
                  <div className="text-3xl font-black font-serif text-gradient leading-none mb-1">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10"
          style={{ background: 'linear-gradient(to top, var(--color-base-bg), transparent)' }} />
      </section>

      {/* ── QUICK NAV CARDS ── */}
      <section className="relative z-10 -mt-8 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Our Services', desc: 'Comprehensive dental treatments', icon: Shield, link: '/services', color: 'var(--color-brand-primary)' },
              { title: 'Meet the Doctor', desc: 'Dr. Neeraj Agrawal', icon: Star, link: '/about', color: 'var(--color-brand-accent)' },
              { title: 'Book Online', desc: 'Schedule your visit easily', icon: Clock, link: '/appointment', color: 'var(--color-brand-secondary)' },
              { title: 'Our Patients', desc: 'Real stories from patients', icon: Users, link: '/testimonials', color: '#9B59B6' },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <Link to={item.link}>
                  <div className="dental-card card-3d p-6 flex flex-col gap-5 h-full group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${item.color}cc, ${item.color})` }}>
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-1.5 group-hover:text-[var(--color-brand-primary)] transition-colors"
                        style={{ color: 'var(--color-text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all group-hover:gap-3"
                      style={{ color: item.color }}>
                      Explore <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 rounded-l-[80px] opacity-40"
          style={{ background: 'var(--color-base-muted)' }} />

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <ScrollReveal direction="left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
                  style={{ background: 'rgba(232,115,90,0.08)', color: 'var(--color-brand-primary)' }}>
                  <Shield size={14} /> Why Choose Us
                </div>
                <h2 className="text-5xl font-display font-black leading-tight mb-6"
                  style={{ color: 'var(--color-text-primary)' }}>
                  Excellence in Every
                  <br />
                  <span className="text-gradient">Dental Procedure</span>
                </h2>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  At DE Dental Square, we combine state-of-the-art technology
                  with artistic precision. Every procedure is performed with
                  clinical excellence and a gentle touch.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Advanced Dental Implants & Prosthetics',
                    'Painless Laser Root Canal Treatments',
                    'Customized Smile Architecture',
                    'Strict ISO-Grade Sterilization',
                    '3D Digital Imaging Diagnostics',
                  ].map((item, i) => (
                    <ScrollReveal key={i} direction="left" delay={0.1 * i}>
                      <li className="flex items-center gap-3 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        <CheckCircle2 size={18} style={{ color: 'var(--color-brand-primary)', flexShrink: 0 }} />
                        {item}
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
                <Link to="/about">
                  <motion.button whileHover={{ scale: 1.03 }} className="btn-secondary px-8 py-3 text-sm">
                    Learn More About Us
                  </motion.button>
                </Link>
              </ScrollReveal>
            </div>

            <div className="lg:w-1/2 relative">
              <ScrollReveal direction="scale">
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl max-w-md mx-auto"
                  style={{ boxShadow: '0 32px 80px rgba(232,115,90,0.2)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                    alt="Modern dental clinic"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,46,46,0.5), transparent)' }} />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-6 glass p-5 rounded-2xl shadow-xl max-w-[240px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
                      style={{ background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-accent))' }}>
                      <Star size={20} className="fill-white" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-base" style={{ color: 'var(--color-text-primary)' }}>Gold Medalist</div>
                      <div className="text-xs font-bold" style={{ color: 'var(--color-brand-primary)' }}>Dr. Neeraj Agrawal</div>
                    </div>
                  </div>
                </motion.div>

                {/* Corner accents */}
                <div className="absolute -top-8 -right-8 w-32 h-32 -z-10"
                  style={{ border: '2px solid rgba(232,115,90,0.25)', borderRadius: '0 3rem 0 0', borderLeft: 'none', borderBottom: 'none' }} />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 -z-10"
                  style={{ border: '2px solid rgba(232,115,90,0.25)', borderRadius: '0 0 0 3rem', borderRight: 'none', borderTop: 'none' }} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES MARQUEE ── */}
      <section className="py-8 overflow-hidden" style={{ borderTop: '1px solid rgba(232,115,90,0.1)', borderBottom: '1px solid rgba(232,115,90,0.1)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].flatMap(() =>
            ['Dental Implants', 'Smile Makeover', 'Root Canal', 'Teeth Whitening', 'Orthodontics', 'Oral Surgery', 'Pediatric Care', 'Gum Treatment'].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-4 mx-6 text-sm font-bold uppercase tracking-widest"
                style={{ color: 'var(--color-text-muted)' }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--color-brand-primary)' }} />
                {s}
              </span>
            ))
          )}
        </div>
      </section>
    </>
  );
}
