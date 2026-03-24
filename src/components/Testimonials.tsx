import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Aripaka Harsha Mukundha",
    role: "Lead Developer & Founder",
    quote: "As the lead developer of ExamPath Hub, I've built this platform with a vision to empower students across India with premium, real-time exam intelligence. My goal is to streamline your preparation journey and provide you with a definitive edge in your competitive path.",
    image: "/developer.jpg",
    isDeveloper: true
  },
  {
    name: "Aditi Sharma",
    role: "UPSC Aspirant",
    quote: "The real-time notifications and clean interface have made my preparation so much more organized. It's truly a premium experience.",
    image: "https://i.pravatar.cc/150?u=aditi",
    stars: 5
  },
  {
    name: "Rahul Varma",
    role: "SSC CGL Candidate",
    quote: "Finding official notifications was always a hassle until I found ExamPath. The accuracy here is unmatched.",
    image: "https://i.pravatar.cc/150?u=rahul",
    stars: 5
  },
  {
    name: "Priyanka Chopra",
    role: "JEE Aspirant",
    quote: "The glassmorphism design and smooth animations make it more than just a tool—it's an experience.",
    image: "https://i.pravatar.cc/150?u=priyanka",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-40 bg-black-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
          <span className="text-gold font-black text-xs uppercase tracking-[0.4em] block">Community Voices</span>
          <h2 className="text-5xl font-black text-white leading-tight">Shared Experiences</h2>
          <p className="text-white/30 text-lg">Join thousands of successful aspirants who have streamlined their journey with our platform.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`premium-glass p-8 rounded-[32px] border border-white/10 relative group hover:border-gold/30 transition-all duration-500 ${t.isDeveloper ? 'md:col-span-2 lg:col-span-2 lg:flex gap-8' : ''}`}
            >
              <div className={`flex flex-col ${t.isDeveloper ? 'lg:w-1/3' : 'w-full'} mb-6`}>
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={t.image}
                    alt={t.name}
                    className={`w-20 h-20 rounded-2xl object-cover border-2 border-white/10 group-hover:border-gold/50 transition-all relative z-10 ${t.isDeveloper ? 'w-32 h-32' : 'w-16 h-16'}`}
                  />
                  {t.isDeveloper && (
                    <div className="absolute -bottom-2 -right-2 bg-gold text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter z-10 shadow-lg">
                      Founder
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{t.name}</h4>
                  <p className="text-white/30 text-xs font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              <div className={`flex flex-col justify-between ${t.isDeveloper ? 'lg:w-2/3' : ''}`}>
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-gold/20" />
                  <p className={`text-white/60 leading-relaxed italic ${t.isDeveloper ? 'text-xl' : 'text-sm'}`}>
                    "{t.quote}"
                  </p>
                </div>
                {!t.isDeveloper && (
                  <div className="flex gap-1 mt-6">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
