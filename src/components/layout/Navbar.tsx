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
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100/50" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group relative group">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-[10deg] transition-all duration-300 shadow-xl shadow-blue-500/30 group-hover:shadow-blue-600/40">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <div>
              <span className={cn(
                "text-2xl font-black tracking-tight leading-none block",
                isScrolled ? "text-gray-900" : "text-gray-900"
              )}>ExamPath</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.25em] block">India Portal</span>
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
                  isActive ? "text-blue-600 bg-blue-50/50" : "text-gray-600 hover:text-blue-600"
                )}
              >
                {link.name}
                <motion.div
                 layoutId="underline"
                 className={cn("absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left", location.pathname === link.path && "scale-x-100")}
                />
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="relative group">
               <button className="p-2.5 bg-gray-50 rounded-2xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
            </div>
            <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 bg-gray-900 rounded-full text-white hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-gray-900/10 hover:shadow-blue-600/20">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Account</span>
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-900"
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
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => cn(
                    "flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all",
                    isActive ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-900 hover:bg-blue-50"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
              <hr className="border-gray-100 my-2" />
              <div className="flex gap-4">
                <button className="flex-1 p-5 rounded-2xl bg-gray-50 font-bold flex flex-col items-center gap-2">
                  <Bell className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Alerts</span>
                </button>
                <Link to="/profile" className="flex-1 p-5 rounded-2xl bg-gray-900 text-white font-bold flex flex-col items-center gap-2">
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
