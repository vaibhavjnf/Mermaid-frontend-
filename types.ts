export enum AppModule {
  DASHBOARD = 'DASHBOARD',
  MAIL = 'MAIL', // Proton-like
  SOCIAL = 'SOCIAL', // X-like (Twitter)
  MAPS = 'MAPS', // Ghost maps
  CHAT = 'CHAT', // Signal-like
  VAULT = 'VAULT', // Drive + Docs
  FORUM = 'FORUM', // Reddit/4chan style
}

export interface UserProfile {
  id: string;
  alias: string;
  avatarUrl: string;
  trustScore: number;
  cryptoBalance: number;
}

export interface EncryptedMail {
  id: string;
  sender: string;
  subject: string;
  timestamp: string;
  encryptedContent: string;
  decryptedContent?: string;
  isRead: boolean;
  securityLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface SocialPost {
  id: string;
  authorAlias: string;
  authorHandle: string;
  avatarUrl: string;
  content: string; // The tweet
  imageUrl?: string; // Optional now
  likes: number;
  reposts: number;
  replies: number;
  timestamp: string;
  isVerified: boolean;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: Date;
  isEncrypted: boolean;
}

export interface MapNode {
  id: string;
  x: number;
  y: number;
  type: 'SAFEHOUSE' | 'DROP_POINT' | 'RELAY_NODE' | 'HOSTILE';
  name: string;
  status: 'ACTIVE' | 'OFFLINE' | 'COMPROMISED';
}

export interface FileItem {
  id: string;
  name: string;
  type: 'DOC' | 'IMG' | 'KEY';
  size: string;
  lastModified: string;
  content?: string; // For docs
}