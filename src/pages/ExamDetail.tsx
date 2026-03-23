import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar, Briefcase, MapPin, Globe, Award, Info, BookOpen, Clock,
  ArrowRight, Bookmark, Share2, Bell, CheckCircle2, AlertCircle, ChevronDown,
  ChevronUp, Download, ExternalLink, Play, FileText, LayoutList, GraduationCap, Users, ShieldCheck,
  Zap, TrendingUp, BarChart3, Building2, HelpCircle
} from 'lucide-react';
import { exams, categories } from '../data/exams';
import { Exam } from '../types';
import CountdownTimer from '../components/CountdownTimer';
import { cn } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

const ExamDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'syllabus' | 'pattern' | 'resources'>('info');
  const [openAccordions, setOpenAccordions] = useState<number[]>([0]);

  useEffect(() => {
    const foundExam = exams.find(e => e.slug === slug);
    if (foundExam) {
      setExam(foundExam);
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(foundExam.id));
      window.scrollTo(0, 0);
    } else {
      navigate('/exams');
    }
  }, [slug, navigate]);

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
  }, [exam]);

  const relatedExams = useMemo(() => {
    if (!exam) return [];
    return exams.filter(e => exam.relatedExamIds.includes(e.id));
  }, [exam]);

  if (!exam) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 text-xs font-bold text-gray-400 uppercase tracking-widest overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
           <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
           <ArrowRight className="w-3 h-3" />
           <Link to="/exams" className="hover:text-blue-600 transition-colors">Exams</Link>
           <ArrowRight className="w-3 h-3" />
           <span className="hover:text-blue-600 transition-colors">{category?.name || 'Category'}</span>
           <ArrowRight className="w-3 h-3" />
           <span className="text-gray-900 truncate">{exam.name}</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white p-6 lg:p-12 rounded-[40px] shadow-2xl shadow-blue-500/5 border border-gray-100 mb-10 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div className="space-y-8">
                 <div className="flex flex-wrap gap-3">
                    <span className="px-5 py-2 rounded-xl bg-blue-100/50 text-blue-600 font-black text-xs uppercase tracking-widest border border-blue-100">{category?.name}</span>
                    <span className="px-5 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-black text-xs uppercase tracking-widest border border-indigo-100">{exam.level}</span>
                    <span className="px-5 py-2 rounded-xl bg-emerald-50 text-emerald-600 font-black text-xs uppercase tracking-widest border border-emerald-100">{exam.mode}</span>
                 </div>
                 <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">{exam.name}</h1>
                 <p className="text-xl text-gray-500 font-medium leading-relaxed">
                   Conducting Body: <span className="text-gray-900">{exam.conductingBody}</span> • Frequency: <span className="text-gray-900">{exam.frequency}</span>
                 </p>

                 <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={toggleBookmark}
                      className={cn(
                        "flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95",
                        isBookmarked ? "bg-blue-600 text-white shadow-blue-600/20" : "bg-white text-gray-900 border border-gray-100 shadow-gray-900/5 hover:border-blue-600 hover:text-blue-600"
                      )}
                    >
                       <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
                       {isBookmarked ? 'Bookmarked' : 'Bookmark Exam'}
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-900 text-white font-black text-sm uppercase tracking-widest transition-all shadow-gray-900/20 hover:bg-gray-800 active:scale-95">
                       <Bell className="w-5 h-5" />
                       Set Reminder
                    </button>
                    <button className="p-4 bg-gray-50 rounded-2xl text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100">
                       <Share2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-[32px] border border-gray-100 space-y-8 shadow-inner">
                 <div className="flex justify-between items-center mb-4">
                    <span className="font-black text-sm text-gray-400 uppercase tracking-widest">Target Date</span>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                       <Clock className="w-4 h-4" />
                       Stay Alert
                    </div>
                 </div>
                 <div className="flex justify-center flex-col items-center gap-4">
                    <div className="text-3xl font-black text-gray-900">{exam.importantDates.examDate}</div>
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Official Examination Schedule</span>
                 </div>
                 <div className="pt-8 border-t border-gray-200 grid grid-cols-2 gap-6">
                    <div>
                       <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Current Status</span>
                       <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-xs">
                          <Zap className="w-4 h-4" />
                          <span>{exam.status}</span>
                       </div>
                    </div>
                    <div>
                       <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Official Portal</span>
                       <a href={exam.officialWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 font-bold hover:underline py-1">
                          <ExternalLink className="w-4 h-4" />
                          <span>Visit Website</span>
                       </a>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10">
           {/* Left Column: Details & Tabs */}
           <div className="lg:col-span-2 space-y-10">
              <div className="bg-white p-2.5 rounded-[28px] shadow-sm border border-gray-100 flex overflow-x-auto scrollbar-hide">
                 {[
                    { id: 'info', icon: Info, label: 'Overview' },
                    { id: 'syllabus', icon: BookOpen, label: 'Syllabus' },
                    { id: 'pattern', icon: LayoutList, label: 'Exam Pattern' },
                    { id: 'resources', icon: Award, label: 'Resources' },
                 ].map((tab) => (
                    <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id as any)}
                       className={cn(
                          "flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap flex-grow justify-center",
                          activeTab === tab.id ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                       )}
                    >
                       <tab.icon className="w-4 h-4" />
                       {tab.label}
                    </button>
                 ))}
              </div>

              <div className="bg-white p-10 lg:p-14 rounded-[40px] shadow-sm border border-gray-100 min-h-[600px]">
                 <AnimatePresence mode="wait">
                    {activeTab === 'info' && (
                       <motion.div
                          key="info"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-12"
                       >
                          <section>
                             <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
                               <Award className="w-8 h-8 text-blue-600" />
                               Eligibility & Scope
                             </h2>
                             <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                                   <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                         <GraduationCap className="w-6 h-6" />
                                      </div>
                                      <span className="font-black text-xs text-blue-600 uppercase tracking-widest">Education</span>
                                   </div>
                                   <p className="text-gray-700 font-semibold leading-relaxed">{exam.eligibility.education}</p>
                                </div>
                                <div className="p-8 bg-amber-50/50 rounded-3xl border border-amber-100/50">
                                   <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                         <Clock className="w-6 h-6" />
                                      </div>
                                      <span className="font-black text-xs text-amber-600 uppercase tracking-widest">Age Limit</span>
                                   </div>
                                   <p className="text-gray-700 font-semibold leading-relaxed">{exam.eligibility.ageLimit}</p>
                                </div>
                                <div className="p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
                                   <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                         <Globe className="w-6 h-6" />
                                      </div>
                                      <span className="font-black text-xs text-emerald-600 uppercase tracking-widest">Nationality</span>
                                   </div>
                                   <p className="text-gray-700 font-semibold leading-relaxed">{exam.eligibility.nationality}</p>
                                </div>
                                <div className="p-8 bg-rose-50/50 rounded-3xl border border-rose-100/50">
                                   <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                         <Users className="w-6 h-6" />
                                      </div>
                                      <span className="font-black text-xs text-rose-600 uppercase tracking-widest">Vacancies</span>
                                   </div>
                                   <p className="text-gray-700 font-black text-xl leading-relaxed">{exam.vacancies || 'N/A'}</p>
                                </div>
                             </div>
                          </section>

                          <section>
                             <h2 className="text-3xl font-black text-gray-900 mb-8">Selection Process</h2>
                             <div className="bg-slate-50 p-10 rounded-[32px] border border-gray-100 relative group overflow-hidden">
                                <p className="text-gray-600 font-medium leading-relaxed mb-6 italic">"{exam.selectionProcess}"</p>
                                <div className="space-y-4">
                                   {exam.examPattern.stages.map((stage, i) => (
                                      <div key={stage} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-600">
                                         <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">{i + 1}</span>
                                         <span className="font-bold text-gray-800">{stage}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </section>

                          <section>
                             <h2 className="text-3xl font-black text-gray-900 mb-8">Cut-off Analysis (Previous Year)</h2>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {exam.cutOff.map((co) => (
                                   <div key={co.category} className="p-6 bg-white border border-gray-100 rounded-3xl text-center shadow-sm">
                                      <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{co.category}</span>
                                      <span className="text-2xl font-black text-gray-900">{co.marks}</span>
                                   </div>
                                ))}
                             </div>
                          </section>

                          <section>
                             <h2 className="text-3xl font-black text-gray-900 mb-8">Salary & Packages</h2>
                             <div className="p-10 rounded-[32px] bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
                                <span className="text-white/60 font-black text-xs uppercase tracking-[0.3em]">Estimated Pay Scale</span>
                                <span className="text-3xl lg:text-4xl font-black">{exam.salaryRange}</span>
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
                          className="space-y-8"
                       >
                          <div className="flex justify-between items-center mb-10">
                             <h2 className="text-3xl font-black text-gray-900">Detailed Syllabus</h2>
                          </div>
                          <div className="space-y-4">
                             {exam.syllabus.map((section, idx) => (
                                <div key={section.section} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                   <button
                                      onClick={() => toggleAccordion(idx)}
                                      className={cn(
                                         "w-full px-8 py-6 flex justify-between items-center transition-colors",
                                         openAccordions.includes(idx) ? "bg-slate-50" : "bg-white hover:bg-slate-50/50"
                                      )}
                                   >
                                      <span className="text-lg font-black text-gray-900">{section.section}</span>
                                      {openAccordions.includes(idx) ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                   </button>
                                   <AnimatePresence>
                                      {openAccordions.includes(idx) && (
                                         <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden"
                                         >
                                            <div className="p-10 bg-white grid md:grid-cols-2 gap-4">
                                               {section.topics.map((topic, tIdx) => (
                                                  <div key={tIdx} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50/50 group hover:bg-blue-50 transition-colors">
                                                     <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                                                     <span className="font-semibold text-gray-700">{topic}</span>
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
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                       >
                          <h2 className="text-3xl font-black text-gray-900 mb-10">Exam Structure</h2>
                          <div className="grid gap-10">
                             <div className="p-10 rounded-[32px] bg-slate-50 border border-gray-100 space-y-10">
                                <div className="grid md:grid-cols-2 gap-12">
                                   <div className="space-y-4">
                                      <span className="font-black text-xs text-blue-600 uppercase tracking-widest block">Marking Scheme</span>
                                      <p className="text-xl font-bold text-gray-900 leading-relaxed">{exam.examPattern.markingScheme}</p>
                                   </div>
                                   <div className="space-y-4">
                                      <span className="font-black text-xs text-indigo-600 uppercase tracking-widest block">Duration</span>
                                      <p className="text-xl font-bold text-gray-900 leading-relaxed">{exam.examPattern.duration}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100">
                                  <ShieldCheck className={cn("w-6 h-6", exam.examPattern.negativeMarking ? "text-red-500" : "text-emerald-500")} />
                                  <span className="font-bold text-gray-700">
                                    Negative Marking: {exam.examPattern.negativeMarking ? 'Applicable' : 'Not Applicable'}
                                  </span>
                                </div>
                             </div>

                             <div className="bg-blue-600/5 p-10 rounded-[32px] border border-blue-100 flex items-start gap-8">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                                   <HelpCircle className="w-6 h-6" />
                                </div>
                                <div className="space-y-4">
                                   <h4 className="text-xl font-black text-gray-900">Key Focus Areas</h4>
                                   <div className="flex flex-wrap gap-2">
                                     {exam.examPattern.subjects.map(s => (
                                       <span key={s} className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-gray-600 border border-gray-100 shadow-sm">{s}</span>
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
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-12"
                       >
                          <div>
                             <h2 className="text-3xl font-black text-gray-900 mb-8">Recommended Books</h2>
                             <div className="grid gap-6">
                                {exam.resources.books.map((book, i) => (
                                   <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 shadow-sm transition-all group">
                                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                         <BookOpen className="w-5 h-5" />
                                      </div>
                                      <span className="font-bold text-gray-900 text-lg">{book}</span>
                                   </div>
                                ))}
                             </div>
                          </div>

                          <div>
                             <h2 className="text-3xl font-black text-gray-900 mb-8">Video Resources</h2>
                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {exam.resources.youtubeChannels.map((channel) => (
                                   <div key={channel} className="flex flex-col items-center p-8 rounded-[40px] bg-red-50 text-red-600 border border-red-100">
                                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg mb-6">
                                         <Play className="w-6 h-6 fill-current" />
                                      </div>
                                      <span className="font-black text-center text-lg">{channel}</span>
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
           <div className="space-y-10">
              <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                 <h3 className="text-2xl font-black text-gray-900 mb-10 border-b border-gray-50 pb-6 flex items-center gap-4">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    Complete Timeline
                 </h3>
                 <div className="space-y-6">
                    {[
                      { label: 'Notification', value: exam.importantDates.notification },
                      { label: 'Application Starts', value: exam.importantDates.applicationStart },
                      { label: 'Application Ends', value: exam.importantDates.applicationEnd },
                      { label: 'Examination', value: exam.importantDates.examDate, accent: true },
                      { label: 'Admit Card', value: exam.importantDates.admitCard },
                      { label: 'Result Announcement', value: exam.importantDates.result },
                    ].map((row) => (
                       <div key={row.label} className={cn("p-6 rounded-3xl transition-all", row.accent ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "bg-slate-50")}>
                          <span className={cn("block text-[10px] font-bold uppercase tracking-widest mb-3", row.accent ? "text-white/60" : "text-gray-400")}>{row.label}</span>
                          <span className="text-xl font-black">{row.value}</span>
                       </div>
                    ))}
                 </div>
              </section>

              <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
                 <h3 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-4">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                    Related Exams
                 </h3>
                 <div className="space-y-6">
                    {relatedExams.map((re) => (
                       <Link
                          key={re.id}
                          to={`/exam/${re.slug}`}
                          className="flex items-center gap-5 p-5 bg-slate-50 rounded-3xl hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-100"
                       >
                          <div className="w-12 h-12 rounded-2xl bg-white flex-shrink-0 flex items-center justify-center p-2 shadow-sm group-hover:scale-110 transition-transform">
                             <ShieldCheck className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                             <h4 className="font-black text-gray-900 text-sm mb-1 leading-snug">{re.shortName}</h4>
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{re.level}</span>
                          </div>
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
