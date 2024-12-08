import OpenAI from 'openai';
import { Settings } from '../types';

export class OpenAIService {
  private static instance: OpenAI | null = null;

  private static getInstance(apiKey: string): OpenAI {
    if (!this.instance || this.instance.apiKey !== apiKey) {
      this.instance = new OpenAI({ 
        apiKey,
        dangerouslyAllowBrowser: true
      });
    }
    return this.instance;
  }

  static async analyzeContent(content: string, settings: Settings): Promise<string> {
    const openai = this.getInstance(settings.apiKey);
    
    const systemPrompt = `Tu es un expert en analyse forex professionnel spécialisé dans l'interprétation des actualités financières.

Instructions détaillées:
1. Analyse TOUTES les devises mentionnées ou impactées dans l'actualité
2. Identifie les corrélations et impacts croisés entre les devises
3. Évalue l'impact spécifique sur chaque paire de devises pertinente
4. Fournis une note d'impact précise (1-10) basée sur:
   - L'importance de l'actualité
   - La volatilité potentielle
   - Le timing de l'impact
5. Justifie chaque recommandation avec:
   - Des éléments factuels de l'actualité
   - Des données économiques mentionnées
   - Des corrélations avec d'autres marchés si pertinent
6. Si plusieurs paires sont impactées:
   - Liste-les par ordre d'importance
   - Explique les relations entre elles
   - Identifie les effets domino potentiels`;

    const userPrompt = `Analyse cette actualité forex selon le format suivant:

1. Impact Global:
   - Note globale: X/10
   - Horizon temporel: Court/Moyen/Long terme
   - Volatilité attendue: Faible/Moyenne/Forte

2. Paires Impactées (par ordre d'importance):
   PAIRE1:
   - Impact: X/10
   - Direction: Achat/Vente
   - Raisons spécifiques:
     * [Raison détaillée 1]
     * [Raison détaillée 2]

   PAIRE2:
   - Impact: X/10
   [...]

3. Facteurs Clés:
   - [Facteur 1 avec explication]
   - [Facteur 2 avec explication]
   - [Facteur 3 avec explication]

Actualité à analyser:
${content}`;
    
    const completion = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content || 'No analysis available';
  }
}