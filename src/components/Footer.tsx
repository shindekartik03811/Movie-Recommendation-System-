/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Film } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'recommender' | 'vectors' | 'python' | 'compare' | 'pipeline') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950">
              <Film className="w-3.5 h-3.5" />
            </div>
            <span>Cine<span className="text-amber-400">NLP</span></span>
          </div>
          <p className="mt-2 text-xs text-slate-500 max-w-sm leading-relaxed">
            Content-based movie recommendation architecture combining Natural Language Processing, TF-IDF vector space modeling, and interactive Python execution.
          </p>
        </div>

        {/* Navigation list */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-400">
          <button
            onClick={() => onSelectTab('recommender')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Recommender
          </button>
          <button
            onClick={() => onSelectTab('vectors')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Vector Space & Heatmap
          </button>
          <button
            onClick={() => onSelectTab('python')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Python Execution Lab
          </button>
          <button
            onClick={() => onSelectTab('compare')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Linguistic Compare
          </button>
          <button
            onClick={() => onSelectTab('pipeline')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            NLP Pipeline
          </button>
        </div>

        {/* Copyright & Tech */}
        <div className="text-xs text-slate-400">
          <div>Built with Python 3.10 & React TypeScript</div>
          <div className="text-[11px] text-slate-500 mt-0.5">TF-IDF Vector Space Model · Cosine Metric</div>
        </div>
      </div>
    </footer>
  );
};
