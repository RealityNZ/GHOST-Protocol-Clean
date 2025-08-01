export interface PluginScript {
  id: string;
  name: string;
  description: string;
  code: string;
  enabled: boolean;
  type: 'prompt-preprocessor' | 'llm-swapper' | 'response-filter' | 'custom';
  version: string;
  author: string;
  createdAt: string;
  lastModified: string;
}

export interface PluginExecutionContext {
  message: any;
  persona: any;
  modifiers: any[];
  config: any;
}

export interface PluginResult {
  success: boolean;
  data?: any;
  error?: string;
  logs?: string[];
}

export interface PluginAPI {
  log: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  getConfig: () => any;
  setConfig: (config: any) => void;
  utils: {
    sanitizeText: (text: string) => string;
    formatTimestamp: (date: Date) => string;
    generateId: () => string;
  };
}