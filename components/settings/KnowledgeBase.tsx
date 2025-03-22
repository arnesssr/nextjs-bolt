import { LayoutTemplate, FileCode, Code2 } from 'lucide-react';

export function KnowledgeBase() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Knowledge Base</h2>
        
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5" />
            <h3 className="font-medium">Project Templates</h3>
          </div>
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            <h3 className="font-medium">Framework Guides</h3>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            <h3 className="font-medium">Best Practices</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
