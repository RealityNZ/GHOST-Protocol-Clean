export interface ArchivedServer {
  id: string;
  name: string;
  channels: ArchivedChannel[];
  exportedAt: string;
  messageCount: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface ArchivedChannel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  messages: ArchivedMessage[];
}

export interface ArchivedMessage {
  id: string;
  type: 'message' | 'image' | 'voice' | 'edit' | 'delete';
  content: string;
  author: {
    id: string;
    username: string;
    displayName?: string;
  };
  timestamp: string;
  mentions: string[];
  attachments?: ArchivedAttachment[];
  editHistory?: string[];
  reactions?: ArchivedReaction[];
}

export interface ArchivedAttachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  contentType: string;
}

export interface ArchivedReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface ReplaySession {
  id: string;
  name: string;
  server: ArchivedServer;
  currentMessageIndex: number;
  isPlaying: boolean;
  playbackSpeed: number;
  startedAt?: string;
  completedAt?: string;
  possessionResponses: ReplayResponse[];
}

export interface ReplayResponse {
  id: string;
  messageId: string;
  prompt: string;
  response: string;
  timestamp: string;
  persona: string;
  modifiers: string[];
  sent: boolean;
}

export interface OfflineConfig {
  autoSaveReplays: boolean;
  maxReplayHistory: number;
  compressionEnabled: boolean;
  encryptArchives: boolean;
}