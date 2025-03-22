import { 
  Database, GitBranch, Cloud, 
  Desktop, Shield, Terminal, 
  Globe, Package, Cpu as CpuIcon,
  Lock, Users, TreeStructure
} from '@phosphor-icons/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useSystemSettings } from '@/hooks/settings/useSystemSettings';

export function SystemSettings() {
  const { system, updateSystem } = useSystemSettings();

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
          {/* Hosting Provider Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Desktop className="h-5 w-5" />
                <div className="flex flex-col">
                  <span>Hosting Provider</span>
                  <span className="text-sm text-muted-foreground">Configure your hosting environment</span>
                </div>
              </div>
              <Select defaultValue="aws">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="gcp">Google Cloud</SelectItem>
                  <SelectItem value="azure">Azure</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resource Configuration */}
            <div className="space-y-2 pl-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CpuIcon className="h-4 w-4" />
                  <span>CPU & Memory</span>
                </div>
                <Select defaultValue="2">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Core - 2GB</SelectItem>
                    <SelectItem value="2">2 Cores - 4GB</SelectItem>
                    <SelectItem value="4">4 Cores - 8GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* CLI Tools Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                <div className="flex flex-col">
                  <span>CLI Tools</span>
                  <span className="text-sm text-muted-foreground">Manage command line tools</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="pl-7 space-y-2">
              {['git', 'docker', 'kubectl', 'terraform'].map(tool => (
                <div key={tool} className="flex items-center justify-between">
                  <span className="text-sm">{tool}</span>
                  <Switch />
                </div>
              ))}
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <div className="flex flex-col">
                  <span>Security</span>
                  <span className="text-sm text-muted-foreground">Security settings and policies</span>
                </div>
              </div>
            </div>
            <div className="pl-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>2FA Authentication</span>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Role-Based Access</span>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TreeStructure className="h-4 w-4" />
                  <span>Audit Logging</span>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environment</CardTitle>
          <CardDescription>Manage environment settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Region & Language */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>Region & Language</span>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="us-east">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east">US East</SelectItem>
                    <SelectItem value="us-west">US West</SelectItem>
                    <SelectItem value="eu-west">EU West</SelectItem>
                    <SelectItem value="asia">Asia Pacific</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Resource Limits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span>Resource Limits</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Max Concurrent Projects</span>
                  <Input type="number" className="w-24" defaultValue="5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage Limit</span>
                  <Input type="number" className="w-24" defaultValue="10" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network Bandwidth</span>
                  <Input type="number" className="w-24" defaultValue="100" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
