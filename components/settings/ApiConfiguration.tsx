import { Key, Gauge, Network } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ApiConfiguration() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">API Configuration</h2>
        
        <div className="border rounded-lg p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              <h3 className="font-medium">API Keys</h3>
            </div>
            <div className="grid gap-2">
              <Input placeholder="Anthropic API Key" type="password" />
              <Input placeholder="Google API Key" type="password" />
              <Input placeholder="Together AI API Key" type="password" />
              <Button>Save Keys</Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              <h3 className="font-medium">Rate Limits</h3>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              <h3 className="font-medium">Endpoints</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
