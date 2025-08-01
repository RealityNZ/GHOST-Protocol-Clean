export interface TokenVault {
  id: string;
  name: string;
  encryptedToken: string;
  tokenType: 'discord_bot' | 'discord_user' | 'openai' | 'anthropic' | 'custom';
  createdAt: string;
  lastUsed?: string;
  expiresAt?: string;
  autoExpiry: boolean;
  expiryHours: number;
  maskedDisplay: string;
  salt: string;
  iv: string;
}

export interface SecurityConfig {
  encryptionEnabled: boolean;
  masterPassphrase?: string;
  deviceKeyEnabled: boolean;
  autoLockMinutes: number;
  auditLogging: boolean;
  tokenExpiryHours: number;
  requireReauth: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'token_created' | 'token_accessed' | 'token_expired' | 'token_deleted' | 'vault_unlocked' | 'vault_locked';
  tokenId?: string;
  tokenType?: string;
  success: boolean;
  details?: string;
  ipAddress?: string;
}

export interface EncryptionResult {
  encrypted: string;
  salt: string;
  iv: string;
}

export interface DecryptionResult {
  success: boolean;
  decrypted?: string;
  error?: string;
}