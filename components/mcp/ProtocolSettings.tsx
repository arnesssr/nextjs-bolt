import { Database, Files, Globe, SquaresFour } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useMCPSettings } from '@/hooks/settings/useMCPSettings';

export function ProtocolSettings() {
  const { config, updateConfig } = useMCPSettings();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Protocol Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(config.protocols).map(([key, enabled]) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {key === 'fileAccess' && <Files className="h-5 w-5" />}
              {key === 'databaseConnections' && <Database className="h-5 w-5" />}
              {key === 'apiIntegrations' && <Globe className="h-5 w-5" />}
              {key === 'contextualServices' && <SquaresFour className="h-5 w-5" />}
              <span>{key}</span>
            </div>
            <Switch 
              checked={enabled}
              onCheckedChange={(checked) => 
                updateConfig({ 
                  protocols: { ...config.protocols, [key]: checked } 
                })
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
