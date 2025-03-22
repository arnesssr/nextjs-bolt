import { Database, GitBranch, Cloud, Server, Shield, Terminal, Globe, Boxes } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function SystemSettings() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Manage your system integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <span>Database</span>
            </div>
            <span className="text-sm text-muted-foreground">Supabase</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              <span>Version Control</span>
            </div>
            <span className="text-sm text-muted-foreground">GitHub</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              <span>Deployment</span>
            </div>
            <span className="text-sm text-muted-foreground">Vercel</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Infrastructure</CardTitle>
          <CardDescription>Configure your infrastructure settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <span>Hosting Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            <span>CLI Tools</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Security</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environment</CardTitle>
          <CardDescription>Manage environment settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>Region & Language</span>
          </div>
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5" />
            <span>Resource Limits</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
