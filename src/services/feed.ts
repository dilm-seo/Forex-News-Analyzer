import { NewsItem } from '../types';

const FEED_URL = 'https://www.forexlive.com/feed/news/';

export class FeedService {
  private static parseXML(xmlText: string): NewsItem[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    return Array.from(items).map(item => ({
      title: item.querySelector('title')?.textContent?.trim() || '',
      description: item.querySelector('description')?.textContent?.trim() || '',
      pubDate: item.querySelector('pubDate')?.textContent?.trim() || '',
      link: item.querySelector('link')?.textContent?.trim() || '',
      creator: item.querySelector('dc\\:creator')?.textContent?.trim() || 'Unknown'
    }));
  }

  static async fetchFeed(): Promise<NewsItem[]> {
    try {
      const response = await fetch(FEED_URL, {
        headers: {
          'Accept': 'application/xml, text/xml, */*',
          'User-Agent': 'Mozilla/5.0 (compatible; ForexNewsAnalyzer/1.0)'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.statusText}`);
      }
      
      const xml = await response.text();
      return this.parseXML(xml);
    } catch (error) {
      console.error('Feed fetch error:', error);
      throw new Error(`Error fetching feed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}