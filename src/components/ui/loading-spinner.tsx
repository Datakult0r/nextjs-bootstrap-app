import React from 'react';

type LoadingSpinnerProps = {
  show: boolean;
  containerClassName?: string;
};

export function LoadingSpinner({ 
  show, 
  containerClassName = '' 
}: LoadingSpinnerProps) {
  if (!show) return null;
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${containerClassName}`}>
      <div className="relative flex items-center justify-center w-[150px] h-[150px] rounded-full border-[3px] border-blue-500 border-opacity-10 text-blue-500 font-sans uppercase tracking-widest shadow-xl">
        COAI
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-transparent border-t-blue-500 border-r-blue-500 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-1/2 h-[4px] origin-left bg-transparent animate-spin-loader-line">
          <div className="absolute -right-[8px] -top-[6px] w-4 h-4 rounded-full bg-blue-400 shadow-blue-glow"></div>
        </div>
      </div>
    </div>
  );
} 