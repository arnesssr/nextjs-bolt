import { Bot, Database, Globe, Server } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useMCPSettings } from '@/hooks/settings/useMCPSettings';

export function MCPSettings() {
  const { config, updateConfig, toggleAgent } = useMCPSettings();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Model Context Protocol</CardTitle>
          <CardDescription>Configure MCP settings and agents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>Enable MCP</span>
            </div>
            <Switch 
              checked={config.enabled}
              onCheckedChange={(checked) => 
                updateConfig({ enabled: checked })
              }
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Active Agents</h3>
            {config.agents.map(agent => (
              <div key={agent.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  {agent.type === 'file' && <Server className="h-5 w-5" />}
                  {agent.type === 'database' && <Database className="h-5 w-5" />}
                  {agent.type === 'api' && <Globe className="h-5 w-5" />}
                  {agent.type === 'custom' && <Bot className="h-5 w-5" />}
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
        </CardContent>
      </Card>
    </div>
  );
}
