import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Bookmark, Menu, X, Rocket, GraduationCap } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Exams', path: '/exams' },
    { name: 'Upcoming', path: '/exams/upcoming' },
    { name: 'Bookmarks', path: '/bookmarks' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
        isScrolled ? "bg-black-deep/80 backdrop-blur-xl shadow-2xl border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-gold via-gold-dark to-gold rounded-2xl flex items-center justify-center transform group-hover:rotate-[10deg] transition-all duration-500 shadow-xl shadow-gold/20 group-hover:shadow-gold/40">
              <Rocket className="text-black w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight leading-none block font-display text-white">ExamPath</span>
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.25em] block">India Portal</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  "px-4 py-2 text-sm font-semibold rounded-xl transition-all relative group overflow-hidden",
                  isActive ? "text-gold" : "text-white/70 hover:text-gold"
                )}
              >
                {link.name}
                <motion.div
                 layoutId="underline"
                 className={cn("absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left", location.pathname === link.path && "scale-x-100")}
                />
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
               <button className="p-2.5 bg-white/5 rounded-2xl text-white/50 hover:bg-gold/10 hover:text-gold transition-all duration-300 border border-white/5">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold border-2 border-black-deep rounded-full"></span>
              </button>
            </div>
            <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 bg-gold rounded-xl text-black hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/10 hover:shadow-gold/20">
              <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider">Account</span>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden p-2 rounded-xl bg-white/5 text-white border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black-deep border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4 text-white">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => cn(
                    "flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all",
                    isActive ? "bg-gold text-black" : "bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
              <hr className="border-white/5 my-2" />
              <div className="flex gap-4">
                <button className="flex-1 p-5 rounded-2xl bg-white/5 font-bold flex flex-col items-center gap-2">
                  <Bell className="w-6 h-6 text-gold" />
                  <span className="text-sm">Alerts</span>
                </button>
                <Link to="/profile" className="flex-1 p-5 rounded-2xl bg-gold text-black font-bold flex flex-col items-center gap-2">
                  <User className="w-6 h-6" />
                  <span className="text-sm">Profile</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
