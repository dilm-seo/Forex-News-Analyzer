export const predefinedPrompts = [
  {
    id: 'trading',
    name: 'Analyse Trading',
    prompt: `Analysez cette actualité forex et fournissez uniquement:
1. Impact global sur le marché des changes (note de 1 à 10)
2. Paires de devises majeures impactées
3. Pour la paire principale:
   - Direction (achat/vente)
   - Force du signal (1-10)
   - 3 raisons principales justifiant la position
Format concis, uniquement les points clés.`,
  },
  {
    id: 'major',
    name: 'Paires Majeures',
    prompt: `Analysez l'impact sur les paires majeures (EUR/USD, GBP/USD, USD/JPY):
1. Force de l'impact (1-10)
2. Paire la plus impactée
3. Direction probable
4. 3 facteurs clés influençant le mouvement
Format court et précis.`,
  },
  {
    id: 'cross',
    name: 'Paires Croisées',
    prompt: `Analysez l'impact sur les crosses (EUR/GBP, EUR/JPY, GBP/JPY):
1. Impact sur les crosses (1-10)
2. Paire croisée principale affectée
3. Direction anticipée
4. 3 éléments justifiant l'analyse
Réponse directe et factuelle.`,
  },
  {
    id: 'quick',
    name: 'Analyse Rapide',
    prompt: `Analyse rapide du forex:
1. Impact marché (1-10)
2. Paire principale touchée
3. Direction et force du mouvement
Format ultra-concis.`,
  }
];