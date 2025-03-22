import { useStore } from '@nanostores/react';
import { settingsStore } from '@/lib/stores/settings';

export function useSystemSettings() {
  const system = useStore(settingsStore.system);

  const updateSystem = (updates: Partial<typeof system>) => {
    settingsStore.system.set({ ...system, ...updates });
  };

  return {
    system,
    updateSystem
  };
}
