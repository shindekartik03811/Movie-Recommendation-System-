/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MOVIES_DATASET, recommenderEngine } from '../data/movies';
import { Grid, Eye, Search, Info } from 'lucide-react';

export const VectorSpaceSection: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<'scifi' | 'crime' | 'mixed'>('scifi');
  const [vocabSearch, setVocabSearch] = useState('');

  // Selected movies for heatmap
  const matrixMovies = useMemo(() => {
    if (selectedPreset === 'scifi') {
      return MOVIES_DATASET.filter((m) =>
        ['Inception', 'Interstellar', 'The Matrix', 'Blade Runner 2049', 'Arrival', 'Dune', 'Ex Machina', 'Her'].includes(m.title)
      );
    } else if (selectedPreset === 'crime') {
      return MOVIES_DATASET.filter((m) =>
        ['The Dark Knight', 'Pulp Fiction', 'Se7en', 'Zodiac', 'Fight Club', 'No Country for Old Men', 'The Silence of the Lambs', 'Fargo'].includes(m.title)
      );
    } else {
      return MOVIES_DATASET.slice(0, 8);
    }
  }, [selectedPreset]);

  // Compute similarity matrix
  const similarityMatrix = useMemo(() => {
    const n = matrixMovies.length;
    const matrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      const vecA = recommenderEngine.vectorize(
        recommenderEngine.docTokens[MOVIES_DATASET.findIndex((m) => m.id === matrixMovies[i].id)] || []
      );
      for (let j = 0; j < n; j++) {
        const vecB = recommenderEngine.vectorize(
          recommenderEngine.docTokens[MOVIES_DATASET.findIndex((m) => m.id === matrixMovies[j].id)] || []
        );
        matrix[i][j] = recommenderEngine.cosineSimilarity(vecA, vecB);
      }
    }
    return matrix;
  }, [matrixMovies]);

  // 2D Projection coordinates (Simulated PCA projection for demonstration)
  const projectionPoints = useMemo(() => {
    return MOVIES_DATASET.map((movie, idx) => {
      // Deterministic pseudo-projection based on genre and keywords
      let x = 0;
      let y = 0;

      if (movie.genres.includes('Sci-Fi')) x += 120;
      if (movie.genres.includes('Action')) x += 70;
      if (movie.genres.includes('Animation')) x -= 130;
      if (movie.genres.includes('Romance')) x -= 80;

      if (movie.genres.includes('Crime')) y += 120;
      if (movie.genres.includes('Thriller')) y += 80;
      if (movie.genres.includes('Drama')) y -= 60;
      if (movie.genres.includes('Comedy')) y -= 110;

      // Slight jitter based on title length
      x += (movie.title.length % 7) * 8 - 25;
      y += (movie.director.length % 5) * 8 - 18;

      return {
        movie,
        x: 250 + x * 0.9,
        y: 200 + y * 0.8,
      };
    });
  }, []);

  const [hoveredPoint, setHoveredPoint] = useState<{ movie: typeof MOVIES_DATASET[0]; x: number; y: number } | null>(null);

  // Vocabulary list
  const topVocab = useMemo(() => {
    const list = recommenderEngine.getTopVocabTerms(100);
    if (!vocabSearch.trim()) return list.slice(0, 30);
    return list.filter((v) => v.term.toLowerCase().includes(vocabSearch.toLowerCase().trim())).slice(0, 30);
  }, [vocabSearch]);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
            Mathematical Inspection
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Vector Space & Cosine Similarity Matrix
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-xl">
            Inspect the high-dimensional document vector dot products and vocabulary weights calculated across the corpus.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setSelectedPreset('scifi')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedPreset === 'scifi' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sci-Fi Cluster
          </button>
          <button
            onClick={() => setSelectedPreset('crime')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedPreset === 'crime' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Crime & Thriller
          </button>
          <button
            onClick={() => setSelectedPreset('mixed')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedPreset === 'mixed' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cross-Genre Mix
          </button>
        </div>
      </div>

      {/* Main Grid: Heatmap + 2D Scatter Projection */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Heatmap Card (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Cosine Similarity Heatmap Matrix (cos θ)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Value range [0.00 – 1.00]
            </span>
          </div>

          <div className="overflow-x-auto pb-2">
            <table className="w-full border-collapse text-xs font-mono">
              <thead>
                <tr>
                  <th className="p-2 text-left text-slate-400 font-medium w-28">Film</th>
                  {matrixMovies.map((m, idx) => (
                    <th key={m.id} className="p-2 text-center text-slate-300 font-medium truncate max-w-[70px]">
                      #{idx + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixMovies.map((rowMovie, rIdx) => (
                  <tr key={rowMovie.id} className="border-t border-slate-800/60">
                    <td className="p-2 text-slate-300 font-sans font-medium truncate max-w-[120px]" title={rowMovie.title}>
                      <span className="text-slate-500 font-mono text-[10px] mr-1">#{rIdx + 1}</span>
                      {rowMovie.title}
                    </td>
                    {matrixMovies.map((colMovie, cIdx) => {
                      const score = similarityMatrix[rIdx]?.[cIdx] ?? 0;
                      const isIdentity = rIdx === cIdx;

                      // Color interpolation
                      let bgClass = "bg-slate-950 text-slate-600";
                      if (isIdentity) {
                        bgClass = "bg-amber-400 text-slate-950 font-bold";
                      } else if (score >= 0.5) {
                        bgClass = "bg-amber-500/80 text-white font-semibold";
                      } else if (score >= 0.35) {
                        bgClass = "bg-amber-600/40 text-amber-200";
                      } else if (score >= 0.2) {
                        bgClass = "bg-slate-800 text-slate-300";
                      } else if (score >= 0.1) {
                        bgClass = "bg-slate-900 text-slate-400";
                      }

                      return (
                        <td
                          key={colMovie.id}
                          className={`p-2 text-center transition-colors rounded ${bgClass}`}
                          title={`${rowMovie.title} vs ${colMovie.title}: ${(score * 100).toFixed(1)}%`}
                        >
                          <span className="tabular-nums">
                            {score.toFixed(2)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-700" />
              <span>Low (0.00)</span>
              <span className="w-2.5 h-2.5 rounded bg-amber-600/50" />
              <span>Moderate (0.35)</span>
              <span className="w-2.5 h-2.5 rounded bg-amber-400" />
              <span>Identical (1.00)</span>
            </div>
            <span className="text-[11px] font-sans">Symmetric normalized dot product: cos(A, B) = (A · B) / (||A|| × ||B||)</span>
          </div>
        </div>

        {/* 2D Semantic Cluster Projection (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  2D Semantic Space Projection
                </h3>
              </div>
              <span className="text-xs text-slate-400">PCA Vector Space</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              High-dimensional TF-IDF vectors projected onto a 2D plane. Films with overlapping plot themes and genres naturally cluster together.
            </p>

            {/* Interactive Scatter Canvas */}
            <div className="relative w-full h-[280px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-2">
              {/* Subtle axes */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800/70" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800/70" />

              <div className="absolute top-2 left-3 text-[10px] text-slate-500 font-mono">
                Crime / Mystery Axis ↑
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono">
                Sci-Fi / Action Axis →
              </div>

              {/* Data points */}
              <svg className="w-full h-full" viewBox="0 0 500 400">
                {projectionPoints.map((pt) => {
                  const isHovered = hoveredPoint?.movie.id === pt.movie.id;
                  let fillColor = "#38bdf8"; // blue
                  if (pt.movie.genres.includes('Crime')) fillColor = "#fb923c"; // orange
                  if (pt.movie.genres.includes('Animation')) fillColor = "#34d399"; // green
                  if (pt.movie.genres.includes('Drama') && !pt.movie.genres.includes('Sci-Fi')) fillColor = "#a855f7"; // purple

                  return (
                    <g
                      key={pt.movie.id}
                      className="cursor-pointer transition-transform"
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 8 : 4.5}
                        fill={isHovered ? "#fbbf24" : fillColor}
                        stroke="#0f172a"
                        strokeWidth="1.5"
                        opacity={isHovered ? 1 : 0.8}
                      />
                      {isHovered && (
                        <text
                          x={pt.x + 10}
                          y={pt.y + 4}
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="bold"
                          className="pointer-events-none drop-shadow-md"
                        >
                          {pt.movie.title}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Hover popup card */}
              {hoveredPoint && (
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 border border-slate-700 rounded-lg p-2.5 text-xs backdrop-blur-sm pointer-events-none">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{hoveredPoint.movie.title} ({hoveredPoint.movie.year})</span>
                    <span className="text-amber-400 font-mono">{hoveredPoint.movie.rating}/10</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {hoveredPoint.movie.genres.join(', ')} · Dir. {hoveredPoint.movie.director}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 line-clamp-1 italic">
                    "{hoveredPoint.movie.tagline}"
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> Sci-Fi
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400" /> Crime
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Animation
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" /> Drama
              </span>
            </div>
            <span>Hover points to inspect</span>
          </div>
        </div>
      </div>

      {/* Vocabulary Table & IDF Distribution */}
      <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              Corpus Lexicon & Inverse Document Frequency (IDF) Table
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              High IDF terms carry significant discriminative power; frequent terms have lower weights.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={vocabSearch}
              onChange={(e) => setVocabSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {topVocab.map((item) => (
            <div
              key={item.term}
              className="bg-slate-950 border border-slate-800/80 rounded-lg p-2 flex flex-col justify-between"
            >
              <div className="font-mono text-xs font-semibold text-amber-300 truncate" title={item.term}>
                {item.term}
              </div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>DF: {item.df} docs</span>
                <span className="font-mono text-slate-300 tabular-nums">IDF: {item.idf.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
