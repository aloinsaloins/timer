import React from 'react';
import { useTranslation } from 'react-i18next';

export type DisplayFormat = 'hours_only' | 'days_hours' | 'years_months_days' | 'progressive';

export interface TimeDisplayProps {
  totalHours: number;
  totalDays: number;
  remainingYears: number;
  format: DisplayFormat;
}

function formatDaysHours(totalHours: number) {
  const days = Math.floor(totalHours / 24);
  const hours = Math.round(totalHours - days * 24);
  return { days, hours };
}

function formatYearsMonthsDays(remainingYears: number) {
  const years = Math.floor(remainingYears);
  const monthsFloat = (remainingYears - years) * 12;
  const months = Math.floor(monthsFloat);
  const days = Math.floor((monthsFloat - months) * 30.4375); // average month length
  return { years, months, days };
}

export default function TimeDisplay(props: TimeDisplayProps) {
  const { totalHours, totalDays, remainingYears, format } = props;
  const { t, i18n } = useTranslation();

  let content: React.ReactNode = null;

  if (format === 'hours_only') {
    content = <div style={{ fontSize: 20, fontWeight: 600 }}>{totalHours.toFixed(1)} {t('results.hours')}</div>;
  } else if (format === 'days_hours') {
    const { days, hours } = formatDaysHours(totalHours);
    content = (
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        {days} {i18n.language === 'ja' ? '日' : 'days'} {hours} {t('results.hours')}
      </div>
    );
  } else if (format === 'years_months_days') {
    const ymd = formatYearsMonthsDays(remainingYears);
    content = (
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        {ymd.years} {t('results.years')} {ymd.months} {i18n.language === 'ja' ? 'ヶ月' : 'months'} {ymd.days} {i18n.language === 'ja' ? '日' : 'days'}
      </div>
    );
  } else {
    // progressive
    if (totalHours < 72) {
      content = <div style={{ fontSize: 20, fontWeight: 600 }}>{totalHours.toFixed(1)} {t('results.hours')}</div>;
    } else if (totalDays < 365) {
      const { days, hours } = formatDaysHours(totalHours);
      content = (
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          {days} {i18n.language === 'ja' ? '日' : 'days'} {hours} {t('results.hours')}
        </div>
      );
    } else {
      const ymd = formatYearsMonthsDays(remainingYears);
      content = (
        <div style={{ fontSize: 18, fontWeight: 600 }}>
          {ymd.years} {t('results.years')} {ymd.months} {i18n.language === 'ja' ? 'ヶ月' : 'months'} {ymd.days} {i18n.language === 'ja' ? '日' : 'days'}
        </div>
      );
    }
  }

  return (
    <section>
      <h2>{i18n.language === 'ja' ? '残り時間' : 'Time Remaining'}</h2>
      <div style={{ marginTop: 8 }}>{content}</div>
      <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
        {i18n.language === 'ja' ? '詳細' : 'Secondary'}: {totalDays.toFixed(2)} {i18n.language === 'ja' ? '日' : 'days'} • {totalHours.toFixed(1)} {t('results.hours')}
      </div>
    </section>
  );
}
