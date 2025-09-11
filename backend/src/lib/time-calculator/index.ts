import type { Gender } from '../../models/types.js';

export interface CalculateParams {
  age: number;
  gender: Gender;
  annualDays: number;
  dailyHours: number;
  ageBuffer: number;
  lifeExpectancy?: number; // optional override
}

export function calculateRemainingTime(_params: CalculateParams): {
  remainingYears: number;
  totalRemainingDays: number;
  totalRemainingHours: number;
} {
  throw new Error('Not implemented');
}

