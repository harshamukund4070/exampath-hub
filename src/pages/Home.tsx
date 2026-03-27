import React, { useState } from 'react';
import { Search, TrendingUp, ArrowRight, ShieldCheck, Zap, Globe, Sparkles, Crown, Award } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen text-white">
      {/* Breaking News Ticker - Enhanced */}
      <div className="absolute top-24 left-0 right-0 z-40 bg-black/60 backdrop-blur-3xl border-y border-white/5 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[
            "🏆 UPSC Civil Services 2024 Prelims Results Out!",
            "⚡ SSC CGL Tier-II Exam Dates Announced",
            "💰 New IBPS PO Vacancies Released",
            "📢 Admit Cards for JEE Main Session 2 Available Now",
            "🎯 Registration Open for CAT 2024",
            "📊 GATE 2024 Answer Key Released",
            "📋 RBI Grade B Notification Expected Soon"
          ].map((news, i) => (
            <div key={i} className="flex items-center gap-6 mx-12 group cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,1)] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-gold transition-all duration-500">{news}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gold/5 blur-[180px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 blur-[100px] rounded-full -z-10"></div>

        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-5xl mx-auto flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-white/5 to-transparent border border-white/10 font-black text-[10px] uppercase tracking-[0.5em] mb-4 backdrop-blur-xl shadow-2xl hover:border-gold/30 transition-all duration-500"
            >
              <div className="w-2 h-2 rounded-full bg-gold animate-ping"></div>
              <span className="text-gold">Join 5 Million+ Aspirants</span>
              <Sparkles className="w-3 h-3 text-gold" />
            </motion.div>

            <div className="animate-float-hero">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter font-['Playfair_Display'] animate-color-glow py-4"
              >
                Master Your <br />
                <span className="italic tracking-tighter gold-gradient-text bg-clip-text">
                  Successful Path
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="subtitle-text text-lg md:text-xl text-white/80 font-['Inter'] font-light max-w-3xl mx-auto leading-relaxed tracking-normal"
            >
              The definitive intelligence repository for India's most prestigious competitive examinations.
              <span className="block mt-2 text-gold/60 text-sm">Precision data • Real-time mandates • Elite preparation assets</span>
            </motion.p>

            <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative max-w-4xl mx-auto mt-20 bg-white/5 backdrop-blur-3xl p-3 rounded-[32px] border border-white/10 flex flex-col md:flex-row items-center gap-4 group focus-within:border-gold/40 transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/10 to-transparent blur-2xl rounded-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 -z-10"></div>

              <div className="flex items-center flex-grow w-full px-6">
                <Search className="w-7 h-7 text-white/20 group-focus-within:text-gold transition-colors duration-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Analyze premium exams, domains, or authorities..."
                  className="w-full py-6 px-6 bg-transparent border-none focus:outline-none text-white font-medium placeholder:text-white/10 text-lg font-['Inter']"
                />
              </div>
              <button
                type="submit"
                className="btn-gold w-full md:w-auto px-16 py-6 text-sm relative overflow-hidden group"
              >
                <span className="relative z-10">INITIALIZE SEARCH</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mt-16"
            >
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mr-6 self-center flex items-center gap-2">
                <Crown className="w-3 h-3 text-gold" />
                Operational Domains:
              </span>
              {['UPSC', 'SSC CGL', 'IBPS PO', 'JEE MAIN', 'NEET', 'CAT'].map((tag, idx) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-8 py-3.5 rounded-2xl bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-[0.3em] border border-white/5 hover:border-gold hover:text-gold transition-all duration-500 hover:bg-gold/5 hover:scale-105 transform"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="hover:scale-110 inline-block transition-transform">{tag}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section - Enhanced */}
      <section className="py-20 bg-black-charcoal/40 backdrop-blur-md relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-gold rounded-full"></div>
                <span className="text-gold font-black text-xs uppercase tracking-[0.4em] block">Elite Disciplines</span>
              </div>
              <h2 className="section-title text-5xl md:text-6xl font-bold font-['Playfair_Display']">
                Global Categories
              </h2>
              <p className="text-white/40 text-sm font-light max-w-xl">
                Explore our comprehensive collection of examination domains
              </p>
            </div>
            <button
              onClick={() => navigate('/exams')}
              className="flex items-center gap-3 text-white/50 font-black text-xs uppercase tracking-[0.3em] group hover:text-gold transition-all duration-500"
            >
              Explore Full Catalog
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {catsLoading ? (
              [...Array(10)].map((_, i) => (
                <div key={i} className="h-48 bg-gradient-to-br from-white/5 to-transparent rounded-3xl animate-pulse border border-white/10"></div>
              ))
            ) : (
              categories.slice(0, 10).map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  variants={itemVariants}
                  className="antigravity-card p-1 rounded-3xl group"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
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

      {/* Featured Exams Section - Enhanced */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <span className="text-gold font-black text-xs uppercase tracking-[0.4em] block">Prestigious Opportunities</span>
              </div>
              <h2 className="section-title text-5xl md:text-6xl font-bold font-['Playfair_Display']">
                Premier Examinations
              </h2>
              <p className="text-white/40 text-sm font-light">
                Curated selection of India's most competitive exams
              </p>
            </div>
            <button
              onClick={() => navigate('/exams')}
              className="btn-outline-gold relative overflow-hidden group"
            >
              <span className="relative z-10">Browse All</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {examsLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-[500px] bg-gradient-to-br from-white/5 to-transparent rounded-[40px] animate-pulse border border-white/10"></div>
              ))
            ) : (
              featuredExams.map((exam, idx) => (
                <motion.div
                  key={exam.id}
                  variants={itemVariants}
                  className="antigravity-card rounded-[40px] group"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ExamCard exam={exam} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="py-24 bg-black-deep/40 backdrop-blur-md relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-gold/[0.03] blur-[150px] rounded-full -z-10"></div>
        <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-purple-500/[0.02] blur-[120px] rounded-full -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="space-y-12 relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-gold"></div>
                    <span className="text-gold font-black text-xs uppercase tracking-[0.4em] block">The Gold Standard</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight font-['Playfair_Display']">
                    Operational <span className="gold-gradient-text bg-clip-text">Roadmap</span>
                  </h1>
                  <p className="text-white/40 text-lg font-light leading-relaxed">
                    Setting the benchmark for competitive exam preparation with cutting-edge technology and verified data
                  </p>
                </div>

                <div className="grid gap-10">
                  {[
                    { icon: ShieldCheck, title: 'Elite Veracity', desc: 'Sourced from strictly official government gazettes and notifications.', color: 'from-gold/20 to-transparent' },
                    { icon: Zap, title: 'Velocity Updates', desc: 'Ultra-low latency notification system for real-time exam intelligence.', color: 'from-blue-500/20 to-transparent' },
                    { icon: Globe, title: 'Universal Domain', desc: 'Exhaustive coverage from local state boards to international fellowships.', color: 'from-green-500/20 to-transparent' },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-8 items-start group cursor-pointer"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-gold group-hover:to-gold-dark group-hover:text-black group-hover:border-gold transition-all duration-500 shadow-xl group-hover:shadow-gold/20">
                        <feature.icon className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-2xl text-white group-hover:text-gold transition-colors font-['Playfair_Display']">{feature.title}</h4>
                        <p className="text-white/40 font-medium leading-relaxed text-lg">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent rounded-[40px] transform rotate-2 scale-105 -z-10 group-hover:rotate-0 transition-all duration-700"></div>
              <div className="premium-glass p-12 rounded-[40px] border border-white/10 relative overflow-hidden hover:border-gold/30 transition-all duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-3xl rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>
                <div className="grid grid-cols-2 gap-8 relative">
                  {[
                    { value: '30k+', label: 'Active Portals', delay: 0 },
                    { value: '5M+', label: 'Aspirants', delay: 0.1, translate: true },
                    { value: '200+', label: 'Domains', delay: 0.2 },
                    { value: '24/7', label: 'Live Intelligence', delay: 0.3, translate: true }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: stat.delay, duration: 0.5 }}
                      className={`p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 space-y-3 hover:border-gold/30 transition-all duration-500 hover:scale-105 ${stat.translate ? 'lg:translate-y-12' : ''}`}
                    >
                      <span className="text-4xl lg:text-5xl font-black gold-gradient-text bg-clip-text block">{stat.value}</span>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{stat.label}</p>
                    </motion.div>
                  ))}
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