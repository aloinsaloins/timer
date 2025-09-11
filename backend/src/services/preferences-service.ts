import type { UserPreferences } from '../models/types.js';

// Simple in-memory preferences store for MVP
const memory: { prefs?: UserPreferences } = {};

export class PreferencesService {
  async get(): Promise<UserPreferences | undefined> {
    // Intentionally not implemented in RED phase
    void memory;
    throw new Error('Not implemented');
  }

  async save(_prefs: UserPreferences): Promise<UserPreferences> {
    // Intentionally not implemented in RED phase
    throw new Error('Not implemented');
  }
}

