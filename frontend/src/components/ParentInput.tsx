import React from 'react';

export interface ParentInputProps {
  onSubmit?: (data: { relationship: 'father' | 'mother' | 'other'; currentAge: number; gender: 'male' | 'female' }) => void;
}

export default function ParentInput(_props: ParentInputProps) {
  return (
    <section>
      <h2>Parent Information</h2>
      <p>Form stub. Validation and fields to be implemented.</p>
    </section>
  );
}

