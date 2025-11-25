import React, { useEffect, useState } from 'react';
import { X, BookOpen, MapPin, User, Scroll, AlertCircle } from 'lucide-react';
import { Dynasty, DetailedHistory } from '../types';
import { fetchDynastyDetails } from '../services/geminiService';

interface DetailModalProps {
  dynasty: Dynasty;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ dynasty, onClose }) => {
  const [data, setData] = useState<DetailedHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchDynastyDetails(dynasty.name, dynasty.chineseName);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError("无法获取历史档案。请重试。");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [dynasty]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-paper-bg rounded-lg shadow-2xl border border-stone-300 flex flex-col font-serif animate-fade-in-up">
        
        {/* Header Image Area */}
        <div className="relative h-48 sm:h-64 overflow-hidden bg-stone-300 shrink-0">
            {!imgError ? (
                <img 
                src={dynasty.imageUrl} 
                alt={dynasty.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover opacity-90 sepia-[.3]"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-r from-stone-400 to-stone-600 flex items-center justify-center">
                     <span className="text-9xl font-serif text-white/10 font-bold">{dynasty.chineseName}</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-paper-bg via-transparent to-black/40" />
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white transition-colors z-10"
            >
                <X size={24} />
            </button>

            <div className="absolute bottom-4 left-6 sm:left-10 text-ink-black drop-shadow-sm z-10">
                <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-imperial-red">{dynasty.chineseName}</h2>
                <h3 className="text-xl sm:text-2xl font-serif italic text-ink-black/80">{dynasty.name} <span className="text-sm not-italic ml-2 opacity-75">({dynasty.period})</span></h3>
            </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
            
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-12 h-12 border-4 border-imperial-red border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-stone-500 italic">正在查阅古籍...</p>
                </div>
            )}

            {error && (
                <div className="flex flex-col items-center justify-center py-20 text-imperial-red space-y-2">
                    <AlertCircle size={48} />
                    <p>{error}</p>
                    <button onClick={onClose} className="text-sm underline hover:text-red-900">返回时间轴</button>
                </div>
            )}

            {!loading && !error && data && (
                <div className="animate-fade-in-up">
                    
                    {/* Introduction */}
                    <div className="prose prose-stone max-w-none mb-8">
                        <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-imperial-red first-letter:mr-1 float-left">
                            {data.introduction.charAt(0)}
                        </p>
                        <p className="text-lg leading-relaxed text-stone-800">
                           {data.introduction.slice(1)}
                        </p>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-y border-stone-300 py-6 bg-stone-100/50">
                        <div className="flex items-start space-x-3">
                            <User className="text-imperial-red mt-1 shrink-0" size={20} />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider text-stone-500">重要统治者</h4>
                                <p className="font-semibold text-ink-black">{data.emperor}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <MapPin className="text-imperial-red mt-1 shrink-0" size={20} />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider text-stone-500">都城</h4>
                                <p className="font-semibold text-ink-black">{data.capital}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <BookOpen className="text-imperial-red mt-1 shrink-0" size={20} />
                            <div>
                                <h4 className="font-bold text-sm uppercase tracking-wider text-stone-500">主流思想</h4>
                                <p className="font-semibold text-ink-black">{data.philosophy}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        
                        {/* Major Events Timeline */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-ink-black border-l-4 border-imperial-red pl-3">历史里程碑</h3>
                            <div className="relative border-l border-stone-300 ml-3 space-y-6 py-2">
                                {data.majorEvents.map((event, idx) => (
                                    <div key={idx} className="ml-6 relative">
                                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-imperial-red rounded-full ring-4 ring-paper-bg" />
                                        <span className="text-xs font-bold text-imperial-red bg-imperial-red/10 px-2 py-0.5 rounded">{event.year}</span>
                                        <h4 className="text-lg font-bold text-stone-900 mt-1">{event.event}</h4>
                                        <p className="text-stone-600 text-sm leading-relaxed">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Culture & Downfall */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-ink-black border-l-4 border-jade-green pl-3 mb-4">文化遗产</h3>
                                <ul className="space-y-3">
                                    {data.culturalAchievements.map((item, idx) => (
                                        <li key={idx} className="flex items-start space-x-2 bg-stone-50 p-3 rounded-lg border border-stone-200 shadow-sm">
                                            <Scroll size={18} className="text-jade-green mt-0.5 shrink-0"/>
                                            <span className="text-stone-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-stone-800 text-stone-100 p-6 rounded-lg shadow-inner">
                                <h3 className="text-lg font-bold text-imperial-red mb-2 uppercase tracking-widest text-xs">王朝兴衰</h3>
                                <p className="text-stone-300 italic text-sm leading-relaxed">
                                    "{data.downfall}"
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;