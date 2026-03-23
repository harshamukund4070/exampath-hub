import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Rocket, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black-deep border-t border-white/5 pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-gold via-gold-dark to-gold rounded-2xl flex items-center justify-center transform group-hover:rotate-[10deg] transition-all duration-500 shadow-xl shadow-gold/20 group-hover:shadow-gold/40">
                <Rocket className="text-black w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-white leading-none block font-display">ExamPath</span>
                <span className="text-[10px] font-bold text-gold uppercase tracking-[0.25em] block">India Portal</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-medium max-w-xs">
              The premier destination for elite government and competitive examination intelligence in India. Precision information for serious achievers.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-white/30 hover:bg-gold hover:text-black hover:border-gold transition-all duration-500 transform hover:-translate-y-2">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-white mb-10 uppercase text-[10px] tracking-[0.4em] text-white/30">Intelligence Hub</h4>
            <ul className="space-y-5">
              {['Home', 'Browse Exams', 'Upcoming', 'Latest Results', 'Sitemap'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-white/40 hover:text-gold text-sm font-black uppercase tracking-widest flex items-center group transition-colors">
                    <ArrowRight className="w-4 h-4 mr-3 scale-0 group-hover:scale-100 transition-all opacity-0 group-hover:opacity-100" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white mb-10 uppercase text-[10px] tracking-[0.4em] text-white/30">Contact Protocol</h4>
            <ul className="space-y-6">
              <li className="flex items-center text-sm text-white/40 group">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-black uppercase tracking-widest text-[11px] truncate">harshamukundhaaripaka@gmail.com</span>
              </li>
              <li className="flex items-center text-sm text-white/40 group">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-black uppercase tracking-widest text-[11px]">+91 8688266593</span>
              </li>
              <li className="flex items-center text-sm text-white/40 group">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-black uppercase tracking-widest text-[11px]">Chennai, India HQ</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-white uppercase text-[10px] tracking-[0.4em] text-white/30">Global Newsletter</h4>
            <div className="premium-glass p-8 rounded-3xl border border-white/10">
              <p className="text-[10px] text-white/30 font-black mb-6 uppercase tracking-[0.2em] leading-relaxed">Secure exclusive exam intelligence and real-time portal updates.</p>
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="EXECUTIVE@DOMIAN.COM"
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-[10px] font-black tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-gold transition-all uppercase placeholder:text-white/10"
                />
                <button className="btn-gold w-full flex items-center justify-center gap-3">
                  <span className="text-[10px]">Secure Access</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 Admin: Aripaka Harsha Mukundha. All Rights Reserved.
          </p>
          <div className="flex gap-10">
            <Link to="/" className="text-white/20 hover:text-gold text-[10px] font-black uppercase tracking-[0.3em] transition-colors">Privacy Priority</Link>
            <Link to="/" className="text-white/20 hover:text-gold text-[10px] font-black uppercase tracking-[0.3em] transition-colors">Tactical Terms</Link>
            <Link to="/" className="text-white/20 hover:text-gold text-[10px] font-black uppercase tracking-[0.3em] transition-colors">Intelligence Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
