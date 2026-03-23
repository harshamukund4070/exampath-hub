import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Calendar, Briefcase, MapPin, ExternalLink, Users, Shield } from 'lucide-react';
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 ring-blue-500/20';
      case 'ongoing':
        return 'bg-green-100 text-green-800 ring-green-500/20';
      case 'completed':
        return 'bg-gray-100 text-gray-800 ring-gray-500/10';
      default:
        return 'bg-gray-100 text-gray-800 ring-gray-500/10';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleBookmark}
          className={cn(
            "p-2 rounded-full transition-all duration-200 transform hover:scale-110",
            isBookmarked ? "bg-blue-50 text-blue-600" : "bg-white/80 backdrop-blur-sm text-gray-400 hover:text-blue-500"
          )}
        >
          <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
        </button>
      </div>

      <Link to={`/exam/${exam.slug}`} className="p-6 flex flex-col flex-grow">
        <div className="flex items-start gap-4 mb-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
             <Shield className="w-7 h-7 text-blue-600" />
          </div>
          <div className="flex-grow pt-1">
            <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {exam.name}
            </h3>
            <span className="text-xs font-medium text-gray-500 tracking-wide mt-1 inline-block uppercase">
              {exam.conductingBody}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ring-1 ring-inset", getStatusColor(exam.status))}>
            {exam.status}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10 uppercase tracking-wider">
            {exam.level}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-700/10 uppercase tracking-wider">
            {exam.mode}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-grow leading-relaxed">
          {exam.shortName} - Frequency: {exam.frequency}. Eligibility: {exam.eligibility.education}
        </p>

        <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <Calendar className="w-4 h-4 mr-3 text-blue-500" />
            <span className="font-medium">Exam Date: {exam.importantDates.examDate}</span>
          </div>
          {exam.vacancies && (
            <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              <Users className="w-4 h-4 mr-3 text-blue-500" />
              <span className="truncate">{exam.vacancies} Vacancies</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <MapPin className="w-4 h-4 mr-3 text-blue-500" />
            <span className="truncate">{exam.categoryId.toUpperCase()} Category</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExamCard;
