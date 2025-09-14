import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLifeExpectancy } from './lib/lifeExpectancy';
import { calculateRemainingTime } from './lib/timeCalculator';
import { getPreferences, savePreferences, type UserPreferences } from './services/prefs';
import TimeDisplay from './components/TimeDisplay';

export default function App() {
  const { t, i18n } = useTranslation();
  const [prefs, setPrefs] = useState<UserPreferences>(() => getPreferences());
  const [fatherAge, setFatherAge] = useState<number | ''>(75);
  const [motherAge, setMotherAge] = useState<number | ''>('');
  const [annualDays, setAnnualDays] = useState(10);
  const [dailyHours, setDailyHours] = useState(8);

  useEffect(() => {
    setPrefs(getPreferences());
  }, []);

  const fatherExpectancy = useMemo(() => getLifeExpectancy('male', 2023), []);
  const motherExpectancy = useMemo(() => getLifeExpectancy('female', 2023), []);

  const fatherResult = useMemo(() => {
    if (fatherAge === '' || !Number.isFinite(Number(fatherAge))) return null;
    return calculateRemainingTime({
      age: Number(fatherAge),
      gender: 'male',
      annualDays,
      dailyHours,
      ageBuffer: prefs.ageBuffer,
      lifeExpectancy: fatherExpectancy
    });
  }, [fatherAge, annualDays, dailyHours, prefs.ageBuffer, fatherExpectancy]);

  const motherResult = useMemo(() => {
    if (motherAge === '' || !Number.isFinite(Number(motherAge))) return null;
    return calculateRemainingTime({
      age: Number(motherAge),
      gender: 'female',
      annualDays,
      dailyHours,
      ageBuffer: prefs.ageBuffer,
      lifeExpectancy: motherExpectancy
    });
  }, [motherAge, annualDays, dailyHours, prefs.ageBuffer, motherExpectancy]);

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
    fatherAge: fatherAge !== '' && (Number(fatherAge) < 1 || Number(fatherAge) > 150 || !Number.isFinite(Number(fatherAge))) ? t('validation.invalidAge') : '',
    motherAge: motherAge !== '' && (Number(motherAge) < 1 || Number(motherAge) > 150 || !Number.isFinite(Number(motherAge))) ? t('validation.invalidAge') : '',
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
          {i18n.language === 'ja' ? '父親 年齢' : `${t('parent.father')} ${t('parent.age')}`}:
          <input
            aria-invalid={!!errors.fatherAge}
            type="number"
            min={1}
            max={150}
            value={fatherAge}
            onChange={(e) => setFatherAge(e.target.value === '' ? '' : Math.trunc(Number(e.target.value)))}
            style={{ marginLeft: 8, width: 100, borderColor: errors.fatherAge ? '#d33' : undefined }}
          />
          {errors.fatherAge && <span style={{ color: '#d33', marginLeft: 8 }}>{errors.fatherAge}</span>}
        </label>
        <label>
          {i18n.language === 'ja' ? '母親 年齢' : `${t('parent.mother')} ${t('parent.age')}`}:
          <input
            aria-invalid={!!errors.motherAge}
            type="number"
            min={1}
            max={150}
            value={motherAge}
            onChange={(e) => setMotherAge(e.target.value === '' ? '' : Math.trunc(Number(e.target.value)))}
            style={{ marginLeft: 8, width: 100, borderColor: errors.motherAge ? '#d33' : undefined }}
          />
          {errors.motherAge && <span style={{ color: '#d33', marginLeft: 8 }}>{errors.motherAge}</span>}
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
          {i18n.language === 'ja' ? '平均寿命' : 'Life Expectancy'} (2023):
          {t('parent.father')} 81.09 {t('results.years')},
          {t('parent.mother')} 87.14 {t('results.years')}
        </div>
      </section>

      <section style={{ padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{t('results.title')}</h2>
        {errors.annualDays || errors.dailyHours ? (
          <div style={{ marginTop: 8, color: '#d33' }}>{t('results.noData')}</div>
        ) : (
          <div style={{ marginTop: 8 }}>
            {fatherResult && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#666', marginBottom: 6, fontWeight: 'bold' }}>
                  {t('parent.father')}:
                </div>
                <div style={{ color: '#666', marginBottom: 6 }}>
                  {t('results.remainingYears')}: {fatherResult.remainingYears.toFixed(2)} {t('results.years')}
                </div>
                <TimeDisplay
                  remainingYears={fatherResult.remainingYears}
                  totalDays={fatherResult.totalRemainingDays}
                  totalHours={fatherResult.totalRemainingHours}
                  format={prefs.displayFormat}
                />
              </div>
            )}
            {motherResult && (
              <div>
                <div style={{ color: '#666', marginBottom: 6, fontWeight: 'bold' }}>
                  {t('parent.mother')}:
                </div>
                <div style={{ color: '#666', marginBottom: 6 }}>
                  {t('results.remainingYears')}: {motherResult.remainingYears.toFixed(2)} {t('results.years')}
                </div>
                <TimeDisplay
                  remainingYears={motherResult.remainingYears}
                  totalDays={motherResult.totalRemainingDays}
                  totalHours={motherResult.totalRemainingHours}
                  format={prefs.displayFormat}
                />
              </div>
            )}
            {!fatherResult && !motherResult && (
              <div style={{ color: '#999' }}>{t('results.noData')}</div>
            )}
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
