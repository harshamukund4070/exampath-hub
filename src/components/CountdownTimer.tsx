import React, { useState, useEffect } from 'react';
import { getCountdown } from '../utils/helpers';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) {
    return <span className="text-gold font-black italic uppercase tracking-widest text-[10px] animate-pulse">Mandate Concluded</span>;
  }

  return (
    <div className="flex gap-4">
      {[
        { label: 'D', value: timeLeft.days },
        { label: 'H', value: timeLeft.hours },
        { label: 'M', value: timeLeft.minutes },
        { label: 'S', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2">
          <div className="bg-gold text-black font-black p-3 rounded-xl min-w-[50px] text-center text-lg lg:text-xl shadow-[0_0_20px_rgba(212,175,55,0.2)] transform transition hover:scale-105 border border-gold/50 font-display italic">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
