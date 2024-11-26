import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Settings } from '../types';

interface SettingsStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        apiKey: '',
        model: 'gpt-4-turbo-preview',
        prompt: 'Analysez cette actualité forex et fournissez les points clés, l\'impact potentiel sur le marché et les considérations de trading:',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'forex-analyzer-settings',
    }
  )
);