/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Download, RotateCcw, AlertCircle, FileCode } from 'lucide-react';

interface ScriptTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
}

const TEMPLATES: ScriptTemplate[] = [
  {
    id: "tfidf_scratch",
    name: "01. Pure Python TF-IDF Recommender",
    description: "Builds TF-IDF vectorizer and Cosine Similarity from scratch using standard Python library.",
    code: `import math
import re
from collections import Counter

# Standard English stop words
STOP_WORDS = set([
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", 
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", 
    "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", 
    "had", "has", "have", "having", "he", "her", "here", "him", "his", "how", "i", "if", "in", 
    "into", "is", "it", "its", "me", "more", "most", "my", "no", "nor", "not", "of", "off", "on", 
    "once", "only", "or", "other", "our", "out", "over", "own", "same", "she", "should", "so", 
    "some", "such", "than", "that", "the", "their", "them", "then", "there", "these", "they", 
    "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", 
    "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would", "you", "your"
])

def tokenize(text):
    """Lowercases, strips punctuation, and removes stop words."""
    clean = re.sub(r'[^a-zA-Z0-9\\s]', ' ', text.lower())
    words = clean.split()
    return [w for w in words if len(w) > 2 and w not in STOP_WORDS]

print(f"Loaded {len(movies)} movies from corpus.")

# Step 1: Build Document Tokens
doc_tokens = []
for m in movies:
    # Combine overview with genres and keywords for rich context
    soup = f"{m.get('overview', '')} {' '.join(m.get('genres', []))} {' '.join(m.get('keywords', []))}"
    doc_tokens.append(tokenize(soup))

# Step 2: Compute Document Frequency (DF) across corpus
N = len(movies)
df_counts = Counter()
for tokens in doc_tokens:
    for word in set(tokens):
        df_counts[word] += 1

# Vocabulary sorted
vocab = sorted(df_counts.keys())
vocab_index = {w: i for i, w in enumerate(vocab)}

# Step 3: Compute Smoothed IDF: idf(t) = log((1 + N) / (1 + df(t))) + 1
idf = {}
for word, df in df_counts.items():
    idf[word] = math.log((1 + N) / (1 + df)) + 1.0

# Step 4: Vectorize Documents with L2 Normalization
def vectorize(tokens):
    tf = Counter(tokens)
    vec = {}
    sum_squares = 0.0
    for word, count in tf.items():
        if word in vocab_index:
            # Normalized Term Frequency * IDF
            val = (count / len(tokens)) * idf[word]
            vec[word] = val
            sum_squares += val * val
    
    # L2 Normalize
    norm = math.sqrt(sum_squares)
    if norm > 0:
        for word in vec:
            vec[word] /= norm
    return vec

doc_vectors = [vectorize(tokens) for tokens in doc_tokens]

def cosine_similarity(v1, v2):
    """Dot product of L2-normalized sparse vectors."""
    dot = 0.0
    for word, val1 in v1.items():
        if word in v2:
            dot += val1 * v2[word]
    return dot

# Step 5: Test Recommendations for "Inception"
target_title = "Inception"
target_idx = next((i for i, m in enumerate(movies) if m['title'] == target_title), 0)
target_movie = movies[target_idx]
target_vec = doc_vectors[target_idx]

print(f"\\nBase Movie: {target_movie['title']} ({target_movie['year']})")
print(f"Director: {target_movie['director']} | Genres: {', '.join(target_movie['genres'])}")
print("-" * 65)
print(f"{'Rank':<5} {'Title':<28} {'Similarity':<12} {'Shared Tokens'}")
print("-" * 65)

scores = []
for i, m in enumerate(movies):
    if i == target_idx:
        continue
    sim = cosine_similarity(target_vec, doc_vectors[i])
    # Identify top shared words
    shared = [w for w in target_vec if w in doc_vectors[i]]
    shared.sort(key=lambda w: target_vec[w] * doc_vectors[i][w], reverse=True)
    scores.append((m, sim, shared[:4]))

scores.sort(key=lambda x: x[1], reverse=True)

for rank, (m, sim, shared) in enumerate(scores[:6], start=1):
    shared_str = ", ".join(shared)
    print(f"#{rank:<4} {m['title']:<28} {sim*100:>6.2f}%      {shared_str}")
`
  },
  {
    id: "metadata_soup",
    name: "02. Weighted Metadata Soup Engine",
    description: "Applies feature engineering by merging Director, Cast, and Keywords with weighted multiplier tags.",
    code: `import math
import re
from collections import Counter

def clean_tag(s):
    """Clean string into uniform machine tag (e.g. 'Christopher Nolan' -> 'christopher_nolan')"""
    return re.sub(r'[^a-zA-Z0-9]', '_', s.lower().strip())

def create_soup(movie):
    # Weight multipliers: Director repeated 3x, Keywords repeated 2x, Genres 2x
    director_tags = [clean_tag(movie.get('director', ''))] * 3
    cast_tags = [clean_tag(actor) for actor in movie.get('cast', [])[:3]]
    genre_tags = [clean_tag(g) for g in movie.get('genres', [])] * 2
    keyword_tags = [clean_tag(k) for k in movie.get('keywords', [])] * 2
    overview_clean = re.sub(r'[^a-zA-Z0-9\\s]', ' ', movie.get('overview', '').lower()).split()
    
    soup_tokens = director_tags + cast_tags + genre_tags + keyword_tags + overview_clean
    return soup_tokens

print(f"Building Metadata Soups for {len(movies)} movies...")
soups = [create_soup(m) for m in movies]

# Simple Count-based Jaccard and Overlap matrix
def jaccard_similarity(tokens1, tokens2):
    s1 = set(tokens1)
    s2 = set(tokens2)
    intersection = len(s1 & s2)
    union = len(s1 | s2)
    return intersection / union if union > 0 else 0.0

# Compare The Dark Knight against all others
target_title = "The Dark Knight"
target_idx = next((i for i, m in enumerate(movies) if m['title'] == target_title), 0)
target_movie = movies[target_idx]
target_tokens = soups[target_idx]

print(f"\\nTarget: {target_movie['title']} ({target_movie['year']}) by {target_movie['director']}")
print("Top 5 Recommendations using Metadata Soup overlap:\\n")

results = []
for i, m in enumerate(movies):
    if i == target_idx:
        continue
    sim = jaccard_similarity(target_tokens, soups[i])
    common = list(set(target_tokens) & set(soups[i]))
    results.append((m, sim, common[:5]))

results.sort(key=lambda x: x[1], reverse=True)

for rank, (m, sim, common) in enumerate(results[:5], 1):
    print(f"{rank}. {m['title']} ({m['year']}) - Score: {sim:.4f}")
    print(f"   Common Tags: {', '.join(common)}")
`
  },
  {
    id: "query_search",
    name: "03. Natural Language Query Vectorizer",
    description: "Vectorizes a freeform English search prompt and computes cosine similarity ranking.",
    code: `import math
import re
from collections import Counter

# Type any user search query here:
QUERY = "psychological mystery with mind-bending memory loss and puzzle"

print(f"Query: \\"{QUERY}\\"\\n")

def simple_tokenize(text):
    return [w for w in re.sub(r'[^a-zA-Z0-9\\s]', ' ', text.lower()).split() if len(w) > 2]

query_tokens = simple_tokenize(QUERY)
print(f"Extracted Query Tokens: {query_tokens}")

# Compute score against each film's overview + keywords + themes
ranked = []
for m in movies:
    corpus_text = f"{m.get('overview', '')} {' '.join(m.get('keywords', []))} {' '.join(m.get('themes', []))}"
    tokens = simple_tokenize(corpus_text)
    token_counts = Counter(tokens)
    
    # Calculate token match score
    match_score = 0.0
    matched_words = []
    for q in query_tokens:
        if q in token_counts:
            # Term frequency with log damping
            weight = 1.0 + math.log(token_counts[q])
            match_score += weight
            matched_words.append(q)
            
    # Normalize by document length to prevent long synopsis bias
    normalized_score = match_score / (math.sqrt(len(tokens)) + 1.0)
    if normalized_score > 0:
        ranked.append((m, normalized_score, matched_words))

ranked.sort(key=lambda x: x[1], reverse=True)

print(f"\\nTop Matches for: '{QUERY}'\\n" + "="*50)
for rank, (m, score, matched) in enumerate(ranked[:5], 1):
    print(f"#{rank} {m['title']} ({m['year']}) - Dir. {m['director']}")
    print(f"   Score: {score:.4f} | Matched Tokens: {', '.join(set(matched))}")
    print(f"   Plot Snippet: {m['overview'][:100]}...")
    print("-" * 50)
`
  }
];

