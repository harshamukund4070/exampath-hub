import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Calendar, Briefcase, MapPin, ExternalLink, Users, Shield, Clock } from 'lucide-react';
import { Exam } from '../types';
import { formatDate, cn } from '../utils/helpers';
import { motion } from 'framer-motion';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(exam.id));
  }, [exam.id]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter((id: string) => id !== exam.id);
    } else {
      newBookmarks = [...bookmarks, exam.id];
    }
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const statusMap = {
    upcoming: { color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/30', label: 'UPCOMING' },
    ongoing: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', label: 'ACTIVE' },
    completed: { color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10', label: 'ARCHIVED' }
  };

  const status = statusMap[exam.status.toLowerCase() as keyof typeof statusMap] || statusMap.upcoming;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full bg-black-charcoal/60 backdrop-blur-3xl rounded-[40px] border border-white/5 hover:border-gold/40 transition-all duration-700 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex-grow"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={toggleBookmark}
          className={cn(
            "p-3.5 rounded-2xl transition-all duration-500 transform hover:scale-110 active:scale-90 shadow-2xl",
            isBookmarked ? "bg-gold text-black shadow-gold/20" : "bg-white/5 text-white/40 hover:text-gold border border-white/10 hover:border-gold/30"
          )}
        >
          <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
        </button>
      </div>

      <Link to={`/exam/${exam.slug}`} className="p-10 flex flex-col h-full">
        <div className="flex items-start gap-6 mb-10">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-black-deep border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-gold/30 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-700">
             <Shield className="w-8 h-8 text-gold group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="flex-grow pt-1">
            <h3 className="font-black text-2xl text-white leading-tight group-hover:text-gold transition-colors line-clamp-2 font-display italic tracking-tight">
              {exam.name}
            </h3>
            <span className="text-[10px] font-black text-white/20 tracking-[0.3em] mt-3 inline-block uppercase group-hover:text-white/40 transition-colors">
              {exam.conductingBody}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
           <span className={cn("px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm", status.color, status.bg, status.border)}>
            {status.label}
          </span>
          <span className="px-5 py-2 rounded-xl text-[9px] font-black bg-white/5 text-white/40 border border-white/10 uppercase tracking-[0.2em] group-hover:border-white/20 transition-all">
            {exam.level}
          </span>
        </div>

        <p className="text-white/40 font-medium line-clamp-2 mb-10 flex-grow leading-relaxed text-sm group-hover:text-white/60 transition-colors">
          Mission Objective: Master {exam.shortName} • {exam.frequency} Induction Program • {exam.eligibility.education} Credentials Required.
        </p>

        <div className="mt-auto space-y-5 pt-8 border-t border-white/5 group-hover:border-gold/10 transition-colors">
          <div className="flex items-center text-[10px] text-white/30 group-hover:text-white/60 transition-colors font-black tracking-[0.2em] uppercase">
            <Clock className="w-4 h-4 mr-4 text-gold group-hover:animate-pulse" />
            INDUCTION: {exam.importantDates.examDate}
          </div>
          {exam.vacancies && (
            <div className="flex items-center text-[10px] text-white/30 group-hover:text-white/60 transition-colors font-black tracking-[0.2em] uppercase">
              <Users className="w-4 h-4 mr-4 text-gold" />
              SLOTS: {exam.vacancies}
            </div>
          )}
          <div className="flex items-center text-[10px] text-white/30 group-hover:text-white/60 transition-colors font-black tracking-[0.2em] uppercase">
            <MapPin className="w-4 h-4 mr-4 text-gold" />
            SECTOR: {exam.categoryId}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExamCard;
