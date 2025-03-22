import { Globe } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useMCPSettings } from '@/hooks/settings/useMCPSettings';

export function MCPControls() {
  const { config, updateConfig } = useMCPSettings();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>MCP Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>Enable MCP</span>
          </div>
          <Switch 
            checked={config.enabled}
            onCheckedChange={(checked) => updateConfig({ enabled: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
