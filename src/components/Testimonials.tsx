import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Business Executive",
    content: "The level of care and precision at De Dental Square is unmatched. Dr. Neeraj Agrawal is truly an artist when it comes to dental aesthetics.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Priya Verma",
    role: "Fashion Designer",
    content: "I was looking for a clinic that understood the importance of a perfect smile. The results exceeded my expectations. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Vikram Singh",
    role: "Architect",
    content: "A sophisticated environment combined with cutting-edge technology. My dental procedure was seamless and completely painless.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-zen-bg relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zen-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zen-primary font-bold tracking-[0.3em] uppercase text-xs mb-6"
          >
            Testimonials
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif text-zen-text mb-8"
          >
            Voices of <span className="italic text-zen-primary">Satisfaction</span>
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] border border-zen-primary/10 relative group hover:border-zen-primary/30 transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-zen-primary text-zen-primary" />
                ))}
              </div>
              
              <p className="text-zen-muted text-lg leading-relaxed mb-10 font-light italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-zen-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover relative border border-zen-primary/10"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-zen-text font-bold tracking-wide">{testimonial.name}</h4>
                  <p className="text-zen-primary text-[10px] font-bold uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>

              <Quote className="absolute top-10 right-10 text-zen-primary/10 w-12 h-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
