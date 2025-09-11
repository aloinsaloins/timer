#!/usr/bin/env node
import { getLifeExpectancy } from './index.js';

function parseArg(name: string, fallback?: number | string): string | number | undefined {
  const idx = process.argv.findIndex((a) => a === `--${name}`);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

try {
  const gender = String(parseArg('gender')) as 'male' | 'female';
  const year = Number(parseArg('year', 2023));
  const expectancy = getLifeExpectancy(gender, year);
  // eslint-disable-next-line no-console
  console.log(expectancy);
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('CLI not implemented:', (err as Error).message);
  process.exitCode = 1;
}

