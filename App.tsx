import React, { useState } from 'react';
import { DYNASTIES } from './constants';
import { Dynasty } from './types';
import HistoryCard from './components/HistoryCard';
import DetailModal from './components/DetailModal';
import { ScrollText } from 'lucide-react';

function App() {
  const [selectedDynasty, setSelectedDynasty] = useState<Dynasty | null>(null);

  return (
    <div className="min-h-screen font-serif text-ink-black pb-12">
      {/* Header */}
      <header className="relative bg-ink-black text-paper-bg py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-2">
             <div className="h-[1px] w-12 bg-imperial-red"></div>
             <ScrollText className="text-imperial-red" />
             <div className="h-[1px] w-12 bg-imperial-red"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            中国历史图鉴
          </h1>
          <p className="text-lg md:text-2xl text-stone-300 font-light tracking-widest uppercase">
            中华文明五千年
          </p>
          <p className="max-w-2xl mx-auto text-stone-400 mt-4 text-sm md:text-base leading-relaxed">
            穿越五千年的文明之旅。选择一个时代，通过 AI 深入探索帝王、哲学与文化精髓。
          </p>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DYNASTIES.map((dynasty, index) => (
            <div 
              key={dynasty.id} 
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <HistoryCard 
                dynasty={dynasty} 
                onClick={setSelectedDynasty} 
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-stone-300 py-8 text-center text-stone-500 text-sm">
        <p>© {new Date().getFullYear()} 中国历史图鉴</p>
        <p className="mt-1">内容由 Gemini 2.5 Flash 生成</p>
      </footer>

      {/* Detail Modal */}
      {selectedDynasty && (
        <DetailModal 
          dynasty={selectedDynasty} 
          onClose={() => setSelectedDynasty(null)} 
        />
      )}
    </div>
  );
}

export default App;