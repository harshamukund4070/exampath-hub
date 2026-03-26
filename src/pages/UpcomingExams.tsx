import React, { useMemo } from 'react';
import { Calendar, Clock, ArrowRight, Bell, Share2, Shield } from 'lucide-react';
import { useExams, useCategories } from '../hooks/useSupabaseData';
import CountdownTimer from '../components/CountdownTimer';
import { formatDate, cn } from '../utils/helpers';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UpcomingExams: React.FC = () => {
  const { exams, loading: examsLoading } = useExams();
  const { categories, loading: catsLoading } = useCategories();

  const upcomingExamsList = useMemo(() => {
    return exams
      .filter(e => e.status === 'upcoming')
      .sort((a, b) => new Date(a.importantDates.examDate).getTime() - new Date(b.importantDates.examDate).getTime());
  }, [exams]);

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-40 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-20 relative">
           <div className="absolute -top-10 left-0 w-64 h-64 bg-gold/5 blur-[100px] -z-10"></div>
           <span className="text-gold font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Future Horizons</span>
           <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[1] font-display italic">
             Operational <span className="gold-gradient-text">Roadmap</span>
           </h1>
           <p className="text-lg text-white/40 font-medium max-w-2xl">Precision tracking for all upcoming elite recruitment and entrance mandates.</p>
        </div>

        <div className="grid gap-10">
           {examsLoading ? (
             [...Array(3)].map((_, i) => (
                <div key={i} className="h-72 bg-white/5 border border-white/10 rounded-[48px] animate-pulse"></div>
             ))
           ) : (
                 <>
                   {upcomingExamsList.map((exam, idx) => {
                     const category = categories.find(c => c.id === exam.categoryId);
                     return (
                       <motion.div
                         key={exam.id}
                         initial={{ opacity: 0, x: -30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ delay: idx * 0.1, duration: 0.6 }}
                         className="bg-black-charcoal rounded-[48px] border border-white/5 p-10 lg:p-14 hover:border-gold/30 transition-all duration-700 overflow-hidden relative group shadow-2xl"
                       >
                         <div className="absolute top-0 right-0 w-full h-full bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                         <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 blur-[120px] transition-all duration-1000 group-hover:bg-gold/10"></div>
                         
                         <div className="grid lg:grid-cols-12 gap-12 items-center relative">
                             <div className="lg:col-span-12 xl:col-span-5 space-y-10">
                               <div className="flex items-start gap-8">
                                   <div className="w-24 h-24 bg-black-deep rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center p-5 shadow-2xl group-hover:scale-110 transition-all duration-700 group-hover:border-gold/30">
                                     <Shield className="w-10 h-10 text-gold" />
                                   </div>
                                   <div className="pt-3">
                                     <h3 className="text-4xl font-black text-white mb-3 leading-tight font-display italic tracking-tight group-hover:text-gold transition-colors">{exam.name}</h3>
                                     <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] group-hover:text-gold transition-colors duration-500">{exam.conductingBody}</span>
                                   </div>
                               </div>
                               <div className="flex gap-4">
                                   <span className="px-6 py-3 rounded-2xl bg-gold/10 text-gold font-black text-[9px] uppercase tracking-widest border border-gold/20">{category?.name}</span>
                                   <span className="px-6 py-3 rounded-2xl bg-white/5 text-white/40 font-black text-[9px] uppercase tracking-widest border border-white/10">{exam.level}</span>
                               </div>
                             </div>

                             <div className="lg:col-span-6 xl:col-span-4 flex flex-col items-center justify-center space-y-8 bg-black-deep/40 backdrop-blur-3xl p-10 rounded-[40px] border border-white/5 group-hover:border-gold/10 transition-all duration-700">
                               <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Chronological mandate</span>
                               <div className="flex justify-center flex-col items-center gap-4">
                                   <div className="text-4xl font-black text-white font-display italic tracking-tight group-hover:scale-105 transition-transform duration-700">{exam.importantDates.examDate}</div>
                                   <div className="h-0.5 w-12 bg-gold/20 rounded-full group-hover:w-20 transition-all duration-700"></div>
                               </div>
                               <div className="flex items-center gap-3 text-white/30 font-black text-[9px] uppercase tracking-[0.3em] bg-white/5 px-6 py-3 rounded-full border border-white/5 group-hover:text-gold group-hover:border-gold/20 transition-all duration-500">
                                   <Calendar className="w-4 h-4" />
                                   <span>Frequency: {exam.frequency}</span>
                               </div>
                             </div>

                             <div className="lg:col-span-6 xl:col-span-3 flex flex-col gap-5">
                               <Link
                                   to={`/exam/${exam.slug}`}
                                   className="btn-gold w-full flex items-center justify-center gap-4 py-6"
                               >
                                   <span className="text-[11px]">ACCESS INTEL</span>
                                   <ArrowRight className="w-4 h-4" />
                               </Link>
                               <button className="w-full py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-2xl active:scale-95 flex items-center justify-center gap-4 group/btn">
                                   <Bell className="w-4 h-4 group-hover/btn:animate-bounce" />
                                   MANDATE ALERT
                               </button>
                             </div>
                         </div>
                       </motion.div>
                     );
                   })}

                   {upcomingExamsList.length === 0 && (
                     <div className="premium-glass rounded-[48px] p-40 text-center border-white/10 relative overflow-hidden">
                       <div className="absolute -inset-1 bg-gold/5 blur-3xl -z-10"></div>
                       <h3 className="text-4xl font-black text-white mb-4 font-display italic">No active mandates</h3>
                       <p className="text-white/30 font-medium uppercase text-xs tracking-[0.3em] leading-relaxed">Stay secure. New intelligence transmissions pending.</p>
                       <div className="mt-12 w-20 h-1 bg-gold/20 rounded-full mx-auto animate-pulse"></div>
                     </div>
                   )}
                 </>
            )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingExams;
