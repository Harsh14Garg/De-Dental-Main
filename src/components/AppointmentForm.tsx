import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { bookAppointment } from '../firebase';

export default function AppointmentForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookAppointment({
        ...formData,
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error booking your appointment. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <section id="appointment" className="py-32 [var(--color-base-bg)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 rounded-[3rem] text-center max-w-2xl mx-auto border-[var(--color-brand-primary)]/20"
          >
            <div className="w-24 h-24 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] rounded-full flex items-center justify-center mx-auto mb-8 border border-[var(--color-brand-primary)]/30">
              <CheckCircle2 size={56} />
            </div>
            <h3 className="text-4xl font-serif text-[var(--color-text-primary)] mb-6">Request Received</h3>
            <p className="text-xl text-[var(--color-text-muted)] mb-10 font-light leading-relaxed">
              Thank you for choosing <span className="text-[var(--color-brand-primary)] font-medium">De Dental Square</span>. Our concierge will contact you shortly to finalize your appointment.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="bg-zen-gradient text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all zen-shadow"
            >
              Book Another Session
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment" className="py-32 [var(--color-base-bg)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-brand-primary)]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--color-brand-primary)] font-bold tracking-[0.3em] uppercase text-xs mb-6"
            >
              Reservations
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif text-[var(--color-text-primary)] mb-8 leading-[1.1]"
            >
              Begin Your <br />
              <span className="italic text-[var(--color-brand-primary)]">Transformation</span>
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[var(--color-text-muted)] mb-12 leading-relaxed font-light max-w-md"
            >
              Secure your private consultation today. Our elite team is ready to provide you with a bespoke dental experience.
            </motion.p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold mb-1">Direct Line</div>
                  <div className="text-xl text-[var(--color-text-primary)] font-serif">+91 (555) 000-1234</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold mb-1">Concierge</div>
                  <div className="text-xl text-[var(--color-text-primary)] font-serif">hello@dedentalsquare.com</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 sm:p-12 rounded-[3rem] border-[var(--color-brand-primary)]/10 zen-shadow"
          >
            <h3 className="text-3xl font-serif text-[var(--color-text-primary)] mb-10">Request Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)] flex items-center gap-2">
                    <User size={14} className="text-[var(--color-brand-primary)]" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-[var(--color-brand-primary)]/20 rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-zen-primary outline-none transition-all placeholder:text-[var(--color-text-muted)]/50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)] flex items-center gap-2">
                    <Mail size={14} className="text-[var(--color-brand-primary)]" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-[var(--color-brand-primary)]/20 rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-zen-primary outline-none transition-all placeholder:text-[var(--color-text-muted)]/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)] flex items-center gap-2">
                    <Phone size={14} className="text-[var(--color-brand-primary)]" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-[var(--color-brand-primary)]/20 rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-zen-primary outline-none transition-all placeholder:text-[var(--color-text-muted)]/50"
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)] flex items-center gap-2">
                    <Send size={14} className="text-[var(--color-brand-primary)]" /> Service
                  </label>
                  <select
                    required
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-[var(--color-brand-primary)]/20 rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-zen-primary outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-white text-[var(--color-text-primary)]">Select a service</option>
                    <option value="general" className="bg-white text-[var(--color-text-primary)]">General Dentistry</option>
                    <option value="cosmetic" className="bg-white text-[var(--color-text-primary)]">Cosmetic Dentistry</option>
                    <option value="orthodontics" className="bg-white text-[var(--color-text-primary)]">Orthodontics</option>
                    <option value="surgery" className="bg-white text-[var(--color-text-primary)]">Oral Surgery</option>
                    <option value="pediatric" className="bg-white text-[var(--color-text-primary)]">Pediatric Care</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)] flex items-center gap-2">
                    <Calendar size={14} className="text-[var(--color-brand-primary)]" /> Preferred Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-[var(--color-brand-primary)]/20 rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-zen-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)] flex items-center gap-2">
                    <Clock size={14} className="text-[var(--color-brand-primary)]" /> Preferred Time
                  </label>
                  <input
                    required
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-white/50 border border-[var(--color-brand-primary)]/20 rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-zen-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)] flex items-center gap-2">
                  <MessageSquare size={14} className="text-[var(--color-brand-primary)]" /> Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-white/50 border border-[var(--color-brand-primary)]/20 rounded-2xl px-5 py-4 text-[var(--color-text-primary)] focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-zen-primary outline-none transition-all resize-none placeholder:text-[var(--color-text-muted)]/50"
                  placeholder="Tell us about your dental concerns..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-zen-gradient text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 zen-shadow ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send size={18} />
                    Confirm Request
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
