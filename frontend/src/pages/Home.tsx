import React from 'react';
import ParentInput from '../components/ParentInput';
import VisitPatternInput from '../components/VisitPatternInput';
import TimeDisplay from '../components/TimeDisplay';
import Settings from '../components/Settings';

export default function Home() {
  return (
    <main>
      <ParentInput />
      <VisitPatternInput />
      <TimeDisplay />
      <Settings />
    </main>
  );
}

