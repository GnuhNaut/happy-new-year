import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  // Tet Binh Ngo 2026 is approx Feb 17, 2026
  const TET_DATE = new Date('2026-02-17T00:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [TET_DATE]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="bg-tet-gold/20 backdrop-blur-md border border-tet-gold/50 rounded-lg p-2 md:p-4 w-16 md:w-20 text-center">
        <span className="text-2xl md:text-3xl font-bold text-white font-mono">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-300 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center mt-8 md:mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
      <TimeBox value={timeLeft.days} label="Ngày" />
      <TimeBox value={timeLeft.hours} label="Giờ" />
      <TimeBox value={timeLeft.minutes} label="Phút" />
      <TimeBox value={timeLeft.seconds} label="Giây" />
    </div>
  );
};

export default Countdown;
