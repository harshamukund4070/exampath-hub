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

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <span className="text-red-500 font-semibold italic">Exam In Progress/Ended</span>;
  }

  return (
    <div className="flex gap-4">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="bg-blue-600 text-white font-bold p-3 rounded-lg min-w-[60px] text-center text-xl shadow-md transform transition hover:scale-105">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="text-xs uppercase tracking-wider text-gray-500 mt-1 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
