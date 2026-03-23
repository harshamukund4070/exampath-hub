import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getTopCategories, getExamsByCategory } from "@/data/exams";
import { Landmark, MapPin, Trophy, Briefcase, Globe, GraduationCap } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Landmark, MapPin, Trophy, Briefcase, Globe, GraduationCap,
};

export default function CategoryCards() {
  const navigate = useNavigate();
  const topCategories = getTopCategories();

  return (
    <section className="container mx-auto px-4 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <span className="text-gold font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Specialized Sectors</span>
        <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tighter">
          Operational <span className="gold-gradient-text italic">Database</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {topCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Landmark;
          const examCount = getExamsByCategory(cat.id).length;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <button
                onClick={() => navigate(`/exams?category=${cat.id}`)}
                className="group relative w-full h-full flex flex-col items-center text-center gap-6 p-10 rounded-[40px] bg-black-charcoal border border-white/5 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-all duration-700 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="w-20 h-20 rounded-2xl bg-black-deep flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700 group-hover:border-gold/20 group-hover:bg-gold/5">
                  <Icon className="w-10 h-10 text-gold shadow-gold-glow" />
                </div>
                <div>
                  <p className="font-black text-white text-lg font-display uppercase tracking-widest leading-tight group-hover:text-gold transition-colors">{cat.name}</p>
                  <p className="text-[9px] font-black text-white/20 mt-3 uppercase tracking-[0.3em] group-hover:text-gold/40 transition-colors">{examCount} Mandates</p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
