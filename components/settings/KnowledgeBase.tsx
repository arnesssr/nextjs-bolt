import React from 'react';
import { Book, Robot } from '@phosphor-icons/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useKnowledgeBase } from '@/features/knowledge-base/hooks/useKnowledgeBase';
import { defaultPractices } from '@/features/knowledge-base/data/software-practices';

export function KnowledgeBase() {
  const { aiContext, updateAIContext } = useKnowledgeBase();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Context Integration</CardTitle>
          <CardDescription>Control how the AI uses software engineering knowledge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Robot className="h-5 w-5" />
              <span>Enable Knowledge Base</span>
            </div>
            <Switch 
              checked={aiContext.enabled}
              onCheckedChange={(checked) => 
                updateAIContext({ enabled: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              <span>Use Best Practices</span>
            </div>
            <Switch 
              checked={aiContext.useDefaultPractices}
              onCheckedChange={(checked) => 
                updateAIContext({ useDefaultPractices: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Software Engineering Best Practices</CardTitle>
          <CardDescription>These practices will guide the AI in generating code</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {defaultPractices.map(practice => (
              <div key={practice.id} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {practice.content}
                </div>
                <div className="flex gap-2 mt-2">
                  {practice.tags.map(tag => (
                    <span key={tag} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <Separator className="mt-6" />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
