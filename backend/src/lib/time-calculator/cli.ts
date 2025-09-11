#!/usr/bin/env node
import { calculateRemainingTime } from './index.js';

function parseArg(name: string, fallback?: number | string): string | number | undefined {
  const idx = process.argv.findIndex((a) => a === `--${name}`);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

try {
  const age = Number(parseArg('age'));
  const gender = String(parseArg('gender')) as 'male' | 'female';
  const days = Number(parseArg('days'));
  const hours = Number(parseArg('hours'));
  const buffer = Number(parseArg('buffer', 0));

  const result = calculateRemainingTime({
    age,
    gender,
    annualDays: days,
    dailyHours: hours,
    ageBuffer: buffer
  });

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result));
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('CLI not implemented:', (err as Error).message);
  process.exitCode = 1;
}

