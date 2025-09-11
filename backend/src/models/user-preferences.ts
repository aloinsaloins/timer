import type { DisplayFormat } from './types.js';

export interface UserPreferences {
  id: string;
  userId?: string;
  ageBuffer: number; // 0-10
  useCustomLifeExpectancy: boolean;
  displayFormat: DisplayFormat;
  locale: 'ja' | 'en';
  theme: 'light' | 'dark' | 'auto';
  enableReminders: boolean;
  reminderFrequency?: 'weekly' | 'monthly' | 'quarterly';
  createdAt: Date;
  updatedAt: Date;
}

