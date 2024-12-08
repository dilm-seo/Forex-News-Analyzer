import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { SignalsList } from './SignalsList';
import { TradingSignal } from '../../types';
import { useSettingsStore } from '../../store/settingsStore';
import { analyzeFeed } from '../../utils/analyzer';
import { extractTradingOpportunity } from '../../utils/analysisParser';

export function TradingSignals() {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { settings } = useSettingsStore();

  const handleAnalyze = async () => {
    if (!settings.apiKey) {
      setError('Veuillez configurer votre clé API OpenAI dans les paramètres');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await analyzeFeed(settings);
      const newSignals = results
        .map(result => {
          const opportunity = extractTradingOpportunity(result.analysis);
          if (!opportunity) return null;
          
          return {
            pair: opportunity.pair,
            direction: opportunity.direction,
            impact: opportunity.impact,
            reasons: opportunity.reasons,
            timestamp: result.timestamp
          };
        })
        .filter((signal): signal is TradingSignal => signal !== null);

      setSignals(newSignals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Signaux de Trading</h2>
          <p className="text-gray-500">Analyse en temps réel des opportunités forex</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          Analyser
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <SignalsList signals={signals} />
    </div>
  );
}