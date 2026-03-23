import { motion } from "framer-motion";
import { exams } from "@/data/exams";
import { BookOpen, TrendingUp, Clock } from "lucide-react";

export default function StatsSection() {
  const totalExams = 500; // Static values for premium feel or fetch from data
  const upcomingExams = 42;
  const activeNow = 120;

  const stats = [
    { label: "Elite Database", value: `${totalExams}+`, icon: BookOpen },
    { label: "Active Mandates", value: `${upcomingExams}`, icon: Clock },
    { label: "Inductions Live", value: `${activeNow}`, icon: TrendingUp },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-black-charcoal/60 backdrop-blur-3xl p-10 rounded-[40px] border border-white/5 hover:border-gold/30 transition-all duration-700 flex items-center gap-8 group shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 rounded-2xl bg-black-deep flex items-center justify-center border border-white/10 group-hover:bg-gold group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-700">
              <stat.icon className="w-8 h-8 text-gold group-hover:text-black transition-colors" />
            </div>
            <div>
              <p className="font-black text-4xl text-white font-display italic group-hover:text-gold transition-colors">{stat.value}</p>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mt-2 group-hover:text-white/40 transition-colors">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
