import OpenAI from 'openai';
import { Settings } from '../types';

export class OpenAIService {
  private static instance: OpenAI | null = null;

  private static getInstance(apiKey: string): OpenAI {
    if (!this.instance || this.instance.apiKey !== apiKey) {
      this.instance = new OpenAI({ 
        apiKey,
        dangerouslyAllowBrowser: true // Required for browser environment
      });
    }
    return this.instance;
  }

  static async analyzeContent(content: string, settings: Settings): Promise<string> {
    const openai = this.getInstance(settings.apiKey);
    
    const completion = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        { role: 'system', content: 'You are a professional forex market analyst.' },
        { role: 'user', content: `${settings.prompt}\n\n${content}` }
      ],
    });

    return completion.choices[0].message.content || 'No analysis available';
  }
}