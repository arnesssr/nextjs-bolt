import { AgentList } from './AgentList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AgentSettings() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Agents</CardTitle>
          <CardDescription>Manage and configure AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <AgentList />
        </CardContent>
      </Card>
    </div>
  );
}
