import { NewsItem, Settings, AnalysisResult } from '../types';
import { OpenAIService } from '../services/openai';
import { FeedService } from '../services/feed';

export async function analyzeFeed(settings: Settings): Promise<AnalysisResult[]> {
  const news = await FeedService.fetchFeed();
  const latestNews = news.slice(0, 5); // Analyze only the 5 most recent articles

  const results = await Promise.all(
    latestNews.map(async (newsItem) => {
      const content = `${newsItem.title}\n\n${newsItem.description}`;
      const analysis = await OpenAIService.analyzeContent(content, settings);

      return {
        newsItem,
        analysis,
        timestamp: new Date().toISOString(),
      };
    })
  );

  return results;
}