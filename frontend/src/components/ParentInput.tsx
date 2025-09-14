import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface ParentInputProps {
  onSubmit?: (data: { relationship: 'father' | 'mother'; currentAge: number }) => void;
}

export default function ParentInput(props: ParentInputProps) {
  const { t } = useTranslation();
  const [relationship, setRelationship] = useState<'father' | 'mother'>('father');
  const [age, setAge] = useState<string>('');
  const [errors, setErrors] = useState<{ age?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { age?: string } = {};

    const ageNum = parseInt(age, 10);
    if (!age) {
      newErrors.age = t('validation.required');
    } else if (isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
      newErrors.age = t('validation.invalidAge');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (props.onSubmit) {
      props.onSubmit({ relationship, currentAge: ageNum });
    }
  };

  return (
    <section>
      <h2>{t('parent.title')}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            {t('parent.relationship')}
          </label>
          <div style={{ display: 'flex', gap: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="relationship"
                value="father"
                checked={relationship === 'father'}
                onChange={(e) => setRelationship(e.target.value as 'father')}
                style={{ marginRight: 8 }}
              />
              <span>{t('parent.father')}</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="relationship"
                value="mother"
                checked={relationship === 'mother'}
                onChange={(e) => setRelationship(e.target.value as 'mother')}
                style={{ marginRight: 8 }}
              />
              <span>{t('parent.mother')}</span>
            </label>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label htmlFor="age" style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
            {t('parent.age')}
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="0"
            max="150"
            style={{
              padding: '8px 12px',
              border: errors.age ? '1px solid #ef4444' : '1px solid #d1d5db',
              borderRadius: 4,
              width: 120,
              fontSize: 16
            }}
          />
          {errors.age && (
            <div style={{ color: '#ef4444', fontSize: 14, marginTop: 4 }}>
              {errors.age}
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          {t('actions.calculate')}
        </button>
      </form>
    </section>
  );
}

