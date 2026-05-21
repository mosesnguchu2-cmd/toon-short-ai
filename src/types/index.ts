export interface Scene {
  id: string;
  text: string;
  imageUrl: string;
  audioUrl?: string;
  duration: number; // in seconds
  subtitle: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  scenes: Scene[];
  createdAt: number;
  updatedAt: number;
  theme: string;
}

export type AppView = 'dashboard' | 'create' | 'editor' | 'preview';