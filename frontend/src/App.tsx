import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLifeExpectancy } from './lib/lifeExpectancy';
import { calculateRemainingTime } from './lib/timeCalculator';
import { getPreferences, savePreferences, type UserPreferences } from './services/prefs';
import TimeDisplay from './components/TimeDisplay';

export default function App() {
  const { t, i18n } = useTranslation();
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

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ja' ? 'en' : 'ja';
    i18n.changeLanguage(nextLang);
  };

  // Simple input validation
  const errors = {
    age: age < 1 || age > 150 || !Number.isFinite(age) ? t('validation.invalidAge') : '',
    annualDays: annualDays < 0 || annualDays > 365 || !Number.isFinite(annualDays) ? t('validation.invalidDays') : '',
    dailyHours: dailyHours < 0 || dailyHours > 24 || !Number.isFinite(dailyHours) ? t('validation.invalidHours') : ''
  } as const;

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h1 style={{ margin: 0 }}>{t('app.title')}</h1>
        <button
          onClick={toggleLanguage}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          {t('language.switch')}
        </button>
      </div>
      <p style={{ color: '#555', marginTop: 0 }}>{t('app.subtitle')}</p>

      <section style={{ display: 'grid', gap: 12, padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{t('parent.title')}</h2>
        <label>
          {t('parent.age')}:
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
          {t('parent.gender')}:
          <select value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} style={{ marginLeft: 8 }}>
            <option value="male">{t('parent.male')}</option>
            <option value="female">{t('parent.female')}</option>
          </select>
        </label>
        <label>
          {t('visitPattern.annualDays')}:
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
          {t('visitPattern.dailyHours')}:
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
        <h2 style={{ margin: 0, fontSize: 18 }}>{t('settings.title')}</h2>
        <label>
          {t('settings.ageBuffer')} ({t('settings.yearsUnit')}):
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
        <div style={{ color: '#666' }}>
          {i18n.language === 'ja' ? '平均寿命' : 'Life Expectancy'} (2023): {gender === 'male' ? '81.09' : '87.14'} {t('results.years')}
        </div>
      </section>

      <section style={{ padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{t('results.title')}</h2>
        {errors.age || errors.annualDays || errors.dailyHours ? (
          <div style={{ marginTop: 8, color: '#d33' }}>{t('results.noData')}</div>
        ) : (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: '#666', marginBottom: 6 }}>
              {t('results.remainingYears')}: {result.remainingYears.toFixed(2)} {t('results.years')}
            </div>
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
        <small>
          {i18n.language === 'ja'
            ? '出典: 厚生労働省 (2023年). このアプリケーションはブラウザのみで動作します。'
            : 'Source: MHLW Japan (2023). This static MVP stores preferences in your browser only.'}
        </small>
      </footer>
    </div>
  );
}