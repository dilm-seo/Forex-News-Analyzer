import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLink } from 'lucide-react';
import { AnalysisResult } from '../types';
import { SentimentChart } from './SentimentChart';
import { ImpactIndicator } from './ImpactIndicator';
import { TradingOpportunity } from './TradingOpportunity';
import { extractSentimentData, extractTradingOpportunity } from '../utils/analysisParser';

interface NewsCardProps {
  result: AnalysisResult;
}

export function NewsCard({ result }: NewsCardProps) {
  const { sentiment, impact } = useMemo(() => 
    extractSentimentData(result.analysis),
    [result.analysis]
  );

  const tradingOpp = useMemo(() => 
    extractTradingOpportunity(result.analysis),
    [result.analysis]
  );

  return (
    <div className="card p-6 space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{result.newsItem.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(result.newsItem.pubDate).toLocaleString('fr-FR', {
              dateStyle: 'long',
              timeStyle: 'short'
            })}
          </p>
        </div>
        <ImpactIndicator impact={impact} />
      </div>

      {tradingOpp && <TradingOpportunity {...tradingOpp} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-md font-semibold mb-4 text-gray-700">Sentiment du Marché</h4>
          <SentimentChart data={sentiment} />
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-md font-semibold mb-3 text-gray-700">Points Clés</h4>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {result.analysis}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <a
        href={result.newsItem.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
      >
        Lire l'article original
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}