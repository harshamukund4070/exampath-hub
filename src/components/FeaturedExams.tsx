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
    <section className="container-app py-16">
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-end justify-between"
      >
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
            Popular Exams
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">Most viewed exams by aspirants</p>
        </div>
        <Link
          to="/exams"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((exam, i) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExamCard exam={exam} />
          </motion.div>
        ))}
      </div>

      <Link
        to="/exams"
        className="sm:hidden mt-6 flex items-center justify-center gap-1 text-sm font-medium text-primary"
      >
        View all exams <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
