import { Database, GitBranch, Cloud, Server, Shield, Terminal, Globe, Boxes } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
              <div className="flex flex-col">
                <span>Database</span>
                <span className="text-sm text-muted-foreground">Current: Supabase</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="supabase">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select database" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supabase">Supabase</SelectItem>
                  <SelectItem value="firebase">Firebase</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              <div className="flex flex-col">
                <span>Version Control</span>
                <span className="text-sm text-muted-foreground">Current: GitHub</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="github">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select version control" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="gitlab">GitLab</SelectItem>
                  <SelectItem value="bitbucket">Bitbucket</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              <div className="flex flex-col">
                <span>Deployment</span>
                <span className="text-sm text-muted-foreground">Current: Vercel</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="vercel">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select deployment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vercel">Vercel</SelectItem>
                  <SelectItem value="netlify">Netlify</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
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
