import React from 'react';
import { useTranslation } from 'react-i18next';

export type DisplayFormat = 'hours_only' | 'days_hours' | 'years_months_days';

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
  const { t } = useTranslation();

  let content: React.ReactNode = null;

  if (format === 'hours_only') {
    content = <div style={{ fontSize: 20, fontWeight: 600 }}>{totalHours.toFixed(1)} {t('results.hours')}</div>;
  } else if (format === 'days_hours') {
    const { days, hours } = formatDaysHours(totalHours);
    content = (
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        {days} {t('results.days')} {hours} {t('results.hours')}
      </div>
    );
  } else if (format === 'years_months_days') {
    const ymd = formatYearsMonthsDays(remainingYears);
    content = (
      <div style={{ fontSize: 18, fontWeight: 600 }}>
        {ymd.years} {t('results.years')} {ymd.months} {t('results.months')} {ymd.days} {t('results.days')}
      </div>
    );
  }

  return (
    <section>
      <h2>{t('results.timeRemaining')}</h2>
      <div style={{ marginTop: 8 }}>{content}</div>
      <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
        {t('labels.secondary')}: {totalDays.toFixed(2)} {t('results.days')} ≈ {totalHours.toFixed(1)} {t('results.hours')}
      </div>
    </section>
  );
}

