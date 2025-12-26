import { AppModule } from './types';
import { 
  LayoutDashboard, 
  Mail, 
  Hash, 
  Map, 
  MessageSquare, 
  HardDrive, 
  Users 
} from 'lucide-react';

export const APP_CONFIG = {
  name: "MermaidOS",
  version: "v5.0.0-beta",
  network: "OceanNet-X",
};

export const MODULES = [
  { id: AppModule.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
  { id: AppModule.SOCIAL, label: 'The Stream', icon: Hash }, // X-like
  { id: AppModule.MAIL, label: 'ProtonMail', icon: Mail },
  { id: AppModule.CHAT, label: 'Whisper', icon: MessageSquare },
  { id: AppModule.FORUM, label: 'Agora', icon: Users },
  { id: AppModule.MAPS, label: 'GhostMap', icon: Map },
  { id: AppModule.VAULT, label: 'Vault', icon: HardDrive },
];

export const MOCK_USER = {
  id: '0x7F...3A2',
  alias: 'SirenOne',
  avatarUrl: 'https://picsum.photos/seed/siren/200',
  trustScore: 99,
  cryptoBalance: 800.12,
};