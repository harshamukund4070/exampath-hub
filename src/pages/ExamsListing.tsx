import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { exams, searchExams, getTopCategories, getExamsByCategory } from "@/data/exams";
import ExamCard from "@/components/ExamCard";

const levels = ["National", "State", "University"] as const;
const statuses = ["upcoming", "ongoing", "completed"] as const;
const modes = ["Online", "Offline", "Hybrid"] as const;

export default function ExamsListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialCat = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQ);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const topCats = getTopCategories();

  const filtered = useMemo(() => {
    let results = query ? searchExams(query) : [...exams];

    if (selectedCategory) {
      const catExams = getExamsByCategory(selectedCategory);
      const catExamIds = new Set(catExams.map(e => e.id));
      results = results.filter(e => catExamIds.has(e.id));
    }

    if (selectedLevel) {
      results = results.filter(e => e.level === selectedLevel);
    }

    if (selectedStatus) {
      results = results.filter(e => e.status === selectedStatus);
    }

    return results;
  }, [query, selectedCategory, selectedLevel, selectedStatus]);

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedLevel("");
    setSelectedStatus("");
    setSearchParams({});
  };

  const hasActiveFilters = query || selectedCategory || selectedLevel || selectedStatus;

  return (
    <div className="container-app py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
          All Exams
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Browse and filter through {exams.length}+ government and competitive exams
        </p>
      </motion.div>

      {/* Search & filter bar */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, body, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors active:scale-[0.97]"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors active:scale-[0.97]"
          >
            <X className="w-4 h-4" /> Clear
          </button>
        )}
      </div>

      {/* Filter chips */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 p-4 rounded-xl bg-card border border-border space-y-4"
        >
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {topCats.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors active:scale-95 ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Level</p>
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(selectedLevel === level ? "" : level)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors active:scale-95 ${
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(selectedStatus === s ? "" : s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors active:scale-95 capitalize ${
                    selectedStatus === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} exam{filtered.length !== 1 ? "s" : ""} found
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
              >
                <ExamCard exam={exam} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No exams match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
