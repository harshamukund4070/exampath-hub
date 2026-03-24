import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Telescope, Loader2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are Pathfinder, an elite AI guide for ExamPath Hub — India's premier competitive examination intelligence portal. Your personality is knowledgeable, encouraging, and sharp.

Your expertise covers:
- UPSC Civil Services (Prelims, Mains, Interview)
- SSC (CGL, CHSL, MTS, CPO)
- IBPS & SBI (PO, Clerk, SO)
- JEE Main & Advanced
- NEET UG & PG
- CAT, XAT, MAT (MBA entrances)
- GATE, GMAT, GRE
- State PSC exams
- Railway (RRB) exams
- Defence exams (NDA, CDS, AFCAT)

When a user asks about exams, provide:
1. Accurate, official information about eligibility, syllabus, exam pattern
2. Preparation tips and strategy
3. Important dates (mention checking official sites for latest updates)
4. Book/resource recommendations

Always be concise, warm and motivating. If unsure say "Please verify this on the official exam website." End responses with encouragement when appropriate.`;

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "✨ Hello! I'm **Pathfinder**, your AI exam guide. Ask me anything about UPSC, SSC, JEE, NEET, CAT, IBPS, or any competitive exam in India. I'm here to light your path! 🚀",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)/gm, '• $1')
      .replace(/\n/g, '<br/>');
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (!apiKey) {
        throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your env variables.');
      }

      // Convert messages to Gemini format
      const contents = messages.slice(1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: trimmed }] });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: { text: SYSTEM_PROMPT }
          },
          contents: contents,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
          }
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        console.error('Gemini API error:', response.status, errData);
        throw new Error(`API ${response.status}: ${errData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const aiContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, I couldn\'t process that. Please try again.';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Pathfinder error:', err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ ${err?.message || 'Could not connect to Gemini. Please try again.'}`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = ['UPSC syllabus 2024', 'Best books for SSC CGL', 'JEE preparation strategy', 'How to crack NEET?'];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-10 right-10 z-50 group"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Pathfinder AI"
      >
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute -inset-2 bg-gold/30 rounded-full blur-lg animate-pulse group-hover:bg-gold/50 transition-colors" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-gold via-gold-dark to-[#8B6914] rounded-2xl flex items-center justify-center shadow-2xl shadow-gold/40 border border-gold/50">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-7 h-7 text-black" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Telescope className="w-7 h-7 text-black" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Notification dot */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-black rounded-full animate-pulse" />
          )}
        </div>
        {/* Label */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black-card border border-white/10 px-4 py-2 rounded-xl text-gold font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap shadow-xl hidden group-hover:block"
          >
            Pathfinder AI
          </motion.div>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-32 right-10 z-50 w-[380px] max-w-[calc(100vw-2.5rem)] flex flex-col"
            style={{ height: '580px' }}
          >
            <div className="flex flex-col h-full bg-black-charcoal/95 backdrop-blur-2xl border border-white/10 rounded-[28px] overflow-hidden shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] shadow-gold/10">

              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5 bg-gradient-to-r from-gold/10 to-transparent relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gold/5 blur-xl" />
                <div className="relative w-11 h-11 bg-gradient-to-br from-gold to-gold-dark rounded-2xl flex items-center justify-center shadow-lg shadow-gold/30 flex-shrink-0">
                  <Telescope className="w-5 h-5 text-black" />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-black text-base tracking-tight">Pathfinder</h3>
                    <Sparkles className="w-3 h-3 text-gold animate-pulse" />
                  </div>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">AI Exam Guide · Powered by Gemini</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-[9px] font-black uppercase tracking-widest">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-gold to-gold-dark'
                        : 'bg-white/10 border border-white/10'
                    }`}>
                      {msg.role === 'assistant'
                        ? <Bot className="w-4 h-4 text-black" />
                        : <User className="w-4 h-4 text-white/70" />
                      }
                    </div>
                    {/* Bubble */}
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold text-black font-semibold rounded-tr-sm'
                        : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-sm'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <span dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                      <Bot className="w-4 h-4 text-black" />
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-gold animate-spin" />
                      <span className="text-white/40 text-xs font-black uppercase tracking-widest">Pathfinder is thinking...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions — only show at start */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInput(s); inputRef.current?.focus(); }}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white/40 hover:text-gold hover:border-gold/30 transition-all uppercase tracking-wider"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 border-t border-white/5 flex-shrink-0">
                <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-gold/40 transition-all">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about any exam..."
                    rows={1}
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 resize-none focus:outline-none leading-relaxed max-h-28 overflow-y-auto scrollbar-hide"
                    style={{ minHeight: '24px' }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-9 h-9 bg-gold rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-gold-light disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-gold/30"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </button>
                </div>
                <p className="text-center text-white/15 text-[9px] font-black uppercase tracking-widest mt-2">
                  Powered by Gemini · ExamPath Intelligence
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
