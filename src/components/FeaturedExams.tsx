import { motion } from "framer-motion";
import { exams } from "@/data/exams";
import ExamCard from "./ExamCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FeaturedExams() {
  const featured = [...exams]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6);

  return (
    <section className="container mx-auto px-4 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
      >
        <div>
          <span className="text-gold font-black text-[10px] uppercase tracking-[0.4em] mb-4 block italic">High Priority</span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tighter">
            Popular <span className="gold-gradient-text italic">Inductions</span>
          </h2>
        </div>
        <Link
          to="/exams"
          className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-gold transition-colors"
        >
          EXPLORE DATABASE <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {featured.map((exam, i) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <ExamCard exam={exam} />
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
         <Link
          to="/exams"
          className="btn-gold px-12 py-6 inline-flex items-center gap-6"
        >
          <span className="text-[11px] font-black">VIEW ENTIRE ARCHIVE</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
