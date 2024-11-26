import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ImpactIndicatorProps {
  impact: 'positive' | 'negative' | 'neutral';
}

export function ImpactIndicator({ impact }: ImpactIndicatorProps) {
  const getImpactColor = () => {
    switch (impact) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactIcon = () => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-4 h-4" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getImpactColor()}`}>
      {getImpactIcon()}
      <span className="text-sm font-medium capitalize">{impact}</span>
    </div>
  );
}