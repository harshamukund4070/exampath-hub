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

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center p-8 rounded-3xl transition-all duration-500 w-full h-full",
        "bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5",
        isSelected && "ring-2 ring-gold border-gold bg-gold/10"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl overflow-hidden"></div>
      <div className={cn(
        "mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-gold group-hover:text-black group-hover:bg-gold transition-all duration-500 transform group-hover:rotate-[10deg]",
        isSelected && "bg-gold text-black"
      )}>
        {getIcon()}
      </div>
      <h3 className="font-black text-white text-xl mb-2 font-display">{category}</h3>
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{count} PORTALS</p>
    </motion.button>
  );
};

export default CategoryCard;
