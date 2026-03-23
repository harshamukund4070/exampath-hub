import { motion } from "framer-motion";
import { exams } from "@/data/exams";
import { BookOpen, TrendingUp, Clock } from "lucide-react";

export default function StatsSection() {
  const totalExams = exams.length;
  const upcomingExams = exams.filter(e => e.status === "upcoming").length;
  const ongoingExams = exams.filter(e => e.status === "ongoing").length;

  const stats = [
    { label: "Total Exams", value: `${totalExams}+`, icon: BookOpen, color: "text-primary" },
    { label: "Upcoming Exams", value: `${upcomingExams}`, icon: Clock, color: "text-info" },
    { label: "Active Now", value: `${ongoingExams}`, icon: TrendingUp, color: "text-success" },
  ];

  return (
    <section className="container-app py-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="stat-card flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-display font-bold text-2xl text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
