/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { RecommenderSection } from './components/RecommenderSection';
import { VectorSpaceSection } from './components/VectorSpaceSection';
import { PythonLabSection } from './components/PythonLabSection';
import { MovieCompareSection } from './components/MovieCompareSection';
import { NlpPipelineVisualizer } from './components/NlpPipelineVisualizer';
import { Footer } from './components/Footer';
import { Movie } from './data/movies';

export default function App() {
  const [activeTab, setActiveTab] = useState<'recommender' | 'vectors' | 'python' | 'compare' | 'pipeline'>('recommender');
  const [externalQuery, setExternalQuery] = useState<string>('');
  const [compareMovieA, setCompareMovieA] = useState<Movie | undefined>(undefined);
  const [compareMovieB, setCompareMovieB] = useState<Movie | undefined>(undefined);

  const recommenderRef = useRef<HTMLDivElement>(null);
  const vectorsRef = useRef<HTMLDivElement>(null);
  const pythonRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: 'recommender' | 'vectors' | 'python' | 'compare' | 'pipeline') => {
    setActiveTab(tab);
    if (tab === 'recommender') recommenderRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'vectors') vectorsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'python') pythonRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'compare') compareRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'pipeline') pipelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroSearch = (query: string) => {
    setExternalQuery(query);
    setActiveTab('recommender');
    recommenderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCompareRequest = (movieA: Movie, movieB: Movie) => {
    setCompareMovieA(movieA);
    setCompareMovieB(movieB);
    setActiveTab('compare');
    compareRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onQuickQuery={() => {
          setActiveTab('recommender');
          recommenderRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearchSubmit={handleHeroSearch}
          onExplorePreset={handleHeroSearch}
        />

        {/* Recommender Section */}
        <div ref={recommenderRef}>
          <RecommenderSection
            onCompareRequest={handleCompareRequest}
            externalQuery={externalQuery}
            onClearExternalQuery={() => setExternalQuery('')}
          />
        </div>

        {/* Vector Space Heatmap & PCA Scatter Section */}
        <div ref={vectorsRef}>
          <VectorSpaceSection />
        </div>

        {/* Interactive Python NLP Laboratory */}
        <div ref={pythonRef}>
          <PythonLabSection />
        </div>

        {/* Linguistic & Subtext Movie Comparison */}
        <div ref={compareRef}>
          <MovieCompareSection
            initialMovieA={compareMovieA}
            initialMovieB={compareMovieB}
          />
        </div>

        {/* NLP Step-by-Step Educational Pipeline Visualizer */}
        <div ref={pipelineRef}>
          <NlpPipelineVisualizer />
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleTabChange} />
    </div>
  );
}
