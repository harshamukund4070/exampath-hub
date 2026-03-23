import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Rocket, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Rocket className="text-white w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-gray-900 leading-none block">ExamPath</span>
                <span className="text-[8px] font-bold text-blue-600 uppercase tracking-widest block">India Portal</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              India's leading platform for government and competitive exam information. We help you find the right path for your target career.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:rotate-3">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Browse Exams', 'Upcoming', 'Latest Results', 'Sitemap'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-gray-500 hover:text-blue-600 text-sm font-semibold flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 scale-0 group-hover:scale-100 transition-all opacity-0 group-hover:opacity-100" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Connect</h4>
            <ul className="space-y-4 font-semibold">
              <li className="flex items-center text-sm text-gray-500 group">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>contact@exampath.in</span>
              </li>
              <li className="flex items-center text-sm text-gray-500 group">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 999 888 7766</span>
              </li>
              <li className="flex items-center text-sm text-gray-500 group">
                <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Bengaluru, Karnataka Hub</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Get Updates</h4>
            <div className="bg-gray-50 p-6 rounded-2xl ring-1 ring-gray-100">
               <p className="text-xs text-gray-500 font-semibold mb-4 opacity-80 uppercase tracking-wider">Stay informed about new notifications</p>
               <div className="flex gap-2">
                 <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-grow bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                 />
                 <button className="bg-blue-600 p-2.5 rounded-xl text-white hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                   <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            © 2026 ExamPath India. Built with ❤️ for aspirants.
          </p>
          <div className="flex gap-8">
            <Link to="/" className="text-gray-400 hover:text-blue-600 text-xs font-black uppercase tracking-widest">Privacy</Link>
            <Link to="/" className="text-gray-400 hover:text-blue-600 text-xs font-black uppercase tracking-widest">Terms</Link>
            <Link to="/" className="text-gray-400 hover:text-blue-600 text-xs font-black uppercase tracking-widest">Feedback</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
