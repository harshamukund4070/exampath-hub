import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar, Briefcase, MapPin, Globe, Award, Info, BookOpen, Clock,
  ArrowRight, Bookmark, Share2, Bell, CheckCircle2, AlertCircle, ChevronDown,
  ChevronUp, Download, ExternalLink, Play, FileText, LayoutList, GraduationCap, Users, ShieldCheck,
  Zap, TrendingUp, BarChart3, Building2, HelpCircle, Shield
} from 'lucide-react';
import { useExam, useCategories, useExams } from '../hooks/useSupabaseData';
import { Exam } from '../types';
import CountdownTimer from '../components/CountdownTimer';
import { cn } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

const ExamDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { exam, loading } = useExam(slug);
  const { categories } = useCategories();
  const { exams: allExams } = useExams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'syllabus' | 'pattern' | 'resources'>('info');
  const [openAccordions, setOpenAccordions] = useState<number[]>([0]);

  useEffect(() => {
    if (exam) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(exam.id));
      window.scrollTo(0, 0);
    }
  }, [exam]);

  const toggleBookmark = () => {
    if (!exam) return;
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

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const category = useMemo(() => {
    if (!exam) return null;
    return categories.find(c => c.id === exam.categoryId);
  }, [exam, categories]);

  const relatedExams = useMemo(() => {
    if (!exam || !allExams.length) return [];
    return allExams.filter(e => exam.relatedExamIds.includes(e.id));
  }, [exam, allExams]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black-deep">
      <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!exam) return (
    <div className="min-h-screen pt-32 text-center bg-black-deep text-white">
      <h2 className="text-3xl font-black font-display italic">Intelligence Missing</h2>
      <p className="text-white/40 mt-4 uppercase tracking-widest text-xs">The requested entity does not exist in our repository.</p>
      <Link to="/exams" className="btn-gold mt-10 inline-block">Return to Database</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black-deep pt-32 pb-40 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-12 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide">
           <Link to="/" className="hover:text-gold transition-colors">Home</Link>
           <ArrowRight className="w-3 h-3" />
           <Link to="/exams" className="hover:text-gold transition-colors">Database</Link>
           <ArrowRight className="w-3 h-3" />
           <span className="hover:text-gold transition-colors">{category?.name || 'Category'}</span>
           <ArrowRight className="w-3 h-3" />
           <span className="text-gold truncate italic">{exam.name}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-black-charcoal p-8 lg:p-16 rounded-[48px] border border-white/5 mb-16 overflow-hidden relative shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="grid lg:grid-cols-2 gap-16 items-center relative">
              <div className="space-y-10">
                 <div className="flex flex-wrap gap-4">
                    <span className="px-5 py-2 rounded-xl bg-gold/10 text-gold font-black text-[10px] uppercase tracking-[0.2em] border border-gold/20">{category?.name}</span>
                    <span className="px-5 py-2 rounded-xl bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-[0.2em] border border-white/10">{exam.level}</span>
                    <span className="px-5 py-2 rounded-xl bg-white/5 text-white/40 font-black text-[10px] uppercase tracking-[0.2em] border border-white/10">{exam.mode}</span>
                 </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1] tracking-tighter font-display italic">
                    {exam.name.split(' ').map((word, i) => i === 0 ? <span key={i}>{word} </span> : <span key={i} className="gold-gradient-text">{word} </span>)}
                  </h1>
                 <p className="text-xl text-white/40 font-medium leading-relaxed max-w-xl">
                   Master Body: <span className="text-white">{exam.conductingBody}</span> <span className="mx-4 text-white/10">|</span> Cycle: <span className="text-white">{exam.frequency}</span>
                 </p>

                 <div className="flex flex-wrap gap-6 pt-6">
                    <button
                      onClick={toggleBookmark}
                      className={cn(
                        "flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95 border",
                        isBookmarked ? "bg-gold text-black border-gold shadow-gold/20" : "bg-white/5 text-white border-white/10 hover:border-gold hover:text-gold"
                      )}
                    >
                       <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
                       {isBookmarked ? 'SECURED' : 'SECURE INTEL'}
                    </button>
                    <button className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-2xl hover:bg-gold active:scale-95">
                       <Bell className="w-5 h-5" />
                       MANDATE ALERT
                    </button>
                    <button className="p-5 bg-white/5 rounded-2xl text-white hover:text-gold border border-white/10 hover:border-gold transition-all">
                       <Share2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <div className="bg-black-deep/40 backdrop-blur-xl p-10 rounded-[40px] border border-white/5 space-y-10 shadow-inner group">
                 <div className="flex justify-between items-center mb-6">
                    <span className="font-black text-[10px] text-white/20 uppercase tracking-[0.3em]">Execution Date</span>
                    <div className="flex items-center gap-3 text-gold font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">
                       <Clock className="w-4 h-4" />
                       PRIORITY ALPHA
                    </div>
                 </div>
                 <div className="flex justify-center flex-col items-center gap-6 py-4">
                    <div className="text-5xl font-black text-white font-display tracking-tight">{exam.importantDates.examDate}</div>
                    <div className="h-1 w-20 bg-gold/20 rounded-full group-hover:w-40 transition-all duration-700"></div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Official Intelligence Schedule</span>
                 </div>
                 <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-8">
                    <div>
                       <span className="block text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3">CURRENT STATUS</span>
                       <div className="flex items-center gap-3 text-gold font-black uppercase text-[11px] tracking-widest">
                          <Zap className="w-4 h-4" />
                          <span>{exam.status}</span>
                       </div>
                    </div>
                    <div>
                       <span className="block text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-3">AUTHORITY PORTAL</span>
                       <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 font-black hover:text-gold transition-colors text-[11px] tracking-widest">
                          <ExternalLink className="w-4 h-4" />
                          <span>VISIT HUB</span>
                       </a>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-16">
           {/* Left Column: Details & Tabs */}
           <div className="lg:col-span-2 space-y-16">
              <div className="bg-white/5 p-3 rounded-[32px] border border-white/10 flex overflow-x-auto scrollbar-hide backdrop-blur-md">
                 {[
                    { id: 'info', icon: Info, label: 'Analysis' },
                    { id: 'syllabus', icon: BookOpen, label: 'Curriculum' },
                    { id: 'pattern', icon: LayoutList, label: 'Structure' },
                    { id: 'resources', icon: Award, label: 'Assets' },
                 ].map((tab) => (
                    <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id as any)}
                       className={cn(
                          "flex items-center gap-4 px-10 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap flex-grow justify-center",
                          activeTab === tab.id ? "bg-gold text-black shadow-2xl shadow-gold/20" : "text-white/30 hover:text-white hover:bg-white/5"
                       )}
                    >
                       <tab.icon className="w-4 h-4" />
                       {tab.label}
                    </button>
                 ))}
              </div>

              <div className="premium-glass p-12 lg:p-20 rounded-[56px] border-white/5 min-h-[600px] relative overflow-hidden">
                 <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 blur-[100px] -z-10"></div>
                 <AnimatePresence mode="wait">
                    {activeTab === 'info' && (
                       <motion.div
                          key="info"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          className="space-y-20"
                       >
                          <section>
                             <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-6 font-display">
                               <Award className="w-10 h-10 text-gold" />
                               Eligibility Protocols
                             </h2>
                             <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-10 bg-white/5 rounded-[32px] border border-white/10 group hover:border-gold/30 transition-all duration-500">
                                   <div className="flex items-center gap-6 mb-8">
                                      <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-black shadow-2xl transform group-hover:rotate-[10deg] transition-all">
                                         <GraduationCap className="w-7 h-7" />
                                      </div>
                                      <span className="font-black text-[10px] text-gold uppercase tracking-[0.3em]">CREDENTIALS</span>
                                   </div>
                                   <p className="text-white/60 font-medium text-lg leading-relaxed">{exam.eligibility.education}</p>
                                </div>
                                <div className="p-10 bg-white/5 rounded-[32px] border border-white/10 group hover:border-gold/30 transition-all duration-500">
                                   <div className="flex items-center gap-6 mb-8">
                                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-2xl transform group-hover:-rotate-[10deg] transition-all">
                                         <Clock className="w-7 h-7" />
                                      </div>
                                      <span className="font-black text-[10px] text-white/40 uppercase tracking-[0.3em]">AGE RANGE</span>
                                   </div>
                                   <p className="text-white/60 font-medium text-lg leading-relaxed">{exam.eligibility.ageLimit}</p>
                                </div>
                                <div className="p-10 bg-white/5 rounded-[32px] border border-white/10 group hover:border-gold/30 transition-all duration-500">
                                   <div className="flex items-center gap-6 mb-8">
                                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-2xl transform group-hover:rotate-[10deg] transition-all">
                                         <Globe className="w-7 h-7" />
                                      </div>
                                      <span className="font-black text-[10px] text-white/40 uppercase tracking-[0.3em]">CITIZENSHIP</span>
                                   </div>
                                   <p className="text-white/60 font-medium text-lg leading-relaxed">{exam.eligibility.nationality}</p>
                                </div>
                                <div className="p-10 bg-white/5 rounded-[32px] border border-white/10 group hover:border-gold/30 transition-all duration-500">
                                   <div className="flex items-center gap-6 mb-8">
                                      <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-black shadow-2xl transform group-hover:-rotate-[10deg] transition-all">
                                         <Users className="w-7 h-7" />
                                      </div>
                                      <span className="font-black text-[10px] text-gold uppercase tracking-[0.3em]">ALLOCATED SLOTS</span>
                                   </div>
                                   <p className="text-white font-black text-3xl leading-relaxed font-display italic">{exam.vacancies || 'STRICTLY CONFIDENTIAL'}</p>
                                </div>
                             </div>
                          </section>

                          <section>
                             <h2 className="text-4xl font-black text-white mb-12 font-display">Selection Trajectory</h2>
                             <div className="bg-black-charcoal/50 p-12 rounded-[40px] border border-white/5 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl group-hover:w-64 transition-all duration-1000"></div>
                                <p className="text-white/40 font-medium text-lg leading-relaxed mb-10 italic max-w-2xl">"{exam.selectionProcess}"</p>
                                <div className="space-y-5">
                                   {exam.examPattern.stages.map((stage, i) => (
                                      <div key={stage} className="flex items-center gap-6 p-6 bg-white/5 rounded-[24px] border border-white/5 hover:border-gold/20 transition-all duration-500 group/item">
                                         <span className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-black text-sm border border-gold/20 group-hover/item:bg-gold group-hover/item:text-black transition-all">{i + 1}</span>
                                         <span className="font-black text-white/80 uppercase tracking-widest text-xs">{stage}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </section>

                          <section>
                             <h2 className="text-4xl font-black text-white mb-12 font-display">Historical Benchmark</h2>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {exam.cutOff.map((co) => (
                                   <div key={co.category} className="p-8 bg-white/5 border border-white/10 rounded-[32px] text-center group hover:border-gold/40 transition-all">
                                      <span className="block text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">{co.category}</span>
                                      <span className="text-3xl font-black text-white font-display italic group-hover:text-gold transition-colors">{co.marks}</span>
                                   </div>
                                ))}
                             </div>
                          </section>

                          <section>
                             <h2 className="text-4xl font-black text-white mb-12 font-display">Stipend & Compensation</h2>
                             <div className="p-16 rounded-[48px] bg-gradient-to-br from-black-charcoal via-gold/10 to-black-charcoal border border-white/10 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl relative overflow-hidden group">
                                <div className="absolute -inset-1 bg-gold/20 blur opacity-0 group-hover:opacity-20 transition-opacity duration-1000"></div>
                                <span className="text-gold font-black text-[10px] uppercase tracking-[0.5em] mb-2">EXPECTED REMUNERATION</span>
                                <span className="text-4xl lg:text-6xl font-black text-white font-display tracking-tighter">{exam.salaryRange}</span>
                                <div className="h-1 w-20 bg-gold rounded-full group-hover:w-40 transition-all duration-1000"></div>
                             </div>
                          </section>
                       </motion.div>
                    )}

                    {activeTab === 'syllabus' && (
                       <motion.div
                          key="syllabus"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-10"
                       >
                          <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/5">
                             <h2 className="text-4xl font-black text-white font-display">Tactical Curriculum</h2>
                             <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{exam.syllabus.length} DOMAINS</span>
                          </div>
                          <div className="space-y-6">
                             {exam.syllabus.map((section, idx) => (
                                <div key={section.section} className="border border-white/10 rounded-[32px] overflow-hidden hover:border-gold/30 transition-all duration-500">
                                   <button
                                      onClick={() => toggleAccordion(idx)}
                                      className={cn(
                                         "w-full px-10 py-8 flex justify-between items-center transition-all",
                                         openAccordions.includes(idx) ? "bg-white/5" : "bg-transparent hover:bg-white/5"
                                      )}
                                   >
                                      <span className="text-xl font-black text-white font-display italic">{section.section}</span>
                                      {openAccordions.includes(idx) ? <ChevronUp className="w-6 h-6 text-gold" /> : <ChevronDown className="w-6 h-6 text-white/20" />}
                                   </button>
                                   <AnimatePresence>
                                      {openAccordions.includes(idx) && (
                                         <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden"
                                         >
                                            <div className="p-12 bg-black-charcoal/30 grid md:grid-cols-2 gap-6">
                                               {section.topics.map((topic, tIdx) => (
                                                  <div key={tIdx} className="flex gap-5 items-start p-5 rounded-[20px] bg-white/5 group hover:bg-gold/5 transition-colors border border-transparent hover:border-gold/10">
                                                     <div className="w-2.5 h-2.5 rounded-full bg-gold mt-2 flex-shrink-0 animate-glow"></div>
                                                     <span className="font-bold text-white/60 group-hover:text-white transition-colors uppercase text-[11px] tracking-widest leading-relaxed">{topic}</span>
                                                  </div>
                                               ))}
                                            </div>
                                         </motion.div>
                                      )}
                                   </AnimatePresence>
                                </div>
                             ))}
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'pattern' && (
                       <motion.div
                          key="pattern"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-16"
                       >
                          <h2 className="text-4xl font-black text-white font-display">Structural Intelligence</h2>
                          <div className="grid gap-12">
                             <div className="p-12 rounded-[48px] bg-white/5 border border-white/10 space-y-12 backdrop-blur-3xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30"></div>
                                <div className="grid md:grid-cols-2 gap-16">
                                   <div className="space-y-6">
                                      <span className="font-black text-[10px] text-gold uppercase tracking-[0.4em] block">PROTOCOL: MARKING</span>
                                      <p className="text-2xl font-black text-white leading-relaxed font-display italic">{exam.examPattern.markingScheme}</p>
                                   </div>
                                   <div className="space-y-6">
                                      <span className="font-black text-[10px] text-white/30 uppercase tracking-[0.4em] block">PROTOCOL: DURATION</span>
                                      <p className="text-2xl font-black text-white leading-relaxed font-display italic">{exam.examPattern.duration}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-6 p-8 bg-black-deep/50 rounded-[32px] border border-white/5">
                                  <ShieldCheck className={cn("w-8 h-8", exam.examPattern.negativeMarking ? "text-gold" : "text-white/20")} />
                                  <span className="font-black text-white/60 uppercase tracking-[0.2em] text-xs">
                                    PENALTY SYSTEM: <span className={cn("text-white", exam.examPattern.negativeMarking ? "text-gold" : "text-white/40")}>{exam.examPattern.negativeMarking ? 'ACTIVE' : 'DEACTIVATED'}</span>
                                  </span>
                                </div>
                             </div>

                             <div className="bg-gold/5 p-12 rounded-[48px] border border-gold/10 flex items-start gap-10 group hover:bg-gold/10 transition-all duration-700">
                                <div className="w-16 h-16 rounded-3xl bg-gold flex items-center justify-center text-black flex-shrink-0 shadow-2xl transform group-hover:scale-110 transition-all">
                                   <HelpCircle className="w-8 h-8" />
                                </div>
                                <div className="space-y-6">
                                   <h4 className="text-2xl font-black text-white font-display italic tracking-tight">Core Competencies</h4>
                                   <div className="flex flex-wrap gap-4">
                                     {exam.examPattern.subjects.map(s => (
                                       <span key={s} className="px-6 py-3 bg-black-deep/50 rounded-2xl text-[10px] font-black text-gold border border-gold/20 uppercase tracking-widest">{s}</span>
                                     ))}
                                   </div>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                    )}

                    {activeTab === 'resources' && (
                       <motion.div
                          key="resources"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="space-y-20"
                       >
                          <div>
                             <h2 className="text-4xl font-black text-white mb-12 font-display">Intellectual Archives</h2>
                             <div className="grid gap-6">
                                {exam.resources.books.map((book, i) => (
                                   <div key={i} className="flex items-center gap-8 p-8 rounded-[32px] bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white shadow-2xl transition-all group cursor-pointer">
                                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold shadow-sm group-hover:bg-black group-hover:text-gold transition-all">
                                         <BookOpen className="w-7 h-7" />
                                      </div>
                                      <span className="font-black text-lg uppercase tracking-widest leading-snug">{book}</span>
                                   </div>
                                ))}
                             </div>
                          </div>

                          <div>
                             <h2 className="text-4xl font-black text-white mb-12 font-display">Transmissions</h2>
                             <div className="grid md:grid-cols-2 gap-8">
                                {exam.resources.youtubeChannels.map((channel) => (
                                   <div key={channel} className="flex flex-col items-center p-12 rounded-[48px] bg-white/5 text-white border border-white/10 group hover:border-gold/40 transition-all duration-500">
                                      <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center shadow-2xl mb-8 group-hover:bg-gold transition-all">
                                         <Play className="w-8 h-8 text-gold group-hover:text-black fill-current" />
                                      </div>
                                      <span className="font-black text-center text-xl font-display italic tracking-tight">{channel}</span>
                                      <span className="text-[10px] font-black text-white/20 mt-4 uppercase tracking-[0.4em]">VERIFIED CHANNEL</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>

           {/* Right Column: Timeline & Related */}
           <div className="space-y-16">
              <section className="bg-black-charcoal p-12 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl"></div>
                 <h3 className="text-3xl font-black text-white mb-12 border-b border-white/5 pb-8 flex items-center gap-5 font-display italic">
                    <Calendar className="w-7 h-7 text-gold" />
                    Operational Log
                 </h3>
                 <div className="space-y-6">
                    {[
                      { label: 'Intelligence Drop', value: exam.importantDates.notification },
                      { label: 'Portal Open', value: exam.importantDates.applicationStart },
                      { label: 'Portal Close', value: exam.importantDates.applicationEnd },
                      { label: 'Examination Phase', value: exam.importantDates.examDate, accent: true },
                      { label: 'Credential Release', value: exam.importantDates.admitCard },
                      { label: 'Outcome Declaration', value: exam.importantDates.result },
                    ].map((row) => (
                       <div key={row.label} className={cn("p-8 rounded-[32px] transition-all duration-500", row.accent ? "bg-gold text-black shadow-[0_0_40px_rgba(212,175,55,0.2)] transform scale-105" : "bg-white/5 border border-white/5 hover:border-white/20")}>
                          <span className={cn("block text-[9px] font-black uppercase tracking-[0.3em] mb-4", row.accent ? "text-black/60" : "text-white/20")}>{row.label}</span>
                          <span className="text-2xl font-black font-display tracking-tight leading-none">{row.value}</span>
                       </div>
                    ))}
                 </div>
              </section>

              <section className="bg-black-charcoal p-12 rounded-[48px] border border-white/5 shadow-2xl relative">
                 <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-5 font-display italic">
                    <TrendingUp className="w-7 h-7 text-gold" />
                    Related Intelligence
                 </h3>
                 <div className="space-y-6">
                    {relatedExams.map((re) => (
                       <Link
                          key={re.id}
                          to={`/exam/${re.slug}`}
                          className="flex items-center gap-6 p-6 bg-white/5 rounded-[32px] hover:bg-white text-white hover:text-black transition-all duration-500 group border border-transparent hover:border-white shadow-lg"
                       >
                          <div className="w-14 h-14 rounded-2xl bg-black-deep flex-shrink-0 flex items-center justify-center p-3 shadow-2xl group-hover:scale-110 transition-transform">
                             <Shield className="w-7 h-7 text-gold" />
                          </div>
                          <div>
                             <h4 className="font-black text-sm mb-2 leading-snug tracking-widest uppercase">{re.shortName}</h4>
                             <span className="text-[10px] font-black text-gold/60 uppercase tracking-[0.3em] group-hover:text-black/40 transition-colors">{re.level}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                       </Link>
                    ))}
                 </div>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
