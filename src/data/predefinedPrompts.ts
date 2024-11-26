export const predefinedPrompts = [
  {
    id: 'general',
    name: 'Analyse Générale',
    prompt: `Analysez cette actualité forex et fournissez:
1. Les points clés de l'actualité
2. L'impact potentiel sur le marché
3. Les paires de devises concernées
4. Une recommandation de trading avec:
   - La paire principale impactée
   - La devise forte et la devise faible
   - La direction (achat/vente)
   - L'impact estimé (1-5)
   - Les raisons principales (3-5 points)`,
  },
  {
    id: 'technical',
    name: 'Impact Technique',
    prompt: `Analysez cette actualité forex du point de vue technique:
1. Identifiez les niveaux de support/résistance potentiels
2. Analysez l'impact sur les tendances actuelles
3. Fournissez une analyse des mouvements de prix probables
4. Détaillez une opportunité de trading avec:
   - Paire de devises
   - Direction
   - Force de l'impact (1-5)
   - Justification technique`,
  },
  {
    id: 'fundamental',
    name: 'Analyse Fondamentale',
    prompt: `Effectuez une analyse fondamentale approfondie:
1. Examinez l'impact sur les facteurs économiques
2. Analysez les implications pour la politique monétaire
3. Évaluez les conséquences à long terme
4. Présentez une opportunité de trading basée sur:
   - La paire concernée
   - Les devises forte/faible
   - L'impact prévu (1-5)
   - Les facteurs fondamentaux clés`,
  }
];