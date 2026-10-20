/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Movie, MOVIES_DATASET, recommenderEngine } from '../data/movies';
import { GitCompare, Sparkles, Film, ArrowRight, BrainCircuit, Check, AlertCircle } from 'lucide-react';

interface MovieCompareSectionProps {
  initialMovieA?: Movie;
  initialMovieB?: Movie;
}

export const MovieCompareSection: React.FC<MovieCompareSectionProps> = ({
  initialMovieA,
  initialMovieB,
}) => {
  const [movieAId, setMovieAId] = useState<string>(initialMovieA?.id || "m1"); // Inception
  const [movieBId, setMovieBId] = useState<string>(initialMovieB?.id || "m4"); // Blade Runner 2049

  // Gemini deep explanation state
  const [isExplaining, setIsExplaining] = useState<boolean>(false);
  const [geminiExplanation, setGeminiExplanation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync if initial props change
  React.useEffect(() => {
    if (initialMovieA) setMovieAId(initialMovieA.id);
    if (initialMovieB) setMovieBId(initialMovieB.id);
  }, [initialMovieA, initialMovieB]);

  const movieA = useMemo(() => MOVIES_DATASET.find((m) => m.id === movieAId) || MOVIES_DATASET[0], [movieAId]);
  const movieB = useMemo(() => MOVIES_DATASET.find((m) => m.id === movieBId) || MOVIES_DATASET[1], [movieBId]);

  // Compute similarities
  const comparison = useMemo(() => {
    const tokensA = recommenderEngine.docTokens[MOVIES_DATASET.findIndex((m) => m.id === movieA.id)] || [];
    const tokensB = recommenderEngine.docTokens[MOVIES_DATASET.findIndex((m) => m.id === movieB.id)] || [];

    const vecA = recommenderEngine.vectorize(tokensA);
    const vecB = recommenderEngine.vectorize(tokensB);

    const cosine = recommenderEngine.cosineSimilarity(vecA, vecB);
    const jaccard = recommenderEngine.jaccardSimilarity(tokensA, tokensB);

    const setA = new Set(tokensA);
    const setB = new Set(tokensB);

    const shared = Array.from(setA).filter((t) => setB.has(t));
    const onlyA = Array.from(setA).filter((t) => !setB.has(t)).slice(0, 10);
    const onlyB = Array.from(setB).filter((t) => !setA.has(t)).slice(0, 10);

    return {
      cosine,
      jaccard,
      shared,
      onlyA,
      onlyB,
      tokensCountA: tokensA.length,
      tokensCountB: tokensB.length,
    };
  }, [movieA, movieB]);

  const handleDeepExplain = async () => {
    setIsExplaining(true);
    setGeminiExplanation(null);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'compare',
          movieA,
          movieB,
        }),
      });

      const data = await response.json();
      if (response.ok && data.explanation) {
        setGeminiExplanation(data.explanation);
      } else {
        setErrorMsg(data.details || data.error || 'Failed to generate explanation');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network request failed');
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
            Linguistic & Semantic Analytics
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Movie Pair Comparison & Narrative Affinity
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-xl">
            Compare two films side-by-side to understand why vector space models pair them, and generate deep semantic analysis.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleDeepExplain}
          disabled={isExplaining}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md shadow-amber-500/10 cursor-pointer disabled:opacity-50 shrink-0"
        >
          <BrainCircuit className={`w-4 h-4 ${isExplaining ? 'animate-spin' : ''}`} />
          <span>{isExplaining ? 'Analyzing with Gemini...' : 'Analyze Subtext with Gemini'}</span>
        </button>
      </div>

      {/* Selectors Row */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Film A (Source)</label>
          <select
            value={movieAId}
            onChange={(e) => {
              setMovieAId(e.target.value);
              setGeminiExplanation(null);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {MOVIES_DATASET.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title} ({m.year}) — {m.director}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Film B (Target)</label>
          <select
            value={movieBId}
            onChange={(e) => {
              setMovieBId(e.target.value);
              setGeminiExplanation(null);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {MOVIES_DATASET.map((m) => (
              <option key={m.id} value={m.id}>
                {m.title} ({m.year}) — {m.director}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-side Comparison Cards */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Film A Profile (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">
              <span>{movieA.year}</span>
              <span className="mx-1.5">·</span>
              <span>{movieA.runtime} min</span>
              <span className="mx-1.5">·</span>
              <span>Dir. {movieA.director}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{movieA.title}</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">{movieA.overview}</p>

            <div className="mt-3 flex flex-wrap gap-1 text-[11px] font-mono text-slate-300">
              {movieA.keywords.slice(0, 5).map((kw) => (
                <span key={kw} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Genres: {movieA.genres.join(', ')}</span>
            <span className="font-mono tabular-nums">{comparison.tokensCountA} tokens</span>
          </div>
        </div>

        {/* Central Mathematical Metric Hub (2 cols) */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-4">
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Cosine Similarity
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono tabular-nums mt-1">
              {(comparison.cosine * 100).toFixed(1)}%
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              cos(θ) = {comparison.cosine.toFixed(4)}
            </div>
          </div>

          <div className="w-full h-px bg-slate-800" />

          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Jaccard Overlap
            </div>
            <div className="text-lg font-bold text-slate-200 font-mono tabular-nums mt-1">
              {(comparison.jaccard * 100).toFixed(1)}%
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              {comparison.shared.length} shared terms
            </div>
          </div>
        </div>

        {/* Film B Profile (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">
              <span>{movieB.year}</span>
              <span className="mx-1.5">·</span>
              <span>{movieB.runtime} min</span>
              <span className="mx-1.5">·</span>
              <span>Dir. {movieB.director}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{movieB.title}</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">{movieB.overview}</p>

            <div className="mt-3 flex flex-wrap gap-1 text-[11px] font-mono text-slate-300">
              {movieB.keywords.slice(0, 5).map((kw) => (
                <span key={kw} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Genres: {movieB.genres.join(', ')}</span>
            <span className="font-mono tabular-nums">{comparison.tokensCountB} tokens</span>
          </div>
        </div>
      </div>

      {/* Lexical Overlap Breakdown */}
      <div className="mt-6 bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <span>Lexical Overlap & Divergence Analysis</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 font-sans font-medium block mb-2">
              Only in {movieA.title}:
            </span>
            <div className="flex flex-wrap gap-1 text-slate-300">
              {comparison.onlyA.length > 0 ? (
                comparison.onlyA.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800/80">
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 font-sans">None</span>
              )}
            </div>
          </div>

          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-3">
            <span className="text-amber-400 font-sans font-medium block mb-2">
              Intersecting Tokens (Vector Drivers):
            </span>
            <div className="flex flex-wrap gap-1 text-amber-200">
              {comparison.shared.length > 0 ? (
                comparison.shared.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 font-sans">No shared non-stopwords</span>
              )}
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 font-sans font-medium block mb-2">
              Only in {movieB.title}:
            </span>
            <div className="flex flex-wrap gap-1 text-slate-300">
              {comparison.onlyB.length > 0 ? (
                comparison.onlyB.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800/80">
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 font-sans">None</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gemini Deep Linguistic Analysis Response */}
      {geminiExplanation && (
        <div className="mt-6 bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Gemini 3.8 Flash · Computational Linguistic & Film Scholar Synthesis</span>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-wrap">
            {geminiExplanation}
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mt-4 p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </section>
  );
};
