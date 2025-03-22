import { MonitorSmartphone, Brush, PaintBucket } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function ThemeSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Theme Settings</h2>
        
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MonitorSmartphone className="h-5 w-5" />
              <span>Dark Mode</span>
            </div>
            <Switch />
          </div>

          <div className="flex items-center gap-2">
            <Brush className="h-5 w-5" />
            <h3 className="font-medium">Code Editor Theme</h3>
          </div>

          <div className="flex items-center gap-2">
            <PaintBucket className="h-5 w-5" />
            <h3 className="font-medium">UI Customization</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
