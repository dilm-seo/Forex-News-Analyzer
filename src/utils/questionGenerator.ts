export function generateFollowUpQuestions(response: string): string[] {
  const questions: string[] = [];
  
  // Extraire les informations de la réponse
  const hasPairMention = response.match(/[A-Z]{3}\/[A-Z]{3}/);
  const hasDirection = response.toLowerCase().includes('achat') || response.toLowerCase().includes('vente');
  const hasImpact = response.match(/impact.*?(\d+)/i);
  
  // Générer des questions de suivi contextuelles
  if (hasPairMention) {
    questions.push(
      "Quels sont les niveaux techniques importants à surveiller ?",
      "Y a-t-il d'autres paires corrélées à surveiller ?"
    );
  }

  if (hasDirection) {
    questions.push(
      "Quels sont les risques principaux pour cette position ?",
      "Sur quel horizon de temps cette analyse est-elle valable ?"
    );
  }

  if (hasImpact) {
    questions.push(
      "Y a-t-il des événements économiques à venir qui pourraient impacter cette analyse ?",
      "Comment le sentiment du marché pourrait-il évoluer ?"
    );
  }

  // Toujours ajouter quelques questions générales
  questions.push(
    "Pouvez-vous analyser une autre paire de devises ?",
    "Quel est le sentiment général du marché aujourd'hui ?"
  );

  // Retourner un maximum de 5 questions
  return questions.slice(0, 5);
}