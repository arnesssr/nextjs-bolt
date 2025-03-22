import { useStore } from '@nanostores/react';
import { settingsStore } from '@/lib/stores/settings';

export function useThemeSettings() {
  const theme = useStore(settingsStore.theme);

  const updateTheme = (updates: Partial<typeof theme>) => {
    settingsStore.theme.set({ ...theme, ...updates });
  };

  return {
    theme,
    updateTheme
  };
}
