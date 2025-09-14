export type DisplayFormat = 'hours_only' | 'days_hours' | 'years_months_days';

export interface UserPreferences {
  ageBuffer: number; // 0-50
  displayFormat: DisplayFormat;
  locale: 'ja' | 'en';
  theme: 'light' | 'dark' | 'auto';
}

const STORAGE_KEYS = {
  preferences: 'ptvt_preferences'
} as const;

const DEFAULT_PREFS: UserPreferences = {
  ageBuffer: 0,
  displayFormat: 'days_hours',
  locale: 'en',
  theme: 'auto'
};

export function getPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.preferences);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    const merged = { ...DEFAULT_PREFS, ...parsed } as UserPreferences;
    // Sanitize deprecated/unknown display formats (e.g., 'progressive')
    const validFormats: DisplayFormat[] = ['hours_only', 'days_hours', 'years_months_days'];
    if (!validFormats.includes(merged.displayFormat)) {
      merged.displayFormat = DEFAULT_PREFS.displayFormat;
    }
    return merged;
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

export function savePreferences(update: Partial<UserPreferences>): UserPreferences {
  const merged = { ...getPreferences(), ...update };
  localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(merged));
  return merged;
}
