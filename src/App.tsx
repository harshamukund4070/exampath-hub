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
const Profile = lazy(() => import('./pages/Profile'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black-deep">
    <div className="flex flex-col items-center gap-8">
       <div className="w-20 h-20 border-2 border-gold/10 border-t-gold rounded-full animate-spin shadow-[0_0_40px_rgba(212,175,55,0.1)]"></div>
       <div className="flex flex-col items-center gap-2">
          <span className="text-gold font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">Initializing Portal</span>
          <div className="h-0.5 w-12 bg-gold/20 rounded-full"></div>
       </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-gold selection:text-black bg-black-deep">
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
                <Route path="/profile" element={<Profile />} />
                <Route path="/account" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />

        {/* Floating Action Button for Scroll to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-40 bg-black-charcoal border border-white/10 p-5 rounded-2xl shadow-2xl text-white/40 hover:text-gold hover:border-gold/50 hover:scale-110 active:scale-95 transition-all group lg:hidden backdrop-blur-xl"
        >
           <div className="relative">
              <div className="w-2 h-2 bg-gold rounded-full absolute -top-1 -right-1 group-hover:block hidden animate-ping"></div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
           </div>
        </button>
      </div>
    </Router>
  );
};

export default App;
