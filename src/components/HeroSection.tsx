import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/exams?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-app relative py-16 sm:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground text-balance leading-[1.1]">
            Your Gateway to Government & Competitive Exams
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-base sm:text-lg text-pretty max-w-xl mx-auto">
            Explore 500+ exams with eligibility, syllabus, dates, and preparation resources — all in one place.
          </p>

          <form onSubmit={handleSearch} className="mt-8 relative max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search exams, categories, or conducting body..."
                className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-card text-foreground text-sm shadow-lg border-0 outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg hero-gradient text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs">
            {["UPSC", "SSC CGL", "IBPS PO", "JEE Main", "NEET", "CAT"].map(tag => (
              <button
                key={tag}
                onClick={() => navigate(`/exams?q=${encodeURIComponent(tag)}`)}
                className="px-3 py-1.5 rounded-full bg-primary-foreground/15 text-primary-foreground/90 hover:bg-primary-foreground/25 transition-colors active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
