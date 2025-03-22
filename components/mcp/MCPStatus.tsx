import { Activity } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMCPSettings } from '@/hooks/settings/useMCPSettings';

export function MCPStatus() {
  const { config } = useMCPSettings();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>MCP Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <span>Status: {config.enabled ? 'Active' : 'Inactive'}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Endpoint: {config.endpoints.local}
        </div>
      </CardContent>
    </Card>
  );
}
