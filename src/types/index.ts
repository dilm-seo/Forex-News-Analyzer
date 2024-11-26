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