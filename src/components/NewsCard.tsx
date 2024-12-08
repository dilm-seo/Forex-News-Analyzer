import React, { useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { AnalysisResult } from '../types';
import { SentimentChart } from './SentimentChart';
import { TradingOpportunity } from './TradingOpportunity';
import { extractSentimentData, extractTradingOpportunity } from '../utils/analysisParser';
import { Card } from './ui/card';

interface NewsCardProps {
  result: AnalysisResult;
}

export function NewsCard({ result }: NewsCardProps) {
  const { sentiment, impact, score } = useMemo(() => 
    extractSentimentData(result.analysis),
    [result.analysis]
  );

  const tradingOpp = useMemo(() => 
    extractTradingOpportunity(result.analysis),
    [result.analysis]
  );

  return (
    <Card.Root>
      <Card.Header>
        <div className="flex justify-between items-start gap-4">
          <div>
            <Card.Title>{result.newsItem.title}</Card.Title>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(result.newsItem.pubDate).toLocaleString('fr-FR', {
                dateStyle: 'long',
                timeStyle: 'short'
              })}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            score >= 7 ? 'bg-red-100 text-red-800' :
            score >= 4 ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            Impact: {score}/10
          </div>
        </div>
      </Card.Header>

      <Card.Content>
        {tradingOpp && <TradingOpportunity {...tradingOpp} />}

        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <h4 className="text-md font-semibold mb-4 text-gray-700">Force du Signal</h4>
          <SentimentChart data={sentiment} />
        </div>
      </Card.Content>

      <Card.Footer>
        <a
          href={result.newsItem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
        >
          Article original
          <ExternalLink className="w-4 h-4" />
        </a>
      </Card.Footer>
    </Card.Root>
  );
}