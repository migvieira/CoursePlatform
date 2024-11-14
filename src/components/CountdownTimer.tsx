import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  duration: number; // Duration in minutes
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center space-x-2 text-lg font-mono">
      <Clock size={20} className="text-red-500" />
      <div className="flex items-center space-x-1">
        <div className="bg-gray-800 text-white px-2 py-1 rounded">
          {formatNumber(hours)}
        </div>
        <span className="text-gray-800">:</span>
        <div className="bg-gray-800 text-white px-2 py-1 rounded">
          {formatNumber(minutes)}
        </div>
        <span className="text-gray-800">:</span>
        <div className="bg-gray-800 text-white px-2 py-1 rounded">
          {formatNumber(seconds)}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;