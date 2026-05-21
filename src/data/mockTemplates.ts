import { Project } from '../types';

export const MOCK_TEMPLATES = [
  {
    id: 'forest',
    name: 'Magic Forest',
    description: 'Explore a world of glowing mushrooms and magic!',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/ca9fc6bd-e1b0-470a-a3ec-ae33bd3cd9b9/scene-forest-f2291f37-1779345008323.webp',
  },
  {
    id: 'space',
    name: 'Space Pals',
    description: 'Adventure with friendly aliens in far-off galaxies.',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/ca9fc6bd-e1b0-470a-a3ec-ae33bd3cd9b9/scene-space-567eb762-1779345007549.webp',
  },
  {
    id: 'monsters',
    name: 'Monster School',
    description: 'Learn magic at the whimsy school for little monsters.',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/ca9fc6bd-e1b0-470a-a3ec-ae33bd3cd9b9/scene-monsters-a63168ba-1779345007337.webp',
  }
];

export const APP_LOGO = 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/ca9fc6bd-e1b0-470a-a3ec-ae33bd3cd9b9/app-logo-d2421c74-1779345005953.webp';

export const generateMockStory = (theme: string, title: string): Project => {
  const id = Math.random().toString(36).substr(2, 9);
  const template = MOCK_TEMPLATES.find(t => t.id === theme) || MOCK_TEMPLATES[0];
  
  return {
    id,
    title: title || `My ${template.name} Adventure`,
    description: `A viral story about ${template.name}`,
    theme,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    scenes: [
      {
        id: '1',
        text: 'Once upon a time, there was a tiny explorer who found a secret portal.',
        imageUrl: template.imageUrl,
        duration: 5,
        subtitle: 'Once upon a time...'
      },
      {
        id: '2',
        text: 'Through the portal lay a world of wonder and hidden treasures!',
        imageUrl: template.imageUrl,
        duration: 5,
        subtitle: 'A world of wonder!'
      },
      {
        id: '3',
        text: 'And so, the greatest adventure of all time began right here.',
        imageUrl: template.imageUrl,
        duration: 5,
        subtitle: 'The adventure begins!'
      }
    ]
  };
};