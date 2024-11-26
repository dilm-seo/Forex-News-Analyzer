import React from 'react';
import { Settings, Key, Brain, MessageSquare } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { predefinedPrompts } from '../data/predefinedPrompts';

export function SettingsPanel() {
  const { settings, updateSettings } = useSettingsStore();

  const handlePromptSelect = (promptId: string) => {
    const selectedPrompt = predefinedPrompts.find((p) => p.id === promptId);
    if (selectedPrompt) {
      updateSettings({ prompt: selectedPrompt.prompt });
    }
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Paramètres</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Clé API OpenAI
            </label>
          </div>
          <input
            type="password"
            value={settings.apiKey}
            onChange={(e) => updateSettings({ apiKey: e.target.value })}
            className="input-field"
            placeholder="sk-..."
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Modèle
            </label>
          </div>
          <select
            value={settings.model}
            onChange={(e) => updateSettings({ model: e.target.value })}
            className="input-field"
          >
            <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Type d'Analyse
            </label>
          </div>
          <select
            onChange={(e) => handlePromptSelect(e.target.value)}
            className="input-field mb-3"
            value={predefinedPrompts.find((p) => p.prompt === settings.prompt)?.id || ''}
          >
            {predefinedPrompts.map((prompt) => (
              <option key={prompt.id} value={prompt.id}>
                {prompt.name}
              </option>
            ))}
          </select>
          
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Prompt Personnalisé
            </label>
          </div>
          <textarea
            value={settings.prompt}
            onChange={(e) => updateSettings({ prompt: e.target.value })}
            className="input-field h-32 resize-none"
            placeholder="Entrez votre prompt d'analyse..."
          />
        </div>
      </div>
    </div>
  );
}