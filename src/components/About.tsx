import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Award, Users, Heart } from 'lucide-react';

const stats = [
  { label: 'Years of Experience', value: '12+', icon: Award },
  { label: 'Happy Patients', value: '15k+', icon: Users },
  { label: 'Expert Doctors', value: '20+', icon: Heart },
  { label: 'Success Rate', value: '99%', icon: CheckCircle2 },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-zen-bg overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden zen-shadow border border-zen-primary/20 aspect-[4/5]">
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team"
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-zen-primary/10 rounded-full -z-10 blur-3xl"></div>
            
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 hidden xl:block">
              <div className="writing-mode-vertical text-[10px] uppercase tracking-[0.5em] text-zen-primary font-bold opacity-50 rotate-180">
                Established • 2014 • Varanasi
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-zen-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">The Legacy</h2>
              <p className="text-5xl md:text-6xl font-serif text-zen-text mb-8 leading-[1.1]">
                Crafting Smiles with <span className="italic text-zen-primary">Passion</span>
              </p>
              <p className="text-xl text-zen-muted mb-10 leading-relaxed font-light">
                De Dental Square, led by <span className="text-zen-text font-medium">Dr. Neeraj Agrawal</span>, was founded on the principle of providing high-quality, compassionate dental care to the Varanasi community. Our state-of-the-art facility in Ravindrapuri is equipped with the latest technology to ensure your comfort and safety.
              </p>

              <div className="grid gap-6 mb-12">
                {[
                  'Elite team of specialized surgeons',
                  'Next-gen diagnostic technology',
                  'Bespoke aesthetic treatment plans',
                  'Premium patient experience'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full border border-zen-primary/30 flex items-center justify-center group-hover:bg-zen-primary transition-all">
                      <CheckCircle2 className="text-zen-primary group-hover:text-white" size={14} />
                    </div>
                    <span className="text-zen-text font-medium tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 pt-12 border-t border-zen-primary/10">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-serif text-zen-text mb-1">{stat.value}</div>
                    <div className="text-[9px] text-zen-primary uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
