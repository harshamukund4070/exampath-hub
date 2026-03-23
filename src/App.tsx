import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ExamsPage = lazy(() => import('./pages/ExamsPage'));
const UpcomingExams = lazy(() => import('./pages/UpcomingExams'));
const ExamDetail = lazy(() => import('./pages/ExamDetail'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-6">
       <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin shadow-xl"></div>
       <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Initializing Portal...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exams" element={<ExamsPage />} />
                <Route path="/exams/upcoming" element={<UpcomingExams />} />
                <Route path="/exam/:slug" element={<ExamDetail />} />
                {/* Placeholders for secondary routes */}
                <Route path="/bookmarks" element={<ExamsPage />} /> {/* Simplified for now */}
                <Route path="/profile" element={<div className="pt-32 p-10 text-center font-black text-gray-400 uppercase tracking-widest min-h-screen">User Profile (Coming Soon)</div>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />

        {/* Floating Action Button for Scroll to Top (Optional but nice) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-40 bg-white border border-gray-100 p-4 rounded-2xl shadow-2xl text-gray-400 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all group lg:hidden"
        >
           <div className="relative">
              <div className="w-5 h-5 bg-blue-600 rounded-full absolute -top-1 -right-1 group-hover:block hidden"></div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
           </div>
        </button>
      </div>
    </Router>
  );
};

export default App;
