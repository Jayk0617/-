import React, { useState } from 'react';
import { Dynasty } from '../types';
import { ChevronRight, ImageOff } from 'lucide-react';

interface HistoryCardProps {
  dynasty: Dynasty;
  onClick: (dynasty: Dynasty) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ dynasty, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative flex flex-col h-full bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer overflow-hidden border border-stone-200 transform hover:-translate-y-2 hover:ring-1 hover:ring-stone-300/50"
      onClick={() => onClick(dynasty)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden shrink-0 bg-stone-200">
        {/* Overlay: darkens normally, lightens on hover to reveal detail */}
        <div className={`absolute inset-0 bg-black/20 transition-colors duration-700 z-10 ${isHovered ? 'bg-black/0' : ''}`} />
        
        {!imgError ? (
          <img 
            src={dynasty.imageUrl} 
            alt={dynasty.name} 
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transform transition-transform duration-1000 ease-in-out ${isHovered ? 'scale-110 saturate-100' : 'scale-100 saturate-[0.8]'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-300 to-stone-400 text-stone-500">
             <div className="text-center">
               <span className="text-6xl font-serif opacity-20 font-bold">{dynasty.chineseName.charAt(0)}</span>
             </div>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <h2 className="text-white text-3xl font-serif font-bold tracking-wide drop-shadow-md">{dynasty.chineseName}</h2>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col font-serif relative bg-paper-bg/50">
        <div className="flex justify-between items-baseline mb-2">
            <h3 className={`text-xl font-bold transition-colors duration-300 ${isHovered ? 'text-imperial-red' : 'text-ink-black'}`}>{dynasty.name}</h3>
        </div>
        <p className="text-xs font-bold text-imperial-red uppercase tracking-wider mb-3 opacity-90">{dynasty.period}</p>
        <p className={`text-stone-600 text-sm line-clamp-3 leading-relaxed flex-grow transition-colors ${isHovered ? 'text-stone-800' : ''}`}>
          {dynasty.description}
        </p>
        
        <div className={`mt-5 flex items-center text-imperial-red text-sm font-semibold transition-all duration-500 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <span>探索时代</span>
          <ChevronRight size={16} className={`ml-1 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
        </div>
      </div>

      {/* Decorative vertical line similar to traditional books */}
      <div className={`absolute right-4 top-0 bottom-0 w-[1px] bg-stone-200/60 border-l border-stone-100 transition-opacity ${isHovered ? 'opacity-0' : 'opacity-50'}`}></div>
    </div>
  );
};

export default HistoryCard;