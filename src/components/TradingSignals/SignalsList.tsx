import React from 'react';
import { SignalCard } from './SignalCard';
import { TradingSignal } from '../../types';

interface SignalsListProps {
  signals: TradingSignal[];
}

export function SignalsList({ signals }: SignalsListProps) {
  if (signals.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500">Aucun signal disponible. Cliquez sur Analyser pour obtenir des signaux.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {signals.map((signal, index) => (
        <SignalCard
          key={index}
          pair={signal.pair}
          direction={signal.direction}
          impact={signal.impact}
          timestamp={signal.timestamp}
          reasons={signal.reasons}
        />
      ))}
    </div>
  );
}