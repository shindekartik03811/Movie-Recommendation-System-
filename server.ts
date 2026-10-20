/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '2mb' }));

// Initialize Google Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Load the movies data for server-side python injection
let cachedMoviesData: any[] = [];
try {
  // Read movies dataset from source for python execution
  const moviesFilePath = path.join(__dirname, 'src', 'data', 'movies.ts');
  if (fs.existsSync(moviesFilePath)) {
    const rawContent = fs.readFileSync(moviesFilePath, 'utf-8');
    // Extract MOVIES_DATASET array
    const startIdx = rawContent.indexOf('export const MOVIES_DATASET: Movie[] = [');
    if (startIdx !== -1) {
      const arrayStart = rawContent.indexOf('[', startIdx);
      const arrayEnd = rawContent.indexOf('];', arrayStart);
      if (arrayStart !== -1 && arrayEnd !== -1) {
        const jsonLike = rawContent.substring(arrayStart, arrayEnd + 1);
        // Clean up TS formatting into JSON-parseable or eval-safe
        try {
          // Use Function constructor in isolated scope to parse JS object literal
          const parsed = new Function(`return ${jsonLike};`)();
          cachedMoviesData = parsed;
        } catch (e) {
          console.warn('Could not parse movies dataset into JS array, will use fallback minimal corpus');
        }
      }
    }
  }
} catch (err) {
  console.warn('Error reading movies.ts on server init:', err);
}

// Fallback if empty
if (cachedMoviesData.length === 0) {
  cachedMoviesData = [
    { id: "m1", title: "Inception", year: 2010, director: "Christopher Nolan", genres: ["Sci-Fi", "Action"], overview: "A thief who steals corporate secrets through dream-sharing technology is tasked with inception." },
    { id: "m2", title: "Interstellar", year: 2014, director: "Christopher Nolan", genres: ["Sci-Fi", "Drama"], overview: "A team of explorers travel through a wormhole in space to ensure humanity's survival." },
    { id: "m3", title: "The Matrix", year: 1999, director: "The Wachowskis", genres: ["Sci-Fi", "Action"], overview: "A computer hacker learns about the true nature of his reality and his role in the war." }
  ];
}

/**
 * Execute Python NLP code on the server
 */
app.post('/api/python/execute', async (req, res) => {
  const { code } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  // Create temporary directory and file
  const tmpDir = os.tmpdir();
  const scriptName = `nlp_recommender_${Date.now()}_${Math.random().toString(36).substring(7)}.py`;
  const scriptPath = path.join(tmpDir, scriptName);
  const dataPath = path.join(tmpDir, `movies_data_${Date.now()}.json`);

  try {
    // Write movies dataset to a temp JSON file that Python can read via helper or direct load
    fs.writeFileSync(dataPath, JSON.stringify(cachedMoviesData, null, 2), 'utf-8');

    // Prepend Python bootstrap so user code can access `movies` or `movies_data.json` directly
    const bootstrapCode = `
import json
import sys
import os

DATA_FILE = r"${dataPath}"
try:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        movies = json.load(f)
except Exception as e:
    movies = []

# --- USER CODE START ---
${code}
# --- USER CODE END ---
`;

    fs.writeFileSync(scriptPath, bootstrapCode, 'utf-8');

    const startTime = Date.now();
    let stdout = '';
    let stderr = '';

    const pyProcess = spawn('python3', [scriptPath], {
      timeout: 12000, // 12 seconds max
      env: { ...process.env, PYTHONUNBUFFERED: '1', PYTHONDONTWRITEBYTECODE: '1' }
    });

    pyProcess.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
      if (stdout.length > 50000) {
        pyProcess.kill();
      }
    });

    pyProcess.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
      if (stderr.length > 20000) {
        pyProcess.kill();
      }
    });

    pyProcess.on('close', (exitCode) => {
      const executionTimeMs = Date.now() - startTime;

      // Clean up temp files
      try {
        if (fs.existsSync(scriptPath)) fs.unlinkSync(scriptPath);
        if (fs.existsSync(dataPath)) fs.unlinkSync(dataPath);
      } catch (cleanErr) {
        // ignore cleanup error
      }

      res.json({
        success: exitCode === 0,
        exitCode,
        stdout,
        stderr,
        executionTimeMs
      });
    });

    pyProcess.on('error', (err) => {
      res.status(500).json({
        error: 'Failed to start Python process',
        details: err.message
      });
    });

  } catch (error: any) {
    res.status(500).json({ error: 'Server execution failure', details: error.message });
  }
});

/**
 * Gemini NLP Semantic Narrative Explainer
 */
app.post('/api/gemini/explain', async (req, res) => {
  const { movieA, movieB, query, mode } = req.body;

  try {
    let prompt = '';
    if (mode === 'compare' && movieA && movieB) {
      prompt = `You are a Senior Computational Linguist and Film Scholar analyzing a content-based recommendation system.
Compare these two films from an NLP and thematic standpoint:
Film 1: "${movieA.title}" (${movieA.year}), directed by ${movieA.director}. Overview: "${movieA.overview}". Keywords: ${movieA.keywords?.join(', ')}.
Film 2: "${movieB.title}" (${movieB.year}), directed by ${movieB.director}. Overview: "${movieB.overview}". Keywords: ${movieB.keywords?.join(', ')}.

Provide a structured, insightful analysis with:
1. **Thematic & Conceptual Affinity**: What subtextual and narrative parallels connect them beyond surface keywords?
2. **Linguistic Vector Overlap**: Which specific narrative motifs and tropes create high mathematical cosine similarity?
3. **Pacing & Emotional Tone**: How do their cinematic pacing and viewer emotional states align?
4. **Recommendation Verdict**: Why a fan of "${movieA.title}" will appreciate "${movieB.title}".

Keep the response concise (200-300 words), engaging, and formatted in clean markdown.`;
    } else if (query) {
      prompt = `You are an NLP Recommendation System explainer.
A user searched with the natural language query: "${query}".
Explain in 2 short paragraphs how an NLP vectorizer extracts intent from this query (tokens, semantic weights, subtextual genres) and what cinematic elements it maps to in the movie corpus.`;
    } else {
      return res.status(400).json({ error: 'Invalid comparison parameters' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({
      explanation: response.text,
      modelUsed: 'gemini-3.8-flash'
    });
  } catch (err: any) {
    console.error('Gemini API error:', err);
    res.status(500).json({
      error: 'Failed to generate semantic analysis',
      details: err.message || 'Unknown error'
    });
  }
});

/**
 * API route to get dataset overview
 */
app.get('/api/dataset-info', (req, res) => {
  res.json({
    totalMovies: cachedMoviesData.length,
    genres: Array.from(new Set(cachedMoviesData.flatMap((m: any) => m.genres || []))),
    directors: Array.from(new Set(cachedMoviesData.map((m: any) => m.director).filter(Boolean))),
  });
});

// Mount Vite or static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineNLP server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
