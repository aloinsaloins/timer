import type { Gender } from './types.js';

export interface LifeExpectancyData {
  year: number;
  gender: Gender;
  expectancy: number;
  source: string;
  updatedAt: Date;
}

export const LIFE_EXPECTANCY_2023 = {
  male: 81.09,
  female: 87.14,
  source: 'Ministry of Health, Labour and Welfare of Japan (2023)'
} as const;

