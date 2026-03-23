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
    <section className="container-app py-16">
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground text-center">
          Browse by Category
        </h2>
        <p className="mt-2 text-muted-foreground text-center text-sm">
          Find exams organized by domain and level
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {topCategories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Landmark;
          const examCount = getExamsByCategory(cat.id).length;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => navigate(`/exams?category=${cat.id}`)}
                className="category-card w-full flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{examCount} exams</p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
