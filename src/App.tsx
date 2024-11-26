import React from 'react';
import { NewsAnalyzer } from './components/NewsAnalyzer';
import { SettingsPanel } from './components/SettingsPanel';
import { Newspaper } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Forex News Analyzer
            </h1>
            <p className="text-gray-600">Analyse en temps réel des actualités forex avec IA</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SettingsPanel />
          </div>
          
          <div className="lg:col-span-2">
            <NewsAnalyzer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;