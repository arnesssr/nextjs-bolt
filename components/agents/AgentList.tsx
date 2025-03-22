import { Robot, Database, Globe, HardDrive } from '@phosphor-icons/react';
import { Switch } from '@/components/ui/switch';
import { useMCPSettings } from '@/hooks/settings/useMCPSettings';

export function AgentList() {
  const { config, toggleAgent } = useMCPSettings();
  
  return (
    <div className="space-y-4">
      {config.agents.map(agent => (
        <div key={agent.id} className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            {agent.type === 'file' && <HardDrive className="h-5 w-5" />}
            {agent.type === 'database' && <Database className="h-5 w-5" />}
            {agent.type === 'api' && <Globe className="h-5 w-5" />}
            {agent.type === 'custom' && <Robot className="h-5 w-5" />}
            <div>
              <p className="font-medium">{agent.name}</p>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
          <Switch 
            checked={agent.enabled}
            onCheckedChange={(checked) => toggleAgent(agent.id, checked)}
          />
        </div>
      ))}
    </div>
  );
}
