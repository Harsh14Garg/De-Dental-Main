import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, HeartPulse, ShieldCheck, Microscope, Smile, Activity } from 'lucide-react';

const services = [
  {
    title: "General Dentistry",
    description: "Routine checkups, cleanings, and preventative care to keep your smile healthy.",
    icon: HeartPulse,
  },
  {
    title: "Cosmetic Dentistry",
    description: "Teeth whitening, veneers, and smile makeovers to boost your confidence.",
    icon: Sparkles,
  },
  {
    title: "Orthodontics",
    description: "Braces and clear aligners to straighten your teeth and improve your bite.",
    icon: Activity,
  },
  {
    title: "Oral Surgery",
    description: "Expert surgical procedures including wisdom teeth removal and implants.",
    icon: Microscope,
  },
  {
    title: "Pediatric Care",
    description: "Gentle dental care specifically designed for our youngest patients.",
    icon: Smile,
  },
  {
    title: "Emergency Care",
    description: "Rapid response for dental emergencies when you need us most.",
    icon: ShieldCheck,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-zen-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zen-primary font-bold tracking-[0.3em] uppercase text-xs mb-6"
          >
            Our Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-zen-text mb-8"
          >
            Premium Dental <span className="italic text-zen-primary">Solutions</span>
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zen-muted font-light"
          >
            We offer a curated selection of dental services using the latest technology to ensure the best possible outcomes for our patients.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03,
                borderColor: 'rgba(123, 158, 137, 0.5)',
                boxShadow: '0 0 30px rgba(123, 158, 137, 0.2)'
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                scale: { duration: 0.2 },
                boxShadow: { duration: 0.2 },
                borderColor: { duration: 0.2 }
              }}
              className="glass-card p-10 rounded-[2.5rem] border border-zen-primary/10 group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-zen-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-zen-primary/10 transition-all"></div>
              
              <div className="w-16 h-16 bg-zen-primary/10 border border-zen-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-zen-primary transition-all duration-500">
                <service.icon size={32} className="text-zen-primary group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-2xl font-serif text-zen-text mb-4 group-hover:text-zen-primary transition-colors">{service.title}</h3>
              <p className="text-zen-muted leading-relaxed mb-8 font-light">
                {service.description}
              </p>
              
              <Link to="/appointment" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-zen-primary hover:text-zen-text transition-colors">
                Discover More
                <div className="w-8 h-[1px] bg-zen-primary group-hover:w-12 transition-all"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
