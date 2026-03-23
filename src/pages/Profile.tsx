import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Shield, Bell, Bookmark, Settings, LogOut, 
  ChevronRight, Zap, TrendingUp, Award, Rocket, CheckCircle2,
  Lock, Key, Smartphone
} from 'lucide-react';
import { useExams } from '../hooks/useSupabaseData';
import ExamCard from '../components/ExamCard';
import { cn } from '../utils/helpers';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'settings'>('overview');
  const { exams } = useExams();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(savedBookmarks);
    window.scrollTo(0, 0);
  }, []);

  const bookmarkedExams = exams.filter(e => bookmarks.includes(e.id));

  const stats = [
    { label: 'Mandates Tracked', value: bookmarks.length.toString(), icon: Shield },
    { label: 'Priority Alerts', value: '4', icon: Bell },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
    { label: 'Auth Level', value: 'Gold', icon: Award },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-48 pb-32 flex items-center justify-center bg-black-deep px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold/5 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl premium-glass p-12 lg:p-16 rounded-[48px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl"></div>
          
          <div className="text-center space-y-6 mb-12">
            <div className="w-20 h-20 bg-gold rounded-[24px] flex items-center justify-center mx-auto shadow-2xl shadow-gold/20 transform rotate-12 mb-8">
              <Lock className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-black text-white font-display italic tracking-tight">Secure Access</h1>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] font-black">Authentication Protocol Required</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-gold transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@agency.gov"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-gold/50 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Access Key</label>
              <div className="relative group">
                <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-gold transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-gold/50 transition-all font-medium"
                />
              </div>
            </div>

            <button type="submit" className="btn-gold w-full py-6 mt-8 shadow-gold/20">
              Initialize Connection
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
            <button className="text-[10px] font-black text-white/20 hover:text-gold uppercase tracking-[0.3em] transition-colors">Request Credentials</button>
            <button className="text-[10px] font-black text-white/20 hover:text-gold uppercase tracking-[0.3em] transition-colors">Protocol Recovery</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-deep pt-48 pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="premium-glass p-10 rounded-[40px] border-white/5 text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gold rounded-3xl rotate-12 blur-2xl opacity-20"></div>
                <div className="relative w-full h-full bg-black-charcoal rounded-3xl border border-gold/30 flex items-center justify-center group overflow-hidden">
                  <User className="w-12 h-12 text-gold group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-xl border-4 border-black-deep flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-white font-display italic tracking-tight mb-2 uppercase">A. Harsha Mukundha</h2>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-10">Chief Aspirant Officer</p>
              
              <div className="space-y-3">
                {[
                  { id: 'overview', icon: Zap, label: 'Control Center' },
                  { id: 'bookmarks', icon: Bookmark, label: 'Secured Intel' },
                  { id: 'settings', icon: Settings, label: 'Protocols' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={cn(
                      "w-full flex items-center gap-6 p-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all",
                      activeTab === item.id ? "bg-gold text-black shadow-lg shadow-gold/20" : "text-white/40 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-6 p-5 rounded-2xl font-black text-[10px] text-red-500 uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all mt-8 border border-transparent hover:border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Terminate Session
                </button>
              </div>
            </motion.div>

            <div className="bg-gold/5 border border-gold/10 p-8 rounded-[32px] space-y-4">
              <div className="flex items-center gap-4 text-gold mb-2">
                <Shield className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Security Status</span>
              </div>
              <p className="text-[10px] text-white/40 font-medium leading-relaxed">Account identity protected by 256-bit Mandate Encryption. Last access from Bengaluru Hub.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="premium-glass p-8 rounded-[32px] border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 blur-2xl group-hover:w-32 transition-all"></div>
                        <stat.icon className="w-6 h-6 text-gold mb-6 group-hover:scale-110 transition-transform" />
                        <div className="text-3xl font-black text-white font-display italic tracking-tight mb-2">{stat.value}</div>
                        <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Active Alerts */}
                  <div className="premium-glass p-12 rounded-[48px] border-white/5">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-2xl font-black text-white font-display italic tracking-tight">Incoming Transmissions</h3>
                      <button className="text-[10px] font-black text-gold uppercase tracking-[0.3em] flex items-center gap-2">
                        Mark All Read <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: 'SSC CGL Tier-II Dates Finalized', desc: 'Critical update to your tracked mandate.', time: '2h ago', level: 'high' },
                        { title: 'New IBPS PO Portal Active', desc: 'Registration phase has officially commenced.', time: '5h ago', level: 'medium' },
                        { title: 'UPSC Merit List Intelligence', desc: 'The annual results have been archived.', time: '1d ago', level: 'low' },
                      ].map((alert, i) => (
                        <div key={i} className="flex gap-8 p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-gold/20 transition-all group cursor-pointer">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg",
                            alert.level === 'high' ? "bg-red-500/20 text-red-500" : 
                            alert.level === 'medium' ? "bg-gold/20 text-gold" : "bg-blue-500/20 text-blue-500"
                          )}>
                            <Bell className="w-5 h-5 group-hover:animate-swing" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between mb-2">
                              <h4 className="font-black text-sm uppercase tracking-widest text-white/80">{alert.title}</h4>
                              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{alert.time}</span>
                            </div>
                            <p className="text-xs text-white/40 font-medium">{alert.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bookmarks' && (
                <motion.div
                  key="bookmarks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-black text-white font-display italic tracking-tight">Secured Mandates</h3>
                    <span className="badge-gold">{bookmarkedExams.length} ENTITIES</span>
                  </div>
                  
                  {bookmarkedExams.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {bookmarkedExams.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-6 bg-white/5 rounded-[48px] border border-dashed border-white/10">
                      <Bookmark className="w-16 h-16 text-white/10 mx-auto" />
                      <p className="text-white/30 font-black uppercase tracking-[0.4em] text-xs">No Intel Secured Yet</p>
                      <Link to="/exams" className="btn-outline-gold text-[10px] inline-block">Access Database</Link>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                  <h3 className="text-3xl font-black text-white font-display italic tracking-tight">Protocol Configurations</h3>
                  
                  <div className="grid gap-6">
                    {[
                      { icon: Bell, title: 'Push Transmissions', desc: 'Real-time alerts via desktop hub.', status: true },
                      { icon: Mail, title: 'Email Mandates', desc: 'Weekly intelligence dossier to your inbox.', status: true },
                      { icon: Smartphone, title: 'Mobile Nexus', desc: 'SMS sync for critical deadline alerts.', status: false },
                      { icon: Shield, title: 'Privacy Shield', desc: 'Mask profile visibility from public servers.', status: true },
                    ].map((setting) => (
                      <div key={setting.title} className="flex items-center justify-between p-8 premium-glass rounded-[32px] border-white/5 hover:bg-white/5 transition-colors group">
                        <div className="flex gap-8 items-center">
                          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group-hover:text-gold transition-colors">
                            <setting.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-black text-sm uppercase tracking-widest text-white/80 mb-1">{setting.title}</h4>
                            <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">{setting.desc}</p>
                          </div>
                        </div>
                        <button className={cn(
                          "w-12 h-6 rounded-full relative transition-all duration-300",
                          setting.status ? "bg-gold" : "bg-white/10"
                        )}>
                          <div className={cn(
                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                            setting.status ? "left-7" : "left-1"
                          )}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
