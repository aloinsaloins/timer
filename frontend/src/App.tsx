import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLifeExpectancy } from './lib/lifeExpectancy';
import { calculateRemainingTime } from './lib/timeCalculator';
import { getPreferences, savePreferences, type UserPreferences } from './services/prefs';
import TimeDisplay from './components/TimeDisplay';

export default function App() {
  const { t, i18n } = useTranslation();
  const [prefs, setPrefs] = useState<UserPreferences>(() => getPreferences());
  const [fatherAge, setFatherAge] = useState<number | ''>(60);
  const [motherAge, setMotherAge] = useState<number | ''>(60);
  const [annualDays, setAnnualDays] = useState(10);
  const [dailyHours, setDailyHours] = useState(8);

  useEffect(() => {
    setPrefs(getPreferences());
  }, []);

  const fatherExpectancy = useMemo(() => getLifeExpectancy('male', 2023), []);
  const motherExpectancy = useMemo(() => getLifeExpectancy('female', 2023), []);

  // Auto-apply buffer when age >= life expectancy: buffer = (age - expectancy) + 1 (floored exceed + 1)
  useEffect(() => {
    if (fatherAge === '' || !Number.isFinite(Number(fatherAge))) return;
    const ageNum = Number(fatherAge);
    const exceed = ageNum - fatherExpectancy;
    if (exceed >= 0) {
      const autoBuffer = Math.floor(exceed) + 1;
      if (autoBuffer > 0 && autoBuffer !== prefs.ageBufferFather) {
        setPrefs(savePreferences({ ageBufferFather: autoBuffer }));
      }
    } else {
      if (prefs.ageBufferFather !== 0) {
        setPrefs(savePreferences({ ageBufferFather: 0 }));
      }
    }
  }, [fatherAge, fatherExpectancy, prefs.ageBufferFather]);

  useEffect(() => {
    if (motherAge === '' || !Number.isFinite(Number(motherAge))) return;
    const ageNum = Number(motherAge);
    const exceed = ageNum - motherExpectancy;
    if (exceed >= 0) {
      const autoBuffer = Math.floor(exceed) + 1;
      if (autoBuffer > 0 && autoBuffer !== prefs.ageBufferMother) {
        setPrefs(savePreferences({ ageBufferMother: autoBuffer }));
      }
    } else {
      if (prefs.ageBufferMother !== 0) {
        setPrefs(savePreferences({ ageBufferMother: 0 }));
      }
    }
  }, [motherAge, motherExpectancy, prefs.ageBufferMother]);

  const fatherResult = useMemo(() => {
    if (fatherAge === '' || !Number.isFinite(Number(fatherAge))) return null;
    return calculateRemainingTime({
      age: Number(fatherAge),
      gender: 'male',
      annualDays,
      dailyHours,
      ageBuffer: prefs.ageBufferFather,
      lifeExpectancy: fatherExpectancy
    });
  }, [fatherAge, annualDays, dailyHours, prefs.ageBufferFather, fatherExpectancy]);

  const motherResult = useMemo(() => {
    if (motherAge === '' || !Number.isFinite(Number(motherAge))) return null;
    return calculateRemainingTime({
      age: Number(motherAge),
      gender: 'female',
      annualDays,
      dailyHours,
      ageBuffer: prefs.ageBufferMother,
      lifeExpectancy: motherExpectancy
    });
  }, [motherAge, annualDays, dailyHours, prefs.ageBufferMother, motherExpectancy]);

  function updateAgeBufferFather(next: number) {
    const updated = savePreferences({ ageBufferFather: next });
    setPrefs(updated);
  }

  function updateAgeBufferMother(next: number) {
    const updated = savePreferences({ ageBufferMother: next });
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

      <div style={{ display: 'flex', gap: 16, marginTop: 16, alignItems: 'stretch' }}>
        <section style={{ display: 'grid', gap: 12, padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, flex: 1 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{t('parent.title')}</h2>
        <label>
          {`${t('parent.father')} ${t('parent.age')}`}:
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
          <span style={{ marginLeft: 12, color: '#666', fontSize: 13 }}>
            {t('labels.lifeExpectancy')} (2023): {fatherExpectancy.toFixed(2)} {t('results.years')}
          </span>
          <div style={{ marginTop: 8 }}>
            <span>{`${t('parent.father')} ${t('settings.ageBuffer')}`} ({t('settings.yearsUnit')}):</span>
            <input
              type="number"
              min={0}
              max={50}
              step={1}
              value={prefs.ageBufferFather}
              onChange={(e) => updateAgeBufferFather(Number(e.target.value))}
              style={{ marginLeft: 8, width: 80 }}
            />
            <div style={{ marginTop: 6, color: '#666', fontSize: 13 }}>{t('settings.ageBufferHelp')}</div>
          </div>
        </label>
        <label>
          {`${t('parent.mother')} ${t('parent.age')}`}:
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
          <span style={{ marginLeft: 12, color: '#666', fontSize: 13 }}>
            {t('labels.lifeExpectancy')} (2023): {motherExpectancy.toFixed(2)} {t('results.years')}
          </span>
          <div style={{ marginTop: 8 }}>
            <span>{`${t('parent.mother')} ${t('settings.ageBuffer')}`} ({t('settings.yearsUnit')}):</span>
            <input
              type="number"
              min={0}
              max={50}
              step={1}
              value={prefs.ageBufferMother}
              onChange={(e) => updateAgeBufferMother(Number(e.target.value))}
              style={{ marginLeft: 8, width: 80 }}
            />
            <div style={{ marginTop: 6, color: '#666', fontSize: 13 }}>{t('settings.ageBufferHelp')}</div>
          </div>
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

        <section style={{ padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, flex: 1 }}>
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
      </div>

      <section style={{ display: 'grid', gap: 12, padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, marginTop: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{t('settings.title')}</h2>
        <label>
          {t('settings.displayFormat')}:
          <select
            value={prefs.displayFormat}
            onChange={(e) => setPrefs(savePreferences({ displayFormat: e.target.value as UserPreferences['displayFormat'] }))}
            style={{ marginLeft: 8 }}
          >
            <option value="hours_only">{t('settings.displayFormatOptions.hours_only')}</option>
            <option value="days_hours">{t('settings.displayFormatOptions.days_hours')}</option>
            <option value="years_months_days">{t('settings.displayFormatOptions.years_months_days')}</option>
          </select>
        </label>
        {/* <div style={{ color: '#666' }}>
          {i18n.language === 'ja' ? '平均寿命' : 'Life Expectancy'} (2023):
          {t('parent.father')} 81.09 {t('results.years')},
          {t('parent.mother')} 87.14 {t('results.years')}
        </div> */}
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
