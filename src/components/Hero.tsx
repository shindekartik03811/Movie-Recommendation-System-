/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onSearchSubmit: (query: string) => void;
  onExplorePreset: (query: string) => void;
}

const PRESET_QUERIES = [
  "Cerebral psychological thriller with mind-bending twists and memory trauma",
  "Epic atmospheric space exploration driven by love and time dilation",
  "Cyberpunk neo-noir exploring synthetic humans and existential dread",
  "Dark satire exploring extreme socioeconomic inequality and deception",
  "Enchanting mythical animation with spirit worlds and coming of age"
];

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit, onExplorePreset }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      {/* Background Image Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/cinenlp_hero_cinema_1792492236785.jpg"
          alt="Cinema theatre with film projector beam"
          className="w-full h-full object-cover opacity-25 filter brightness-75 contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-14 text-center">
        {/* Kicker / Category */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 mb-4">
          <span>Natural Language Processing</span>
          <span aria-hidden="true">·</span>
          <span>Information Retrieval</span>
          <span aria-hidden="true">·</span>
          <span>Python Vectorization</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto text-balance leading-tight">
          Movie Recommendation System Powered by <span className="text-amber-400">NLP</span> and <span className="text-amber-400">Python</span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Discover films through content-based filtering, TF-IDF vector space modeling, 
          and cosine distance ranking. Inspect the linguistic mechanics and execute live Python code.
        </p>

        {/* Natural Language Search Input */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 focus-within:border-amber-400 rounded-xl p-1.5 shadow-xl shadow-black/50 transition-all backdrop-blur-sm">
            <div className="pl-3.5 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Describe what you want to watch (e.g. 'dream within dream heist with emotional grief')..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none px-2 py-2"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm active:scale-98"
            >
              <span>Recommend</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Prompt Suggestions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto text-xs">
          <span className="text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Try prompts:
          </span>
          {PRESET_QUERIES.map((query, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchInput(query);
                onExplorePreset(query);
              }}
              className="text-slate-300 hover:text-amber-300 hover:underline transition-colors text-left truncate max-w-xs cursor-pointer"
            >
              "{query}"
              {index < PRESET_QUERIES.length - 1 && <span className="text-slate-600 ml-2">/</span>}
            </button>
          ))}
        </div>

        {/* Quiet Scientific Metrics Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div>
            <span className="font-bold text-slate-200 font-mono tabular-nums">40</span> Curated Masterpieces
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            <span className="font-bold text-slate-200 font-mono tabular-nums">1,420+</span> Term Vocabulary
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            TF-IDF & Cosine Similarity <span className="font-bold text-amber-400">cos(θ)</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            Interactive <span className="font-bold text-slate-200">Python 3.10</span> Engine
          </div>
        </div>
      </div>
    </section>
  );
};
