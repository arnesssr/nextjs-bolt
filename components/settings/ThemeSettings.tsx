import { MonitorSmartphone, Brush, PaintBucket } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useThemeSettings } from '@/hooks/settings/useThemeSettings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ThemeSettings() {
  const { theme, updateTheme } = useThemeSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>Customize your interface appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonitorSmartphone className="h-5 w-5" />
            <span>Dark Mode</span>
          </div>
          <Switch 
            checked={theme.mode === 'dark'}
            onCheckedChange={(checked) => 
              updateTheme({ mode: checked ? 'dark' : 'light' })
            }
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Brush className="h-5 w-5" />
            <span>Editor Theme</span>
          </div>
          <Select
            value={theme.editorTheme}
            onValueChange={(value) => updateTheme({ editorTheme: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="monokai">Monokai</SelectItem>
              <SelectItem value="github">GitHub</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PaintBucket className="h-5 w-5" />
            <span>Accent Color</span>
          </div>
          <Select
            value={theme.accentColor}
            onValueChange={(value) => updateTheme({ accentColor: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="green">Green</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
