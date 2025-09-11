import React from 'react';

export interface VisitPatternInputProps {
  onSubmit?: (data: { annualDays: number; dailyHours: number; isLivingTogether: boolean }) => void;
}

export default function VisitPatternInput(_props: VisitPatternInputProps) {
  return (
    <section>
      <h2>Visitation Pattern</h2>
      <p>Form stub. To be implemented per tasks.md.</p>
    </section>
  );
}

