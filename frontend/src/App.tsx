import React, { useEffect, useMemo, useState } from 'react';
import { getLifeExpectancy } from './lib/lifeExpectancy';
import { calculateRemainingTime } from './lib/timeCalculator';
import { getPreferences, savePreferences, type UserPreferences } from './services/prefs';
import TimeDisplay from './components/TimeDisplay';

export default function App() {
  const [prefs, setPrefs] = useState<UserPreferences>(() => getPreferences());
  const [age, setAge] = useState(75);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [annualDays, setAnnualDays] = useState(10);
  const [dailyHours, setDailyHours] = useState(8);

  useEffect(() => {
    setPrefs(getPreferences());
  }, []);

  const expectancy = useMemo(() => getLifeExpectancy(gender, 2023), [gender]);
  const result = useMemo(() => {
    return calculateRemainingTime({
      age,
      gender,
      annualDays,
      dailyHours,
      ageBuffer: prefs.ageBuffer,
      lifeExpectancy: expectancy
    });
  }, [age, gender, annualDays, dailyHours, prefs.ageBuffer, expectancy]);

  function updateAgeBuffer(next: number) {
    const clamped = Math.max(0, Math.min(10, Math.round(next)));
    const updated = savePreferences({ ageBuffer: clamped });
    setPrefs(updated);
  }

  // Simple input validation
  const errors = {
    age: age < 1 || age > 150 || !Number.isFinite(age) ? 'Age must be between 1 and 150' : '',
    annualDays: annualDays < 0 || annualDays > 365 || !Number.isFinite(annualDays) ? 'Days must be 0-365' : '',
    dailyHours: dailyHours < 0 || dailyHours > 24 || !Number.isFinite(dailyHours) ? 'Hours must be 0-24' : ''
  } as const;

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Parent Time Visualization Timer</h1>
      <p style={{ color: '#555', marginTop: 0 }}>Static-only MVP: all calculations run in your browser.</p>

      <section style={{ display: 'grid', gap: 12, padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Input</h2>
        <label>
          Age:
          <input
            aria-invalid={!!errors.age}
            type="number"
            min={1}
            max={150}
            value={age}
            onChange={(e) => setAge(Math.trunc(Number(e.target.value)))}
            style={{ marginLeft: 8, width: 100, borderColor: errors.age ? '#d33' : undefined }}
          />
          {errors.age && <span style={{ color: '#d33', marginLeft: 8 }}>{errors.age}</span>}
        </label>
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} style={{ marginLeft: 8 }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Annual Days Together:
          <input
            aria-invalid={!!errors.annualDays}
            type="number"
            min={0}
            max={365}
            step={1}
            value={annualDays}
            onChange={(e) => setAnnualDays(Number(e.target.value))}
            style={{ marginLeft: 8, width: 100, borderColor: errors.annualDays ? '#d33' : undefined }}
          />
          {errors.annualDays && <span style={{ color: '#d33', marginLeft: 8 }}>{errors.annualDays}</span>}
        </label>
        <label>
          Hours per Day:
          <input
            aria-invalid={!!errors.dailyHours}
            type="number"
            min={0}
            max={24}
            step={0.5}
            value={dailyHours}
            onChange={(e) => setDailyHours(Number(e.target.value))}
            style={{ marginLeft: 8, width: 100, borderColor: errors.dailyHours ? '#d33' : undefined }}
          />
          {errors.dailyHours && <span style={{ color: '#d33', marginLeft: 8 }}>{errors.dailyHours}</span>}
        </label>
      </section>

      <section style={{ display: 'grid', gap: 12, padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Preferences</h2>
        <label>
          Age Buffer (years):
          <input type="number" min={0} max={10} value={prefs.ageBuffer} onChange={(e) => updateAgeBuffer(Number(e.target.value))} style={{ marginLeft: 8, width: 80 }} />
        </label>
        <label>
          Display Format:
          <select
            value={prefs.displayFormat}
            onChange={(e) => setPrefs(savePreferences({ displayFormat: e.target.value as UserPreferences['displayFormat'] }))}
            style={{ marginLeft: 8 }}
          >
            <option value="progressive">Progressive</option>
            <option value="hours_only">Hours Only</option>
            <option value="days_hours">Days + Hours</option>
            <option value="years_months_days">Years, Months, Days</option>
          </select>
        </label>
        <div style={{ color: '#666' }}>Life Expectancy (2023): {gender === 'male' ? '81.09' : '87.14'} years</div>
      </section>

      <section style={{ padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Result</h2>
        {errors.age || errors.annualDays || errors.dailyHours ? (
          <div style={{ marginTop: 8, color: '#d33' }}>Please fix input errors to see the result.</div>
        ) : (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: '#666', marginBottom: 6 }}>Remaining Years (raw): {result.remainingYears.toFixed(2)}</div>
            <TimeDisplay
              remainingYears={result.remainingYears}
              totalDays={result.totalRemainingDays}
              totalHours={result.totalRemainingHours}
              format={prefs.displayFormat}
            />
          </div>
        )}
      </section>

      <footer style={{ marginTop: 24, color: '#777' }}>
        <small>Source: MHLW Japan (2023). This static MVP stores preferences in your browser only.</small>
      </footer>
    </div>
  );
}
