export type DisplayFormat = 'hours_only' | 'days_hours' | 'years_months_days';

export interface UserPreferences {
  ageBufferFather: number; // 0-50
  ageBufferMother: number; // 0-50
  displayFormat: DisplayFormat;
  locale: 'ja' | 'en';
  theme: 'light' | 'dark' | 'auto';
}

const STORAGE_KEYS = {
  preferences: 'ptvt_preferences'
} as const;

const DEFAULT_PREFS: UserPreferences = {
  ageBufferFather: 0,
  ageBufferMother: 0,
  displayFormat: 'days_hours',
  locale: 'en',
  theme: 'auto'
};

export function getPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.preferences);
    if (!raw) return { ...DEFAULT_PREFS };
    const parsed = JSON.parse(raw) as Partial<UserPreferences> & { ageBuffer?: number };

    // Migration: if legacy single ageBuffer exists, use it for both
    const legacy = typeof parsed.ageBuffer === 'number' ? parsed.ageBuffer : undefined;
    const clamp = (n: number) => Math.max(0, Math.min(50, Math.round(n)));

    const merged: UserPreferences = {
      ageBufferFather: typeof parsed.ageBufferFather === 'number' ? clamp(parsed.ageBufferFather) : (legacy !== undefined ? clamp(legacy) : DEFAULT_PREFS.ageBufferFather),
      ageBufferMother: typeof parsed.ageBufferMother === 'number' ? clamp(parsed.ageBufferMother) : (legacy !== undefined ? clamp(legacy) : DEFAULT_PREFS.ageBufferMother),
      displayFormat: (parsed.displayFormat as DisplayFormat) ?? DEFAULT_PREFS.displayFormat,
      locale: parsed.locale ?? DEFAULT_PREFS.locale,
      theme: parsed.theme ?? DEFAULT_PREFS.theme
    };

    // Sanitize display format
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
  const clamp = (n: number) => Math.max(0, Math.min(50, Math.round(n)));
  const current = getPreferences();
  const next: UserPreferences = {
    ...current,
    ...update,
  };
  // Ensure buffers are within bounds when present
  if (typeof next.ageBufferFather === 'number') next.ageBufferFather = clamp(next.ageBufferFather);
  if (typeof next.ageBufferMother === 'number') next.ageBufferMother = clamp(next.ageBufferMother);

  localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(next));
  return next;
}
