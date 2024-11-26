import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { AnalysisResult } from '../types';
import { analyzeFeed } from '../utils/analyzer';
import { NewsCard } from './NewsCard';

export function NewsAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const { settings } = useSettingsStore();

  const handleAnalyze = async () => {
    if (!settings.apiKey) {
      setError('Veuillez entrer votre clé API OpenAI dans les paramètres');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newResults = await analyzeFeed(settings);
      setResults(newResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analyse des News</h2>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          Analyser le Feed
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {results.map((result, index) => (
          <NewsCard key={index} result={result} />
        ))}
        
        {!loading && results.length === 0 && (
          <div className="card p-8 text-center text-gray-500">
            <p>Cliquez sur "Analyser le Feed" pour commencer l'analyse des actualités</p>
          </div>
        )}
      </div>
    </div>
  );
}