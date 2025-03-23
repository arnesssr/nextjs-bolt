import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { knowledgeBaseActions } from '../stores/knowledge-store';

export function ProjectRequirements() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [framework, setFramework] = useState('');
  const [specificRequirements, setSpecificRequirements] = useState('');

  const handleSubmit = () => {
    knowledgeBaseActions.addProjectRequirement({
      title,
      description,
      framework,
      specificRequirements
    });
    
    // Clear form
    setTitle('');
    setDescription('');
    setFramework('');
    setSpecificRequirements('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Requirements</CardTitle>
        <CardDescription>Define specific requirements for your project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input 
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Select value={framework} onValueChange={setFramework}>
            <SelectTrigger>
              <SelectValue placeholder="Select Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next.js">Next.js</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Textarea 
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Textarea 
            placeholder="Specific Requirements"
            value={specificRequirements}
            onChange={(e) => setSpecificRequirements(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Save Requirements
        </Button>
      </CardContent>
    </Card>
  );
}
