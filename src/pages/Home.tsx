import React, { useState } from 'react';
import { Search, TrendingUp, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useExams, useCategories } from '../hooks/useSupabaseData';
import ExamCard from '../components/ExamCard';
import CategoryCard from '../components/CategoryCard';
import { useNavigate } from 'react-router-dom';
import Testimonials from '../components/Testimonials';

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
    <div className="flex flex-col min-h-screen bg-transparent text-white">
      {/* Breaking News Ticker */}
      <div className="fixed top-24 left-0 right-0 z-40 bg-black/60 backdrop-blur-3xl border-y border-white/5 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[
            "UPSC Civil Services 2024 Prelims Results Out!",
            "SSC CGL Tier-II Exam Dates Announced",
            "New IBPS PO Vacancies Released",
            "Admit Cards for JEE Main Session 2 Available Now",
            "Registration Open for CAT 2024",
            "GATE 2024 Answer Key Released",
            "RBI Grade B Notification Expected Soon"
          ].map((news, i) => (
            <div key={i} className="flex items-center gap-6 mx-12">
              <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,1)] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 hover:text-gold transition-colors cursor-pointer">{news}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-56 pb-32 lg:pt-80 lg:pb-48 overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gold/5 blur-[180px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-5xl mx-auto space-y-12">
             <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 text-gold border border-white/10 font-black text-[10px] uppercase tracking-[0.5em] mb-4 backdrop-blur-xl shadow-2xl"
             >
                <div className="w-2 h-2 rounded-full bg-gold animate-ping"></div>
                Join 5 Million+ Aspirants
             </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter font-display"
            >
              Master Your <br />
              <span className="gold-gradient-text italic tracking-tighter">
                Successful Path
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/30 font-medium max-w-3xl mx-auto leading-relaxed font-sans"
            >
              The definitive intelligence repository for India's most prestigious competitive examinations. Precision data, real-time mandates, and elite preparation assets.
            </motion.p>

            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative max-w-4xl mx-auto mt-20 bg-white/5 backdrop-blur-3xl p-3 rounded-[32px] border border-white/10 flex flex-col md:flex-row items-center gap-4 group focus-within:border-gold/40 transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] animate-float"
            >
              <div className="absolute -inset-1 bg-gold/10 blur-2xl rounded-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 -z-10"></div>
              
              <div className="flex items-center flex-grow w-full px-6">
                <Search className="w-7 h-7 text-white/20 group-focus-within:text-gold transition-colors duration-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Analyze premium exams, domains, or authorities..."
                  className="w-full py-6 px-6 bg-transparent border-none focus:outline-none text-white font-medium placeholder:text-white/10 text-lg"
                />
              </div>
              <button
                type="submit"
                className="btn-gold w-full md:w-auto px-16 py-6 text-sm"
              >
                INITIALIZE SEARCH
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mt-16"
            >
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mr-6 self-center">Operational Domains:</span>
              {['UPSC', 'SSC CGL', 'IBPS PO', 'JEE MAIN', 'NEET', 'CAT'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-8 py-3.5 rounded-2xl bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] border border-white/5 hover:border-gold hover:text-gold transition-all duration-500 hover:bg-gold/5 group"
                >
                  <span className="group-hover:scale-110 inline-block transition-transform">{tag}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 bg-black-charcoal relative">
        <div className="absolute inset-0 bg-gold/[0.02] -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-gold font-black text-xs uppercase tracking-[0.4em] block">Elite Disciplines</span>
              <h2 className="text-5xl font-black text-white">Global Categories</h2>
            </div>
            <button 
              onClick={() => navigate('/exams')}
              className="flex items-center gap-3 text-white/50 font-black text-xs uppercase tracking-[0.3em] group hover:text-gold transition-colors"
            >
              Explore Full Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all" />
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
                 <div key={i} className="h-48 bg-white/5 rounded-3xl animate-pulse border border-white/10"></div>
               ))
            ) : (
                categories.slice(0, 10).map((cat) => (
                  <motion.div key={cat.id} variants={itemVariants} className="antigravity-card p-1 rounded-3xl">
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
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-gold font-black text-xs uppercase tracking-[0.4em] block">Prestigious Opportunities</span>
              <h2 className="text-5xl font-black text-white">Premier Examinations</h2>
            </div>
            <button
               onClick={() => navigate('/exams')}
               className="btn-outline-gold"
            >
              Browse All
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {examsLoading ? (
               [...Array(3)].map((_, i) => (
                 <div key={i} className="h-[500px] bg-white/5 rounded-[40px] animate-pulse border border-white/10"></div>
               ))
            ) : (
                featuredExams.map((exam) => (
                  <motion.div key={exam.id} variants={itemVariants} className="antigravity-card rounded-[40px]">
                    <ExamCard exam={exam} />
                  </motion.div>
                ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-40 bg-black-deep relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-gold/[0.03] blur-[150px] rounded-full -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="space-y-12 relative">
                <div className="space-y-6">
                   <span className="text-gold font-black text-xs uppercase tracking-[0.4em] block">The Gold Standard</span>
                   <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight font-sans">Operational <span className="gold-gradient-text tracking-tight">Roadmap</span></h1>
                </div>

                <div className="grid gap-10">
                  {[
                    { icon: ShieldCheck, title: 'Elite Veracity', desc: 'Sourced from strictly official government gazettes and notifications.' },
                    { icon: Zap, title: 'Velocity Updates', desc: 'Ultra-low latency notification system for real-time exam intelligence.' },
                    { icon: Globe, title: 'Universal Domain', desc: 'Exhaustive coverage from local state boards to international fellowships.' },
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-8 items-start group">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-500 shadow-xl group-hover:shadow-gold/20">
                        <feature.icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-2xl text-white group-hover:text-gold transition-colors">{feature.title}</h4>
                        <p className="text-white/40 font-medium leading-relaxed text-lg">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
               <div className="absolute inset-0 bg-gold/5 rounded-[40px] transform rotate-3 scale-105 -z-10 group-hover:rotate-0 transition-all duration-700"></div>
               <div className="premium-glass rounded-[40px] border border-white/10 relative overflow-hidden h-full flex flex-col justify-end min-h-[500px]">
                  <img src="/students-studying.png" alt="Dedicated students studying" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-1000 z-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0"></div>
                  
                  <div className="grid grid-cols-2 gap-6 relative z-10 p-10">
                     <div className="p-6 rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all hover:bg-black/70">
                        <span className="text-4xl font-black gold-gradient-text italic">30k+</span>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mt-2">Active Portals</p>
                     </div>
                     <div className="p-6 rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all translate-y-8 hover:bg-black/70">
                        <span className="text-4xl font-black gold-gradient-text italic">5M+</span>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mt-2">Aspirants</p>
                     </div>
                     <div className="p-6 rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all hover:bg-black/70">
                        <span className="text-4xl font-black gold-gradient-text italic">200+</span>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mt-2">Domains</p>
                     </div>
                     <div className="p-6 rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-gold/50 transition-all translate-y-8 hover:bg-black/70">
                        <span className="text-4xl font-black gold-gradient-text italic">24/7</span>
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mt-2">Live Intell</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default Home;
