/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Film, Terminal, Sparkles } from 'lucide-react';

interface TopBarProps {
  activeTab: 'recommender' | 'vectors' | 'python' | 'compare' | 'pipeline';
  setActiveTab: (tab: 'recommender' | 'vectors' | 'python' | 'compare' | 'pipeline') => void;
  onQuickQuery: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeTab, setActiveTab, onQuickQuery }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setActiveTab('recommender')} 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Film className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            Cine<span className="text-amber-400">NLP</span>
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('recommender')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'recommender'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Recommender
            {activeTab === 'recommender' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('vectors')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'vectors'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vector Space
            {activeTab === 'vectors' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('python')}
            className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'python'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Python Lab
            {activeTab === 'python' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'compare'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Linguistic Compare
            {activeTab === 'compare' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'pipeline'
                ? 'text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NLP Pipeline
            {activeTab === 'pipeline' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onQuickQuery}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search by Plot</span>
          </button>
        </div>
      </div>
    </header>
  );
};
