
import React, { useState, useEffect } from 'react';

interface AdLoaderProps {
  onFinish: () => void;
}

const AdLoader: React.FC<AdLoaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-black mb-8 tracking-tighter animate-pulse">
        PROCESSING ENCRYPTED STREAM...
      </h2>
      
      <div className="w-full max-w-md h-2 bg-zinc-800 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-red-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-zinc-400 text-sm mb-12">
        Unlock in <span className="text-white font-bold">{timeLeft}</span>s
      </p>

      <button
        onClick={() => timeLeft === 0 && onFinish()}
        disabled={timeLeft > 0}
        className={`px-12 py-4 rounded-full font-black text-lg transition-all ${
          timeLeft === 0 
          ? 'bg-red-600 text-white cursor-pointer hover:scale-105 shadow-xl shadow-red-600/20' 
          : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
        }`}
      >
        {timeLeft === 0 ? 'ACCESS STREAM' : 'WAITING...'}
      </button>
    </div>
  );
};

export default AdLoader;
