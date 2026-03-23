import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Landmark, Shield, LandmarkIcon, Settings, Microscope, BriefcaseBusiness, Gavel, BookOpen, Stars } from 'lucide-react';
import { ExamCategory } from '../types';
import { cn } from '../utils/helpers';

interface CategoryCardProps {
  category: ExamCategory;
  count: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, count, isSelected, onClick }) => {
  const getIcon = () => {
    switch (category) {
      case 'Central': return <Landmark className="w-8 h-8" />;
      case 'State': return <GraduationCap className="w-8 h-8" />;
      case 'Banking': return <LandmarkIcon className="w-8 h-8" />;
      case 'Defence': return <Shield className="w-8 h-8" />;
      case 'Engineering': return <Settings className="w-8 h-8" />;
      case 'Medical': return <Microscope className="w-8 h-8" />;
      case 'MBA': return <BriefcaseBusiness className="w-8 h-8" />;
      case 'Law': return <Gavel className="w-8 h-8" />;
      case 'Teaching': return <BookOpen className="w-8 h-8" />;
      default: return <Stars className="w-8 h-8" />;
    }
  };

  const colors = {
    'Central': 'from-blue-50 to-indigo-50 text-blue-600 border-blue-100 ring-blue-500/10',
    'State': 'from-orange-50 to-amber-50 text-orange-600 border-orange-100 ring-orange-500/10',
    'Banking': 'from-green-50 to-emerald-50 text-green-600 border-green-100 ring-green-500/10',
    'Defence': 'from-red-50 to-rose-50 text-red-600 border-red-100 ring-red-500/10',
    'Engineering': 'from-sky-50 to-cyan-50 text-sky-600 border-sky-100 ring-sky-500/10',
    'Medical': 'from-rose-50 to-pink-50 text-rose-600 border-rose-100 ring-rose-500/10',
    'MBA': 'from-purple-50 to-fuchsia-50 text-purple-600 border-purple-100 ring-purple-500/10',
    'Law': 'from-slate-50 to-gray-50 text-slate-600 border-slate-100 ring-slate-500/10',
    'Teaching': 'from-yellow-50 to-orange-50 text-yellow-600 border-yellow-100 ring-yellow-500/10',
    'Professional': 'from-teal-50 to-emerald-50 text-teal-600 border-teal-100 ring-teal-500/10',
  };

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center p-6 border-2 rounded-2xl transition-all duration-300 w-full bg-gradient-to-br",
        colors[category],
        isSelected ? "ring-4 border-current" : "bg-white hover:border-current/30 shadow-sm hover:shadow-md"
      )}
    >
      <div className={cn("mb-4 transform transition-transform group-hover:scale-110")}>
        {getIcon()}
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-1">{category}</h3>
      <p className="text-sm font-medium opacity-70">{count} Exams Available</p>
    </motion.button>
  );
};

export default CategoryCard;
