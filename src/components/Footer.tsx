import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/60 mt-auto">
      <div className="container-app py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              ExamPath <span className="text-primary">India</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/exams" className="hover:text-foreground transition-colors">All Exams</Link>
            <Link to="/upcoming" className="hover:text-foreground transition-colors">Upcoming</Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ExamPath India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
