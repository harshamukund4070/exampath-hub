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
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12">
           <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Browse All Examinations</h1>
           <p className="text-gray-500 font-medium">Explore over 30,000+ opportunities across all sectors in India.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 space-y-8 sticky top-32 h-fit">
             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="font-bold text-gray-900 flex items-center gap-2">
                     <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                     Filters
                   </h3>
                   <button onClick={clearFilters} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Clear All</button>
                </div>

                <div className="space-y-8">
                   <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Category</span>
                      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                        <button
                          onClick={() => setCategoryFilter('All')}
                          className={cn("px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-all", categoryFilter === 'All' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-gray-50 text-gray-600 hover:bg-blue-50")}
                        >
                          All Categories
                        </button>
                        {dataCategories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setCategoryFilter(cat.id)}
                            className={cn("px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-all", categoryFilter === cat.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-gray-50 text-gray-600 hover:bg-blue-50")}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Exam Level</span>
                      <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value as any)}
                        className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none appearance-none cursor-pointer"
                      >
                         <option value="All">All Levels</option>
                         {levels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                   </div>

                   <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Status</span>
                      <div className="flex flex-wrap gap-2">
                        {['All', ...statuses].map(s => (
                          <button
                            key={s}
                            onClick={() => setStatusFilter(s as any)}
                            className={cn("px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border", statusFilter === s ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10" : "bg-white text-gray-500 border-gray-100 hover:border-blue-600 hover:text-blue-600")}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Eligibility</span>
                      <div className="grid grid-cols-1 gap-2">
                        {['All', ...eligibilities].map(e => (
                           <label key={e} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors">
                              <input
                                type="radio"
                                name="eligibility"
                                checked={eligibilityFilter === e}
                                onChange={() => setEligibilityFilter(e)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                              />
                               <span className={cn("text-sm font-semibold transition-colors", eligibilityFilter === e ? "text-blue-600" : "text-gray-600 group-hover:text-gray-900")}>
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
             <div className="mb-8 flex flex-col md:flex-row gap-6">
                <div className="relative flex-grow group">
                   <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <Search className="w-5 h-5" />
                   </div>
                   <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Quick search by name or body..."
                    className="w-full bg-white border border-gray-100 rounded-2xl pl-16 pr-6 py-4.5 text-sm font-bold placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-sm transition-all shadow-blue-500/5 group-focus-within:border-blue-100 placeholder:font-semibold"
                   />
                </div>
                <div className="flex gap-4">
                   <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest text-gray-900 hover:bg-blue-50 transition-colors"
                   >
                     <Filter className="w-4 h-4 text-blue-600" />
                     Filters
                   </button>
                   <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 flex items-center gap-3 text-sm font-bold text-gray-500 shadow-sm whitespace-nowrap">
                      <span className="text-blue-600 font-black">{filteredExams.length}</span> Results Found
                   </div>
                </div>
             </div>

             {examsLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-[450px] bg-white rounded-[40px] animate-pulse"></div>
                  ))}
               </div>
             ) : (
                <>
                  {filteredExams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      <AnimatePresence mode='popLayout'>
                        {filteredExams.map((exam) => (
                            <motion.div
                              layout
                              key={exam.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ExamCard exam={exam} />
                            </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                          <Search className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-2">No exams match your search</h3>
                      <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
                      <button onClick={clearFilters} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">Clear All Filters</button>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[70] lg:hidden overflow-y-auto p-10"
            >
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black text-gray-900">Filters</h3>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-gray-50 rounded-xl text-gray-900"><X className="w-6 h-6" /></button>
               </div>
               <div className="space-y-10">
                 <div>
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest block mb-6">Category</span>
                    <div className="grid grid-cols-1 gap-2">
                        <button
                          onClick={() => { setCategoryFilter('All'); setIsSidebarOpen(false); }}
                          className={cn("w-full px-6 py-4 rounded-2xl text-left text-sm font-bold transition-all", categoryFilter === 'All' ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-900")}
                        >
                          All Categories
                        </button>
                       {dataCategories.map(c => (
                         <button
                           key={c.id}
                           onClick={() => { setCategoryFilter(c.id); setIsSidebarOpen(false); }}
                           className={cn("w-full px-6 py-4 rounded-2xl text-left text-sm font-bold transition-all", categoryFilter === c.id ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-900")}
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