export const PythonLabSection: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<ScriptTemplate>(TEMPLATES[0]);
  const [code, setCode] = useState<string>(TEMPLATES[0].code);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<{
    stdout: string;
    stderr: string;
    executionTimeMs?: number;
    success?: boolean;
    exitCode?: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (template: ScriptTemplate) => {
    setActiveTemplate(template);
    setCode(template.code);
    setOutput(null);
  };

  const handleRunPython = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const response = await fetch('/api/python/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data);
    } catch (err: any) {
      setOutput({
        stdout: '',
        stderr: err.message || 'Network request failed',
        success: false,
        exitCode: 1,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTemplate.id}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1">
            Execution Workbench
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interactive Python NLP Laboratory
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-xl">
            Execute real Python code against the movie dataset on the server runtime. Modify hyper-parameters, vector formulas, or scoring algorithms.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Python'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .py</span>
          </button>

          <button
            onClick={handleRunPython}
            disabled={isRunning}
            className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Executing Python...' : 'Run Python Script'}</span>
          </button>
        </div>
      </div>

      {/* Script Template Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => handleSelectTemplate(tpl)}
            className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all text-left cursor-pointer ${
              activeTemplate.id === tpl.id
                ? 'bg-amber-400/10 border-amber-400/50 text-amber-300'
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="font-semibold text-slate-200">{tpl.name}</div>
            <div className="text-[11px] text-slate-400 truncate max-w-xs">{tpl.description}</div>
          </button>
        ))}
      </div>

      {/* Code Editor & Console Split View */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Python Code Editor Window (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          {/* Window Title Bar */}
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                {activeTemplate.id}.py
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Dataset pre-injected in `movies` variable
            </span>
          </div>

          {/* Editable Python Codearea */}
          <div className="relative flex-1 bg-slate-950/60 p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-[420px] bg-transparent text-xs sm:text-sm font-mono text-slate-200 focus:outline-none resize-none leading-relaxed selection:bg-amber-500/20"
            />
          </div>

          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Python 3.10 standard library & regex</span>
            <button
              onClick={() => setCode(activeTemplate.code)}
              className="hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Template</span>
            </button>
          </div>
        </div>

        {/* Live Terminal Output Window (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
          <div>
            {/* Terminal Header */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Console Output</span>
              </div>
              {output && (
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                  <span className={output.success ? 'text-emerald-400' : 'text-rose-400'}>
                    {output.success ? '● Success' : '▲ Failed'}
                  </span>
                  {output.executionTimeMs !== undefined && (
                    <span className="text-slate-400 tabular-nums">
                      {output.executionTimeMs} ms
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Output Display Area */}
            <div className="p-4 font-mono text-xs overflow-y-auto max-h-[420px] min-h-[380px] leading-relaxed">
              {isRunning && (
                <div className="flex items-center gap-2 text-amber-400 py-4">
                  <span className="animate-pulse">▶ Executing Python script on host runtime...</span>
                </div>
              )}

              {!isRunning && !output && (
                <div className="text-slate-500 py-8 text-center">
                  <Terminal className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>Click "Run Python Script" to execute code against the 40-movie corpus.</p>
                </div>
              )}

              {output && output.stdout && (
                <pre className="text-slate-200 whitespace-pre-wrap selection:bg-amber-500/30">
                  {output.stdout}
                </pre>
              )}

              {output && output.stderr && (
                <div className="mt-2 pt-2 border-t border-rose-950/60 text-rose-400">
                  <div className="font-bold flex items-center gap-1 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Standard Error:</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-[11px]">{output.stderr}</pre>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Server process: python3 script.py</span>
            <span>Timeout limit: 12.0s</span>
          </div>
        </div>
      </div>
    </section>
  );
};
