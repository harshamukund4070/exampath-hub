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
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16">
           <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">Roadmap to Careers</span>
           <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Upcoming Examinations</h1>
           <p className="text-xl text-gray-500 font-medium">Never miss a deadline. All upcoming recruitment and entrance tests in one place.</p>
        </div>

        <div className="grid gap-8">
           {examsLoading ? (
             [...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-white rounded-[40px] animate-pulse"></div>
             ))
           ) : (
                <>
                  {upcomingExamsList.map((exam, idx) => {
                    const category = categories.find(c => c.id === exam.categoryId);
                    return (
                      <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 lg:p-12 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden relative group"
                      >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/10 transition-colors"></div>
                        <div className="grid lg:grid-cols-12 gap-10 items-center relative">
                            <div className="lg:col-span-5 space-y-8">
                              <div className="flex items-start gap-6">
                                  <div className="w-20 h-20 bg-blue-50 rounded-3xl overflow-hidden border border-blue-100 flex items-center justify-center p-4 shadow-inner group-hover:scale-110 transition-all">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                  </div>
                                  <div className="pt-2">
                                    <h3 className="text-3xl font-black text-gray-900 mb-2 leading-tight">{exam.name}</h3>
                                    <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">{exam.conductingBody}</span>
                                  </div>
                              </div>
                              <div className="flex gap-4">
                                  <span className="px-5 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-widest border border-blue-100">{category?.name}</span>
                                  <span className="px-5 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 font-black text-xs uppercase tracking-widest border border-indigo-100">{exam.level}</span>
                              </div>
                              <p className="text-gray-500 font-medium leading-relaxed max-sm line-clamp-2">{exam.shortName} - {exam.frequency} Exam</p>
                            </div>

                            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-6">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Countdown to Exam</span>
                              <div className="flex justify-center flex-col items-center">
                                  <div className="text-2xl font-black text-gray-900">{exam.importantDates.examDate}</div>
                                  <span className="text-[10px] font-bold text-gray-400 uppercase mt-2">Target Schedule</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest bg-gray-50 px-5 py-2.5 rounded-full border border-gray-100">
                                  <Calendar className="w-4 h-4" />
                                  <span>Frequency: {exam.frequency}</span>
                              </div>
                            </div>

                            <div className="lg:col-span-3 flex flex-col gap-4">
                              <Link
                                  to={`/exam/${exam.slug}`}
                                  className="w-full py-5 rounded-2xl bg-gray-900 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all text-center shadow-lg active:scale-95"
                              >
                                  View Details
                              </Link>
                              <button className="w-full py-5 rounded-2xl bg-white border-2 border-gray-100 text-gray-900 font-black text-sm uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3">
                                  <Bell className="w-4 h-4" />
                                  Set Reminder
                              </button>
                            </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {upcomingExamsList.length === 0 && (
                    <div className="bg-white rounded-[40px] p-32 text-center border-2 border-dashed border-gray-100">
                      <h3 className="text-2xl font-black text-gray-900 mb-2">No upcoming exams found</h3>
                      <p className="text-gray-400 font-medium">Stay tuned for new notifications!</p>
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
