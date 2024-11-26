import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Coins, TrendingUp, TrendingDown } from 'lucide-react';
import { CurrencyStrength } from './CurrencyStrength';

interface TradingOpportunityProps {
  pair: string;
  strongCurrency: string;
  weakCurrency: string;
  impact: number; // 1 to 5
  reasons: string[];
  direction: 'buy' | 'sell';
}

export function TradingOpportunity({
  pair,
  strongCurrency,
  weakCurrency,
  impact,
  reasons,
  direction
}: TradingOpportunityProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Coins className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{pair}</h3>
            <p className="text-sm text-gray-500">Opportunité de Trading</p>
          </div>
        </div>
        <div className={`${direction === 'buy' ? 'text-green-600' : 'text-red-600'} flex items-center gap-2`}>
          {direction === 'buy' ? (
            <ArrowUpCircle className="w-6 h-6" />
          ) : (
            <ArrowDownCircle className="w-6 h-6" />
          )}
          <span className="font-semibold">{direction === 'buy' ? 'ACHAT' : 'VENTE'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrencyStrength 
          strongCurrency={strongCurrency}
          weakCurrency={weakCurrency}
        />
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-700">Force de l'Impact</h4>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${
                  i < impact ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-700">Raisons</h4>
        </div>
        <ul className="space-y-2">
          {reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-gray-600">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}