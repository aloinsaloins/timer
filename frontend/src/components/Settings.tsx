import React from 'react';

export interface SettingsProps {
  onChange?: (data: { ageBuffer: number; displayFormat: 'hours_only' | 'days_hours' | 'years_months_days'; locale: 'ja' | 'en' }) => void;
}

export default function Settings(_props: SettingsProps) {
  return (
    <section>
      <h2>Settings</h2>
      <p>Preferences stub. Age buffer, display format, and locale.</p>
    </section>
  );
}
