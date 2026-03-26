import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, ChevronDown, SlidersHorizontal, BookOpen, Clock, Users } from 'lucide-react';
import { useExams, useCategories } from '../hooks/useSupabaseData';
import ExamCard from '../components/ExamCard';
import { ExamLevel, ExamStatus, Eligibility } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/helpers';

const ExamsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { exams, loading: examsLoading } = useExams();
  const { categories: dataCategories, loading: catsLoading } = useCategories();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || 'All');
  const [levelFilter, setLevelFilter] = useState<ExamLevel | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<ExamStatus | 'All'>('All');
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('All');

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    if (searchParams.get('category')) setCategoryFilter(searchParams.get('category') as any);
  }, [searchParams]);

  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exam.conductingBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exam.shortName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || exam.categoryId === categoryFilter;
      const matchesLevel = levelFilter === 'All' || exam.level === levelFilter;
      const matchesStatus = statusFilter === 'All' || exam.status === statusFilter;
      
      const matchesEligibility = eligibilityFilter === 'All' || 
                                 exam.eligibility.education.toLowerCase().includes(eligibilityFilter.toLowerCase());

      return matchesSearch && matchesCategory && matchesLevel && matchesStatus && matchesEligibility;
    });
  }, [exams, searchQuery, categoryFilter, levelFilter, statusFilter, eligibilityFilter]);

  const levels: ExamLevel[] = ['National', 'State', 'University', 'International'];
  const statuses: ExamStatus[] = ['upcoming', 'ongoing', 'completed'];
  const eligibilities = ['Graduate', '12th', '10th', 'Degree'];

  const clearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setLevelFilter('All');
    setStatusFilter('All');
    setEligibilityFilter('All');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-32 pb-24 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 relative">
           <div className="absolute -top-10 left-0 w-64 h-64 bg-gold/5 blur-[100px] -z-10"></div>
           <span className="text-gold font-black text-xs uppercase tracking-[0.4em] mb-4 block">Elite Database</span>
           <h1 className="text-6xl md:text-8xl font-black text-white mb-10 leading-[1] tracking-tighter font-display italic">
             Global Intelligence <span className="gold-gradient-text">Repository</span>
           </h1>
           <p className="text-white/40 font-medium text-lg max-w-2xl">Access precise information for over 30,000+ prestigious opportunities across India.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 space-y-10 sticky top-36 h-fit">
             <div className="bg-black-charcoal p-10 rounded-[40px] border border-white/5 shadow-2xl">
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                   <h3 className="font-black text-white flex items-center gap-3 uppercase text-xs tracking-widest">
                     <SlidersHorizontal className="w-4 h-4 text-gold" />
                     Filters
                   </h3>
                   <button onClick={clearFilters} className="text-[10px] font-black text-gold uppercase tracking-widest hover:text-white transition-colors">Reset</button>
                </div>

                <div className="space-y-10">
                   <div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-6">Master Domain</span>
                      <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-3 scrollbar-hide">
                        <button
                          onClick={() => setCategoryFilter('All')}
                          className={cn("px-5 py-3.5 rounded-2xl text-left text-xs font-black uppercase tracking-widest transition-all border", categoryFilter === 'All' ? "bg-gold text-black border-gold shadow-lg shadow-gold/20" : "bg-white/5 text-white/40 border-white/5 hover:border-gold/30 hover:text-gold")}
                        >
                          All Categories
                        </button>
                        {dataCategories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setCategoryFilter(cat.id)}
                            className={cn("px-5 py-3.5 rounded-2xl text-left text-xs font-black uppercase tracking-widest transition-all border", categoryFilter === cat.id ? "bg-gold text-black border-gold shadow-lg shadow-gold/20" : "bg-white/5 text-white/40 border-white/5 hover:border-gold/30 hover:text-gold")}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-6">Prestigious Level</span>
                      <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value as any)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-black text-white/60 uppercase tracking-widest focus:ring-1 focus:ring-gold outline-none appearance-none cursor-pointer transition-all"
                      >
                         <option value="All" className="bg-black-charcoal">All Levels</option>
                         {levels.map(l => <option key={l} value={l} className="bg-black-charcoal">{l}</option>)}
                      </select>
                   </div>

                   <div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-6">Portal Status</span>
                      <div className="flex flex-wrap gap-2">
                        {['All', ...statuses].map(s => (
                          <button
                            key={s}
                            onClick={() => setStatusFilter(s as any)}
                            className={cn("px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border", statusFilter === s ? "bg-gold text-black border-gold shadow-lg shadow-gold/10" : "bg-white/5 text-white/40 border-white/10 hover:border-gold/30 hover:text-gold")}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-6">Credentials</span>
                      <div className="grid grid-cols-1 gap-1">
                        {['All', ...eligibilities].map(e => (
                           <label key={e} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 cursor-pointer group transition-all border border-transparent hover:border-white/5">
                              <input
                                type="radio"
                                name="eligibility"
                                checked={eligibilityFilter === e}
                                onChange={() => setEligibilityFilter(e)}
                                className="w-4 h-4 text-gold bg-white/5 border-white/10 focus:ring-gold"
                              />
                               <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", eligibilityFilter === e ? "text-gold" : "text-white/30 group-hover:text-white")}>
                                {e === 'All' ? 'Any Qualification' : e}
                              </span>
                           </label>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
             <div className="mb-12 flex flex-col md:flex-row gap-6">
                <div className="relative flex-grow group">
                   <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none text-white/20 group-focus-within:text-gold transition-colors">
                      <Search className="w-5 h-5" />
                   </div>
                   <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search intelligence database..."
                    className="w-full bg-white/5 border border-white/10 rounded-[32px] pl-20 pr-10 py-5 text-sm font-black tracking-widest placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-gold/20 shadow-2xl transition-all group-focus-within:bg-white/10 uppercase"
                   />
                </div>
                <div className="flex gap-4">
                   <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-4 bg-white/5 border border-white/10 rounded-[32px] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-gold hover:text-black transition-all"
                   >
                     <Filter className="w-4 h-4 text-gold" />
                     Filters
                   </button>
                   <div className="bg-white/5 border border-white/10 rounded-[32px] px-8 py-5 flex items-center gap-4 text-xs font-black text-white/30 tracking-widest shadow-2xl transition-all hover:bg-white/10">
                      <span className="text-gold italic font-black text-lg">{filteredExams.length}</span> <span className="uppercase">Entities</span>
                   </div>
                </div>
             </div>

             {examsLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[500px] bg-white/5 border border-white/10 rounded-[40px] animate-pulse"></div>
                  ))}
               </div>
             ) : (
                <>
                  {filteredExams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                      <AnimatePresence mode='popLayout'>
                        {filteredExams.map((exam) => (
                            <motion.div
                              layout
                              key={exam.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="antigravity-card rounded-[40px]"
                            >
                              <ExamCard exam={exam} />
                            </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="premium-glass rounded-[40px] p-24 text-center border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-gold/5 blur-3xl -z-10"></div>
                      <div className="w-24 h-24 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-10 text-gold shadow-2xl">
                          <Search className="w-10 h-10" />
                      </div>
                      <h3 className="text-4xl font-black text-white mb-4 font-display italic">No matches found</h3>
                      <p className="text-white/30 font-medium mb-12 max-w-sm mx-auto uppercase text-xs tracking-[0.2em] leading-relaxed">The entity you seek is not in our current high-priority database.</p>
                      <button onClick={clearFilters} className="btn-gold">Reset Database</button>
                    </div>
                  )}
                </>
             )}
          </main>
        </div>
      </div>

       {/* Mobile Sidebar Overlay */}
       <AnimatePresence>
         {isSidebarOpen && (
           <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-[90%] max-w-sm bg-black-deep z-[70] lg:hidden overflow-y-auto p-12 border-l border-white/10"
            >
               <div className="flex justify-between items-center mb-16">
                  <h3 className="text-3xl font-black text-white font-display">Filters</h3>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-gold hover:text-black transition-all"><X className="w-6 h-6" /></button>
               </div>
               <div className="space-y-12">
                 <div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] block mb-8">Intelligence Domains</span>
                    <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => { setCategoryFilter('All'); setIsSidebarOpen(false); }}
                          className={cn("w-full px-8 py-5 rounded-[24px] text-left text-xs font-black uppercase tracking-widest transition-all", categoryFilter === 'All' ? "bg-gold text-black" : "bg-white/5 text-white/40 border border-white/5")}
                        >
                          All Categories
                        </button>
                       {dataCategories.map(c => (
                         <button
                           key={c.id}
                           onClick={() => { setCategoryFilter(c.id); setIsSidebarOpen(false); }}
                           className={cn("w-full px-8 py-5 rounded-[24px] text-left text-xs font-black uppercase tracking-widest transition-all", categoryFilter === c.id ? "bg-gold text-black" : "bg-white/5 text-white/40 border border-white/5")}
                         >
                           {c.name}
                         </button>
                       ))}
                    </div>
                 </div>
               </div>
            </motion.div>
           </>
         )}
       </AnimatePresence>
    </div>
  );
};

export default ExamsPage;
