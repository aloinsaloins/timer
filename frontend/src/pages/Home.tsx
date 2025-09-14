import React from 'react';
import ParentInput from '../components/ParentInput';
import VisitPatternInput from '../components/VisitPatternInput';
import TimeDisplay from '../components/TimeDisplay';
import Settings from '../components/Settings';

export default function Home() {
  return (
    <main>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1 }}>
          <ParentInput />
        </div>
        <div style={{ flex: 1 }}>
          <TimeDisplay />
        </div>
      </div>
      <VisitPatternInput />
      <Settings />
    </main>
  );
}

