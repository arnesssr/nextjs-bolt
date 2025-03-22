import { MCPControls } from './MCPControls';
import { MCPStatus } from './MCPStatus';
import { ProtocolSettings } from './ProtocolSettings';
export function MCPSettings() {
  return (
    <div className="grid gap-6">
      <MCPControls />
      <MCPStatus />
      <ProtocolSettings />
    </div>
  );
}
