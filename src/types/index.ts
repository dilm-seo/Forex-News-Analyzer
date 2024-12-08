export interface NewsItem {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  creator: string;
}

export interface Settings {
  apiKey: string;
  model: string;
  prompt: string;
}

export interface AnalysisResult {
  newsItem: NewsItem;
  analysis: string;
  timestamp: string;
}

export type MessageType = 'user' | 'assistant' | 'error';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  timestamp: string;
}

export interface TradingSignal {
  pair: string;
  direction: 'buy' | 'sell';
  impact: number;
  reasons: string[];
  timestamp: string;
}