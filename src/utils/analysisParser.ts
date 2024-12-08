interface SentimentData {
  sentiment: Array<{ name: string; value: number }>;
  impact: 'positive' | 'negative' | 'neutral';
  score: number;
}

interface TradingOpportunity {
  pair: string;
  strongCurrency: string;
  weakCurrency: string;
  impact: number;
  reasons: string[];
  direction: 'buy' | 'sell';
  signalStrength: number;
}

const MAJOR_PAIRS = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF',
  'USD/CAD', 'AUD/USD', 'NZD/USD'
];

const CROSS_PAIRS = [
  'EUR/GBP', 'EUR/JPY', 'GBP/JPY', 'EUR/CHF',
  'EUR/AUD', 'GBP/AUD', 'EUR/CAD', 'GBP/CAD'
];

const CURRENCIES = ['EUR', 'USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD'];

export function extractSentimentData(analysis: string): SentimentData {
  const lines = analysis.toLowerCase().split('\n');
  let impact: 'positive' | 'negative' | 'neutral' = 'neutral';
  let score = 0;

  // Recherche de l'impact global
  const globalImpactMatch = analysis.match(/note globale\s*:\s*(\d+)\/10/i);
  if (globalImpactMatch) {
    score = parseInt(globalImpactMatch[1], 10);
  }

  // Recherche de la volatilité
  const volatilityMatch = analysis.toLowerCase().match(/volatilité.*?:\s*(faible|moyenne|forte)/i);
  if (volatilityMatch) {
    const volatility = volatilityMatch[1];
    if (volatility === 'forte') score = Math.min(score + 2, 10);
    else if (volatility === 'faible') score = Math.max(score - 1, 1);
  }

  // Analyse du sentiment global
  const positivePatterns = [
    /hausse/i, /augmentation/i, /renforc/i, /amélioration/i,
    /positif/i, /bullish/i, /optimiste/i, /croissance/i
  ];

  const negativePatterns = [
    /baisse/i, /diminution/i, /affaibliss/i, /détérioration/i,
    /négatif/i, /bearish/i, /pessimiste/i, /déclin/i
  ];

  let positiveCount = 0;
  let negativeCount = 0;

  lines.forEach(line => {
    positivePatterns.forEach(pattern => {
      if (pattern.test(line)) positiveCount++;
    });
    negativePatterns.forEach(pattern => {
      if (pattern.test(line)) negativeCount++;
    });
  });

  impact = positiveCount > negativeCount ? 'positive' : 
           negativeCount > positiveCount ? 'negative' : 'neutral';

  const sentiment = [
    { name: 'Impact', value: score },
    { name: 'Signal', value: Math.max(1, Math.floor(score * 0.8)) }
  ];

  return { sentiment, impact, score };
}

