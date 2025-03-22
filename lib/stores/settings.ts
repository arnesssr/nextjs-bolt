import { atom } from 'nanostores';
import { map } from 'nanostores';
import { workbenchStore } from './workbench';

export interface Shortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  ctrlOrMetaKey?: boolean;
  action: () => void;
}

export interface Shortcuts {
  toggleTerminal: Shortcut;
}

export interface Settings {
  shortcuts: Shortcuts;
}

export interface ThemeConfig {
  mode: 'dark' | 'light';
  editorTheme: string;
  accentColor: string;
}

export interface ApiConfig {
  anthropic: { key: string; rateLimit: number };
  google: { key: string; rateLimit: number };
  together: { key: string; rateLimit: number };
  endpoints: { [key: string]: string };
}

export interface SystemConfig {
  database: {
    provider: 'supabase' | 'firebase' | 'custom';
    connectionString?: string;
  };
  versionControl: {
    provider: 'github' | 'gitlab' | 'bitbucket';
    token?: string;
  };
  deployment: {
    provider: 'vercel' | 'netlify' | 'custom';
    config?: Record<string, unknown>;
  };
  mcp: MCPConfig;
}

export interface KnowledgeBaseConfig {
  templates: Array<{ id: string; name: string; description: string }>;
  guides: Array<{ id: string; name: string; content: string }>;
  practices: Array<{ id: string; category: string; content: string }>;
}

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  type: 'file' | 'database' | 'api' | 'custom';
  config: Record<string, unknown>;
}

export interface MCPConfig {
  enabled: boolean;
  agents: AgentConfig[];
  endpoints: {
    local: string;
    remote?: string;
  };
  protocols: {
    fileAccess: boolean;
    databaseConnections: boolean;
    apiIntegrations: boolean;
    contextualServices: boolean;
  };
}

export const settingsStore = {
  theme: atom<ThemeConfig>({
    mode: 'dark',
    editorTheme: 'default',
    accentColor: 'blue'
  }),
  api: atom<ApiConfig>({
    anthropic: { key: '', rateLimit: 10 },
    google: { key: '', rateLimit: 10 },
    together: { key: '', rateLimit: 10 },
    endpoints: {}
  }),
  system: atom<SystemConfig>({
    database: { provider: 'supabase' },
    versionControl: { provider: 'github' },
    deployment: { provider: 'vercel' },
    mcp: {
      enabled: false,
      agents: [
        {
          id: 'file-agent',
          name: 'File System Agent',
          description: 'Manages file system access and operations',
          enabled: false,
          type: 'file',
          config: {}
        },
        {
          id: 'db-agent',
          name: 'Database Agent',
          description: 'Handles database connections and queries',
          enabled: false,
          type: 'database',
          config: {}
        },
        {
          id: 'api-agent',
          name: 'API Integration Agent',
          description: 'Manages external API connections',
          enabled: false,
          type: 'api',
          config: {}
        }
      ],
      endpoints: {
        local: 'http://localhost:3000/api/mcp',
      },
      protocols: {
        fileAccess: false,
        databaseConnections: false,
        apiIntegrations: false,
        contextualServices: false
      }
    }
  }),
  knowledgeBase: atom<KnowledgeBaseConfig>({
    templates: [],
    guides: [],
    practices: []
  }),
  shortcuts: map<Shortcuts>({
    toggleTerminal: {
      key: 'j',
      ctrlOrMetaKey: true,
      action: () => workbenchStore.toggleTerminal(),
    },
  })
};

