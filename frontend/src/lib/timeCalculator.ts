import type { Gender } from './lifeExpectancy';

export interface CalculateParams {
  age: number;
  gender: Gender;
  annualDays: number;
  dailyHours: number;
  ageBuffer: number; // 0-10
  lifeExpectancy?: number; // optional override
}

export function calculateRemainingTime(params: CalculateParams): {
  remainingYears: number;
  totalRemainingDays: number;
  totalRemainingHours: number;
} {
  const { age, annualDays, dailyHours, ageBuffer, lifeExpectancy } = params;
  const le = lifeExpectancy ?? 0;
  let remainingYears: number;
  if (age >= le) {
    remainingYears = 1 + ageBuffer;
  } else {
    remainingYears = (le - age) + ageBuffer;
  }
  const totalRemainingDays = remainingYears * annualDays;
  const totalRemainingHours = totalRemainingDays * dailyHours;
  return { remainingYears, totalRemainingDays, totalRemainingHours };
}

