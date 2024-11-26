import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CurrencyStrengthProps {
  strongCurrency: string;
  weakCurrency: string;
}

export function CurrencyStrength({ strongCurrency, weakCurrency }: CurrencyStrengthProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="text-center">
        <div className="text-sm text-gray-500">Devise Forte</div>
        <div className="text-lg font-bold text-green-600">{strongCurrency}</div>
      </div>
      
      <ArrowRight className="w-5 h-5 text-gray-400" />
      
      <div className="text-center">
        <div className="text-sm text-gray-500">Devise Faible</div>
        <div className="text-lg font-bold text-red-600">{weakCurrency}</div>
      </div>
    </div>
  );
}