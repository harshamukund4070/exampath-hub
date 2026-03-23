import React, { useState } from 'react';
import { Search, TrendingUp, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExams, useCategories } from '../hooks/useSupabaseData';
import ExamCard from '../components/ExamCard';
import CategoryCard from '../components/CategoryCard';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { exams, loading: examsLoading } = useExams();
  const { categories, loading: catsLoading } = useCategories();

  const featuredExams = exams.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/exams?search=${searchQuery}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10 -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-8">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-100/50 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4"
             >
                <TrendingUp className="w-4 h-4" />
                Join 5 Million+ Aspirants
             </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight"
            >
              Master Your Path To <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Success
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              One-stop portal for all government, competitive and professional examinations in India. Real-time updates, syllabus, and preparation guides.
            </motion.p>

            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-2xl mx-auto mt-12 bg-white p-2.5 rounded-3xl shadow-2xl shadow-blue-500/10 border border-gray-100 flex items-center gap-2 group focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-300"
            >
              <div className="pl-6 text-gray-400 group-focus-within:text-blue-600">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams, categories, or conducting body..."
                className="flex-grow py-4 px-4 bg-transparent border-none focus:outline-none text-gray-900 font-semibold placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
              >
                Search
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 self-center">Popular:</span>
              {['UPSC', 'SSC CGL', 'IBPS PO', 'JEE Main', 'NEET', 'CAT'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-5 py-2 rounded-xl bg-white/50 text-gray-600 font-bold text-xs border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all hover:bg-white"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Diverse Domains</span>
              <h2 className="text-4xl font-black text-gray-900">Explore by Category</h2>
            </div>
            <button 
              onClick={() => navigate('/exams')}
              className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group"
            >
              View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all" />
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {catsLoading ? (
               [...Array(10)].map((_, i) => (
                 <div key={i} className="h-40 bg-gray-50 rounded-2xl animate-pulse"></div>
               ))
            ) : (
                categories.slice(0, 10).map((cat) => (
                  <motion.div key={cat.id} variants={itemVariants}>
                    <CategoryCard
                      category={cat.name as any}
                      count={cat.examCount}
                      onClick={() => navigate(`/exams?category=${cat.id}`)}
                    />
                  </motion.div>
                ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Exams Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Top Opportunities</span>
              <h2 className="text-4xl font-black text-gray-900">Featured Examinations</h2>
            </div>
            <button
               onClick={() => navigate('/exams')}
               className="bg-white px-8 py-3.5 rounded-2xl border border-gray-200 text-gray-900 font-black text-sm uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
            >
              Browse All
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {examsLoading ? (
               [...Array(3)].map((_, i) => (
                 <div key={i} className="h-[450px] bg-white rounded-[40px] animate-pulse"></div>
               ))
            ) : (
                featuredExams.map((exam) => (
                  <motion.div key={exam.id} variants={itemVariants}>
                    <ExamCard exam={exam} />
                  </motion.div>
                ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full"></div>
              <div className="space-y-10 relative">
                <div>
                   <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Why ExamPath?</span>
                   <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Your Complete Career <br /> Navigation System</h2>
                </div>

                <div className="grid gap-8">
                  {[
                    { icon: ShieldCheck, title: 'Verified Accuracy', desc: 'Every data point is cross-verified with official government notifications.' },
                    { icon: Zap, title: 'Instant Notifications', desc: 'Be the first to know about release dates, vacancies and results.' },
                    { icon: Globe, title: 'Universal Coverage', desc: 'From state police to international certifications, find everything here.' },
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-blue-600/5 rounded-3xl transform rotate-3 scale-105 -z-10 group-hover:rotate-0 transition-transform"></div>
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl relative">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 rounded-2xl bg-blue-50/50 space-y-2">
                        <span className="text-3xl font-black text-blue-600">30k+</span>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Exams</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-indigo-50/50 space-y-2 translate-y-8">
                        <span className="text-3xl font-black text-indigo-600">5M+</span>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Aspirants</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-teal-50/50 space-y-2">
                        <span className="text-3xl font-black text-teal-600">200+</span>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Categories</p>
                     </div>
                     <div className="p-6 rounded-2xl bg-rose-50/50 space-y-2 translate-y-8">
                        <span className="text-3xl font-black text-rose-600">24/7</span>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Updates</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
