/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Movie, MOVIES_DATASET, NlpRecommenderEngine } from '../data/movies';
import { Sliders, Sparkles, Film, ArrowRight, Layers, HelpCircle, Check, BookOpen } from 'lucide-react';

interface RecommenderSectionProps {
  onCompareRequest: (movieA: Movie, movieB: Movie) => void;
  externalQuery?: string;
  onClearExternalQuery?: () => void;
}

export const RecommenderSection: React.FC<RecommenderSectionProps> = ({
  onCompareRequest,
  externalQuery,
  onClearExternalQuery,
}) => {
  const [selectedMovieId, setSelectedMovieId] = useState<string>("m1"); // Inception by default
  const [queryText, setQueryText] = useState<string>(externalQuery || "");
  const [mode, setMode] = useState<'movie' | 'query'>(externalQuery ? 'query' : 'movie');
  
  // NLP Hyperparameters
  const [algorithm, setAlgorithm] = useState<'soup' | 'tfidf' | 'subtext'>('soup');
  const [useBigrams, setUseBigrams] = useState<boolean>(true);
  const [overviewWeight, setOverviewWeight] = useState<number>(1.2);
  const [genreWeight, setGenreWeight] = useState<number>(1.5);
  const [keywordWeight, setKeywordWeight] = useState<number>(2.0);
  const [directorWeight, setDirectorWeight] = useState<number>(1.0);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [inspectedMovie, setInspectedMovie] = useState<Movie | null>(null);

  // Sync external query if updated from hero
  React.useEffect(() => {
    if (externalQuery) {
      setQueryText(externalQuery);
      setMode('query');
    }
  }, [externalQuery]);

  // Active recommender engine instance based on bigram settings
  const engine = useMemo(() => {
    const inst = new NlpRecommenderEngine(MOVIES_DATASET, { useBigrams });
    inst.fit({
      overview: overviewWeight,
      genres: genreWeight,
      keywords: keywordWeight,
      director: directorWeight,
      cast: 1.0,
      themes: 1.5,
    });
    return inst;
  }, [useBigrams, overviewWeight, genreWeight, keywordWeight, directorWeight]);

  const selectedMovie = useMemo(() => {
    return MOVIES_DATASET.find((m) => m.id === selectedMovieId) || MOVIES_DATASET[0];
  }, [selectedMovieId]);

  // Compute recommendations
  const recommendations = useMemo(() => {
    if (mode === 'movie') {
      return engine.getRecommendationsForMovie(selectedMovieId, 8);
    } else {
      if (!queryText.trim()) return [];
      return engine.getRecommendationsForQuery(queryText, 8).map((r) => ({
        ...r,
        jaccard: 0,
      }));
    }
  }, [mode, selectedMovieId, queryText, engine]);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
            Core Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Vector Similarity & Recommendations
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-xl">
            Choose a seed film or enter a custom plot prompt to compute cosine similarity rankings across the movie corpus.
          </p>
        </div>

        {/* Mode Selector Tabs (Clean interactive button group) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => {
              setMode('movie');
              if (onClearExternalQuery) onClearExternalQuery();
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'movie'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Seed Movie Match</span>
          </button>

          <button
            onClick={() => setMode('query')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              mode === 'query'
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Plot Prompt</span>
          </button>
        </div>
      </div>

      {/* Control Strip & Model Configuration */}
      <div className="mt-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {mode === 'movie' ? (
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Select Base Film to Match
              </label>
              <select
                value={selectedMovieId}
                onChange={(e) => setSelectedMovieId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {MOVIES_DATASET.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title} ({movie.year}) · Dir: {movie.director} · [{movie.genres.join(', ')}]
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Natural Language Plot or Vibe Query
              </label>
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Describe themes, tone, atmosphere or specific plot mechanics..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {/* Model & Hyperparameter Toggles */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Algorithm:</span>
              <div className="flex items-center p-0.5 bg-slate-950 border border-slate-800 rounded-lg text-xs">
                <button
                  onClick={() => setAlgorithm('soup')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    algorithm === 'soup' ? 'bg-slate-800 text-amber-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Metadata Soup
                </button>
                <button
                  onClick={() => setAlgorithm('tfidf')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    algorithm === 'tfidf' ? 'bg-slate-800 text-amber-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  TF-IDF Plot
                </button>
                <button
                  onClick={() => setAlgorithm('subtext')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    algorithm === 'subtext' ? 'bg-slate-800 text-amber-400 font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Thematic Affinity
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                showConfig
                  ? 'bg-amber-400/10 border-amber-400/40 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Weights & N-Grams</span>
            </button>
          </div>
        </div>

        {/* Collapsible NLP Tuning Deck */}
        {showConfig && (
          <div className="mt-5 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 text-xs">
            <div>
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span>Plot Synopsis Weight</span>
                <span className="font-mono text-amber-400">{overviewWeight.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={overviewWeight}
                onChange={(e) => setOverviewWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span>Genre Weight</span>
                <span className="font-mono text-amber-400">{genreWeight.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={genreWeight}
                onChange={(e) => setGenreWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span>Keywords Weight</span>
                <span className="font-mono text-amber-400">{keywordWeight.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={keywordWeight}
                onChange={(e) => setKeywordWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span>Director/Cast Weight</span>
                <span className="font-mono text-amber-400">{directorWeight.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="3.0"
                step="0.1"
                value={directorWeight}
                onChange={(e) => setDirectorWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={useBigrams}
                  onChange={(e) => setUseBigrams(e.target.checked)}
                  className="rounded border-slate-700 text-amber-400 focus:ring-0 accent-amber-400"
                />
                <span>Include Bigrams (e.g. "time_travel")</span>
              </label>
              <div className="text-[11px] text-slate-500 mt-1">
                Expands vocabulary to 2-word phrase patterns
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Base Film Banner (when in movie mode) */}
      {mode === 'movie' && selectedMovie && (
        <div className="mt-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="font-semibold text-amber-400 uppercase tracking-wider">Target Film</span>
              <span aria-hidden="true">·</span>
              <span>{selectedMovie.year}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedMovie.runtime} min</span>
              <span aria-hidden="true">·</span>
              <span>Dir. {selectedMovie.director}</span>
            </div>
            <h3 className="text-xl font-bold text-white">{selectedMovie.title}</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 line-clamp-2">
              "{selectedMovie.tagline}" — {selectedMovie.overview}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-300">Genres:</span>
              <span>{selectedMovie.genres.join(', ')}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-300">Themes:</span>
              <span>{selectedMovie.themes.join(', ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-center">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Vocabulary Density</div>
              <div className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                {engine.docTokens[MOVIES_DATASET.findIndex((m) => m.id === selectedMovie.id)]?.length || 0} tokens
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-slate-200">
            Top Recommendations Ranked by Cosine Similarity <span className="font-mono text-amber-400">cos(θ)</span>
          </div>
          <div className="text-xs text-slate-400">
            Showing top {recommendations.length} matching films
          </div>
        </div>

        {recommendations.length === 0 ? (
          <div className="p-12 text-center border border-slate-800 rounded-2xl bg-slate-900/30">
            <p className="text-slate-400 text-sm">No matching movies found for this query. Try different terms or broaden the query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendations.map((rec, index) => {
              const scorePct = Math.round(rec.similarity * 100);
              const movie = rec.movie;

              return (
                <div
                  key={movie.id}
                  className="group relative flex flex-col justify-between bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-black/40"
                >
                  <div>
                    {/* Top Card Row */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="text-xs text-slate-400">
                        <span className="font-mono font-bold text-slate-200">#{index + 1}</span>
                        <span className="mx-1.5">·</span>
                        <span>{movie.year}</span>
                      </div>

                      {/* Cosine Match Badge */}
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-400/10 border border-amber-400/30 rounded-md">
                        <span className="text-[10px] text-slate-400 font-mono">cos</span>
                        <span className="text-xs font-bold text-amber-400 font-mono tabular-nums">
                          {scorePct}%
                        </span>
                      </div>
                    </div>

                    {/* Movie Title & Director */}
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {movie.title}
                    </h4>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Dir. {movie.director}
                    </div>

                    {/* Genres as clean unboxed text */}
                    <div className="mt-2 text-xs text-slate-400 flex flex-wrap items-center gap-1.5">
                      {movie.genres.map((g, i) => (
                        <React.Fragment key={g}>
                          <span className="text-slate-300">{g}</span>
                          {i < movie.genres.length - 1 && <span className="text-slate-600">·</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Overview snippet */}
                    <p className="mt-3 text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {movie.overview}
                    </p>

                    {/* Shared Tokens Attribution */}
                    {rec.sharedTokens.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80">
                        <div className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center justify-between">
                          <span>Key Matching Tokens:</span>
                          <span className="text-[10px] text-amber-400 font-mono">TF-IDF Vector</span>
                        </div>
                        <div className="flex flex-wrap gap-1 text-[11px] font-mono">
                          {rec.sharedTokens.map((st) => (
                            <span
                              key={st.token}
                              className="px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-amber-300/90"
                              title={`Vector contribution: ${(st.weight * 100).toFixed(2)}`}
                            >
                              {st.token.replace(/_/g, " ")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setInspectedMovie(movie)}
                      className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    {mode === 'movie' && (
                      <button
                        onClick={() => onCompareRequest(selectedMovie, movie)}
                        className="text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Compare</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Inspect Movie Drawer / Modal */}
      {inspectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Movie NLP Profile
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {inspectedMovie.title} ({inspectedMovie.year})
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Directed by {inspectedMovie.director} · Rating: {inspectedMovie.rating}/10 · {inspectedMovie.runtime} min
                </div>
              </div>
              <button
                onClick={() => setInspectedMovie(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="font-semibold text-slate-300 block mb-1">Tagline:</span>
                <span className="text-slate-300 italic">"{inspectedMovie.tagline}"</span>
              </div>

              <div>
                <span className="font-semibold text-slate-300 block mb-1">Plot Synopsis:</span>
                <p className="text-slate-300 leading-relaxed">{inspectedMovie.overview}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <span className="font-semibold text-slate-300 block mb-1.5">Keywords & Tokens:</span>
                  <div className="flex flex-wrap gap-1 font-mono text-xs text-amber-300">
                    {inspectedMovie.keywords.map((kw) => (
                      <span key={kw} className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <span className="font-semibold text-slate-300 block mb-1.5">Thematic Elements:</span>
                  <div className="flex flex-wrap gap-1 text-xs text-slate-300">
                    {inspectedMovie.themes.map((th) => (
                      <span key={th} className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {th}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Cast: <span className="text-slate-300">{inspectedMovie.cast.join(', ')}</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedMovieId(inspectedMovie.id);
                    setMode('movie');
                    setInspectedMovie(null);
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Use as Base Film
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
