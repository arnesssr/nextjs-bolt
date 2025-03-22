import { useStore } from '@nanostores/react';
import { settingsStore } from '@/lib/stores/settings';

export function useMCPSettings() {
  const system = useStore(settingsStore.system);
  const config = system.mcp;

  const updateConfig = (updates: Partial<typeof config>) => {
    settingsStore.system.set({
      ...system,
      mcp: { ...config, ...updates }
    });
  };

  const toggleAgent = (agentId: string, enabled: boolean) => {
    const newAgents = config.agents.map(agent => 
      agent.id === agentId ? { ...agent, enabled } : agent
    );
    updateConfig({ agents: newAgents });
  };

  return {
    config,
    updateConfig,
    toggleAgent
  };
}
