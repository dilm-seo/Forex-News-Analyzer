interface SentimentData {
  sentiment: Array<{ name: string; value: number }>;
  impact: 'positive' | 'negative' | 'neutral';
}

interface TradingOpportunity {
  pair: string;
  strongCurrency: string;
  weakCurrency: string;
  impact: number;
  reasons: string[];
  direction: 'buy' | 'sell';
}

export function extractSentimentData(analysis: string): SentimentData {
  const positiveWords = ['bullish', 'positive', 'increase', 'gain', 'growth', 'strengthen', 'hausse', 'positif'];
  const negativeWords = ['bearish', 'negative', 'decrease', 'loss', 'decline', 'weaken', 'baisse', 'négatif'];

  const words = analysis.toLowerCase().split(/\s+/);
  
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  
  const sentiment = [
    { name: 'Positif', value: positiveCount },
    { name: 'Négatif', value: negativeCount },
    { name: 'Neutre', value: Math.max(1, words.length / 50 - (positiveCount + negativeCount)) }
  ];

  let impact: 'positive' | 'negative' | 'neutral';
  if (positiveCount > negativeCount) {
    impact = 'positive';
  } else if (negativeCount > positiveCount) {
    impact = 'negative';
  } else {
    impact = 'neutral';
  }

  return { sentiment, impact };
}

export function extractTradingOpportunity(analysis: string): TradingOpportunity | null {
  // Cette fonction analyse le texte pour extraire les opportunités de trading
  // Dans un cas réel, cela serait fait par l'API OpenAI directement
  
  // Exemple de retour pour démonstration
  if (analysis.toLowerCase().includes('eur') && analysis.toLowerCase().includes('usd')) {
    return {
      pair: 'EUR/USD',
      strongCurrency: 'EUR',
      weakCurrency: 'USD',
      impact: 4,
      reasons: [
        'Données économiques européennes positives',
        'Faiblesse du dollar américain',
        'Support technique important'
      ],
      direction: 'buy'
    };
  }
  
  return null;
}