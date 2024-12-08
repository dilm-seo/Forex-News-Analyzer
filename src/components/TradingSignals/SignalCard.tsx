import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, TrendingUp, Clock } from 'lucide-react';

interface SignalCardProps {
  pair: string;
  direction: 'buy' | 'sell';
  impact: number;
  timestamp: string;
  reasons: string[];
}

export function SignalCard({ pair, direction, impact, timestamp, reasons }: SignalCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              direction === 'buy' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {direction === 'buy' ? (
                <ArrowUpCircle className={`w-6 h-6 ${
                  direction === 'buy' ? 'text-green-600' : 'text-red-600'
                }`} />
              ) : (
                <ArrowDownCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{pair}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {new Date(timestamp).toLocaleString('fr-FR')}
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full font-semibold ${
            direction === 'buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {direction === 'buy' ? 'ACHAT' : 'VENTE'}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-700">Force du Signal: {impact}/10</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < impact ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">Raisons:</h4>
          <ul className="space-y-2">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}