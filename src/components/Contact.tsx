import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-zen-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-zen-primary font-bold tracking-[0.3em] uppercase text-xs mb-6"
            >
              Contact
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif text-zen-text mb-8"
            >
              Get in <span className="italic text-zen-primary">Touch</span>
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zen-muted mb-12 leading-relaxed font-light max-w-md"
            >
              Have questions about our elite services or want to schedule a private consultation? Our dedicated team is here to assist you.
            </motion.p>

            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-zen-primary group-hover:bg-zen-primary group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zen-text mb-2">Our Location</h4>
                  <p className="text-zen-muted font-light leading-relaxed">Ravindrapuri near Ming Garden,<br />Varanasi, Uttar Pradesh, India</p>
                  <a href="#" className="text-zen-primary text-[10px] font-bold uppercase tracking-widest mt-3 inline-flex items-center gap-2 hover:text-zen-text transition-colors">
                    View on Map <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-zen-primary group-hover:bg-zen-primary group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zen-text mb-2">Direct Line</h4>
                  <p className="text-zen-muted font-light">+91 (555) 000-1234</p>
                  <p className="text-[10px] text-zen-primary/60 uppercase tracking-widest mt-1 font-bold">Mon-Sat from 9am to 8pm</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center text-zen-primary group-hover:bg-zen-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zen-text mb-2">Email Concierge</h4>
                  <p className="text-zen-muted font-light">hello@dedentalsquare.com</p>
                  <p className="text-[10px] text-zen-primary/60 uppercase tracking-widest mt-1 font-bold">Response within 12 hours</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden zen-shadow h-[600px] border border-zen-primary/10"
          >
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
              <div className="text-center p-12 relative z-10">
                <div className="w-20 h-20 bg-zen-primary/10 rounded-full flex items-center justify-center text-zen-primary mx-auto mb-6 border border-zen-primary/20 animate-pulse">
                  <MapPin size={32} />
                </div>
                <p className="text-zen-text font-serif text-2xl mb-2">Ravindrapuri, Varanasi</p>
                <p className="text-sm text-zen-primary uppercase tracking-[0.2em] font-bold">Elite Dental Care Hub</p>
              </div>
              <div className="absolute inset-0 bg-zen-primary/5 opacity-50"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
              alt="Map Placeholder"
              className="w-full h-full object-cover opacity-20 grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
