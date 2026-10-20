/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { tokenize, STOP_WORDS, recommenderEngine } from '../data/movies';
import { Layers, ArrowRight, CheckCircle2, Cpu, Hash, Binary } from 'lucide-react';

export const NlpPipelineVisualizer: React.FC = () => {
  const [sampleText, setSampleText] = useState(
    "A mind-bending psychological thriller set in deep space with mysterious wormholes and black hole gravity."
  );
  const [includeBigrams, setIncludeBigrams] = useState(true);

  // Live calculation of pipeline stages
  const stageData = useMemo(() => {
    // Stage 1: Lowercase & Strip Punctuation
    const rawClean = sampleText.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
    const rawTokens = rawClean.split(/\s+/).filter((w) => w.length > 0);

    // Stage 2: Stop Words Removal
    const removedWords: string[] = [];
    const filteredTokens: string[] = [];
    rawTokens.forEach((w) => {
      if (STOP_WORDS.has(w) || w.length < 2) {
        removedWords.push(w);
      } else {
        filteredTokens.push(w);
      }
    });

    // Stage 3: N-grams (Bigrams)
    const bigrams: string[] = [];
    if (includeBigrams && filteredTokens.length >= 2) {
      for (let i = 0; i < filteredTokens.length - 1; i++) {
        bigrams.push(`${filteredTokens[i]}_${filteredTokens[i + 1]}`);
      }
    }

    const allTokens = [...filteredTokens, ...bigrams];

    // Stage 4: Term Frequency & TF-IDF
    const tfMap = new Map<string, number>();
    allTokens.forEach((t) => tfMap.set(t, (tfMap.get(t) || 0) + 1));

    const weights = Array.from(tfMap.entries()).map(([term, count]) => {
      const tf = count / allTokens.length;
      const idf = recommenderEngine.idfMap.get(term) || Math.log((1 + 40) / (1 + 1)) + 1;
      const tfidf = tf * idf;
      return {
        term,
        count,
        tf,
        idf,
        tfidf,
      };
    }).sort((a, b) => b.tfidf - a.tfidf);

    return {
      rawTokens,
      removedWords,
      filteredTokens,
      bigrams,
      allTokens,
      weights,
    };
  }, [sampleText, includeBigrams]);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
            Methodology & Science
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The NLP Recommendation Pipeline
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-xl">
            How textual movie synopses transform into mathematical vectors in Euclidean space for cosine distance calculation.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Formula: <span className="text-amber-400">w(t,d) = TF(t,d) × IDF(t)</span>
        </div>
      </div>

      {/* 5-Stage Visual Workflow Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Stage 1 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-amber-400 mb-1">Stage 01</div>
            <h4 className="text-sm font-bold text-white">Metadata Soup</h4>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Aggregates movie overview, genre tags, cast members, director, and keywords into a unified text document.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
            Input: Raw String
          </div>
        </div>

        {/* Stage 2 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-amber-400 mb-1">Stage 02</div>
            <h4 className="text-sm font-bold text-white">Tokenization</h4>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Lowercases text, regex-strips punctuation, removes ~175 common English stop words, and creates 1-gram / 2-gram units.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
            Output: Token Array
          </div>
        </div>

        {/* Stage 3 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-amber-400 mb-1">Stage 03</div>
            <h4 className="text-sm font-bold text-white">TF-IDF Weighting</h4>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Computes local term frequency (TF) and dampens with inverse document frequency (IDF) so rare words carry high signal.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
            Metric: TF × IDF
          </div>
        </div>

        {/* Stage 4 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-amber-400 mb-1">Stage 04</div>
            <h4 className="text-sm font-bold text-white">L2 Normalization</h4>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Divides each document vector by its Euclidean length (||v||₂) ensuring long plot overviews don't dominate shorter synopses.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
            ||v||₂ = 1.0 Unit Vector
          </div>
        </div>

        {/* Stage 5 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-amber-400 mb-1">Stage 05</div>
            <h4 className="text-sm font-bold text-white">Cosine Ranking</h4>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Calculates the dot product between query vector and every film vector to find the nearest directional neighbors.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
            cos(θ) ∈ [0, 1]
          </div>
        </div>
      </div>

      {/* Interactive Tokenizer & TF-IDF Calculation Playground */}
      <div className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              Interactive Live Tokenizer & Weight Inspector
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Type any movie plot snippet below to trace how the NLP pipeline parses and weights each linguistic unit in real time.
            </p>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none shrink-0">
            <input
              type="checkbox"
              checked={includeBigrams}
              onChange={(e) => setIncludeBigrams(e.target.checked)}
              className="rounded border-slate-700 text-amber-400 focus:ring-0 accent-amber-400"
            />
            <span>Enable Bigrams (2-word sequences)</span>
          </label>
        </div>

        {/* Input Text Box */}
        <textarea
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          rows={2}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 leading-relaxed resize-none"
          placeholder="Type any test sentence..."
        />

        {/* Live Step Breakdown Display */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step A: Pruned Stop Words */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
              <span>Filtered Stop Words ({stageData.removedWords.length}):</span>
              <span className="text-[10px] text-slate-500 font-mono">Zero Weight</span>
            </div>
            <div className="flex flex-wrap gap-1 text-xs font-mono">
              {stageData.removedWords.map((sw, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-rose-950/40 text-rose-300 border border-rose-900/40 rounded line-through opacity-70">
                  {sw}
                </span>
              ))}
            </div>
          </div>

          {/* Step B: Retained Tokens & Bigrams */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
              <span>Retained Tokens & N-Grams ({stageData.allTokens.length}):</span>
              <span className="text-[10px] text-amber-400 font-mono">Vocab Units</span>
            </div>
            <div className="flex flex-wrap gap-1 text-xs font-mono">
              {stageData.filteredTokens.map((tok, i) => (
                <span key={`tok-${i}`} className="px-1.5 py-0.5 bg-slate-900 text-amber-300 border border-slate-800 rounded">
                  {tok}
                </span>
              ))}
              {stageData.bigrams.map((bg, i) => (
                <span key={`bg-${i}`} className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded font-semibold">
                  {bg}
                </span>
              ))}
            </div>
          </div>

          {/* Step C: Computed TF-IDF Weights */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
              <span>Top TF-IDF Weights:</span>
              <span className="text-[10px] text-slate-500 font-mono">w = TF × IDF</span>
            </div>
            <div className="space-y-1.5 text-xs font-mono max-h-48 overflow-y-auto pr-1">
              {stageData.weights.slice(0, 6).map((w) => (
                <div key={w.term} className="flex items-center justify-between p-1 bg-slate-900 rounded">
                  <span className="text-slate-300 truncate max-w-[120px]">{w.term}</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-500">idf: {w.idf.toFixed(1)}</span>
                    <span className="text-amber-400 font-bold tabular-nums">{w.tfidf.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