export function extractTradingOpportunity(analysis: string): TradingOpportunity | null {
  const lines = analysis.split('\n');
  let pairs: Array<{
    pair: string;
    impact: number;
    direction: 'buy' | 'sell';
    reasons: string[];
  }> = [];
  
  let currentPair: {
    pair: string;
    impact: number;
    direction: 'buy' | 'sell';
    reasons: string[];
  } | null = null;

  // Analyse ligne par ligne pour extraire les informations structurées
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Recherche d'une nouvelle paire
    const pairMatch = line.match(/^([A-Z]{3}\/[A-Z]{3}):$/);
    if (pairMatch) {
      if (currentPair) {
        pairs.push(currentPair);
      }
      currentPair = {
        pair: pairMatch[1],
        impact: 0,
        direction: 'buy',
        reasons: []
      };
      continue;
    }

    if (currentPair) {
      // Recherche de l'impact
      const impactMatch = line.match(/impact\s*:\s*(\d+)\/10/i);
      if (impactMatch) {
        currentPair.impact = parseInt(impactMatch[1], 10);
      }

      // Recherche de la direction
      const directionMatch = line.match(/direction\s*:\s*(achat|vente)/i);
      if (directionMatch) {
        currentPair.direction = directionMatch[1].toLowerCase() === 'achat' ? 'buy' : 'sell';
      }

      // Collecte des raisons
      if (line.startsWith('*') || line.startsWith('-')) {
        const reason = line.replace(/^[*-]\s*/, '').trim();
        if (reason.length > 0) {
          currentPair.reasons.push(reason);
        }
      }
    }
  }

  // Ajouter la dernière paire si elle existe
  if (currentPair) {
    pairs.push(currentPair);
  }

  // Si aucune paire n'est trouvée, chercher dans le texte général
  if (pairs.length === 0) {
    CURRENCIES.forEach(base => {
      CURRENCIES.forEach(quote => {
        if (base !== quote) {
          const pair = `${base}/${quote}`;
          const pairRegex = new RegExp(pair, 'i');
          if (pairRegex.test(analysis)) {
            const impact = extractImpactForPair(analysis, pair);
            const direction = extractDirectionForPair(analysis, pair);
            const reasons = extractReasonsForPair(analysis, pair);
            if (impact > 0) {
              pairs.push({
                pair,
                impact,
                direction,
                reasons
              });
            }
          }
        }
      });
    });
  }

  if (pairs.length === 0) return null;

  // Trier les paires par impact et prendre la plus importante
  pairs.sort((a, b) => b.impact - a.impact);
  const mainPair = pairs[0];

  const [strongCurrency, weakCurrency] = mainPair.direction === 'buy' 
    ? mainPair.pair.split('/') 
    : mainPair.pair.split('/').reverse();

  return {
    pair: mainPair.pair,
    strongCurrency,
    weakCurrency,
    impact: mainPair.impact,
    reasons: mainPair.reasons.length > 0 ? mainPair.reasons : [
      'Tendance technique confirmée',
      'Contexte fondamental favorable',
      'Momentum du marché'
    ],
    direction: mainPair.direction,
    signalStrength: mainPair.impact
  };
}

function extractImpactForPair(analysis: string, pair: string): number {
  const lines = analysis.split('\n');
  const pairLines = lines.filter(line => line.includes(pair));
  
  for (const line of pairLines) {
    const impactMatch = line.match(/impact.*?(\d+)\/10/i);
    if (impactMatch) {
      return parseInt(impactMatch[1], 10);
    }
  }
  
  return 5; // Impact moyen par défaut
}

function extractDirectionForPair(analysis: string, pair: string): 'buy' | 'sell' {
  const lines = analysis.toLowerCase().split('\n');
  const pairLines = lines.filter(line => line.includes(pair.toLowerCase()));
  
  const buyWords = ['achat', 'hausse', 'renforce', 'augmente', 'bullish'];
  const sellWords = ['vente', 'baisse', 'affaiblit', 'diminue', 'bearish'];
  
  let buyCount = 0;
  let sellCount = 0;
  
  pairLines.forEach(line => {
    buyWords.forEach(word => {
      if (line.includes(word)) buyCount++;
    });
    sellWords.forEach(word => {
      if (line.includes(word)) sellCount++;
    });
  });
  
  return buyCount >= sellCount ? 'buy' : 'sell';
}

function extractReasonsForPair(analysis: string, pair: string): string[] {
  const lines = analysis.split('\n');
  const reasons: string[] = [];
  
  let inPairSection = false;
  
  for (const line of lines) {
    if (line.includes(pair)) {
      inPairSection = true;
      continue;
    }
    
    if (inPairSection && line.trim().length > 0) {
      if (line.startsWith('*') || line.startsWith('-')) {
        const reason = line.replace(/^[*-]\s*/, '').trim();
        if (reason.length > 0) {
          reasons.push(reason);
        }
      }
    }
    
    // Sortir de la section si on trouve une autre paire
    if (inPairSection && /[A-Z]{3}\/[A-Z]{3}/.test(line)) {
      break;
    }
  }
  
  return reasons;
}