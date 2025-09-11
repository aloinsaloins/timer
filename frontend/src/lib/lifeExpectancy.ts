export type Gender = 'male' | 'female';

export const LIFE_EXPECTANCY_2023 = {
  male: 81.09,
  female: 87.14,
  source: 'Ministry of Health, Labour and Welfare of Japan (2023)'
} as const;

export function getLifeExpectancy(gender: Gender, year = 2023): number {
  // For MVP, we only carry 2023 data
  if (year !== 2023) {
    return LIFE_EXPECTANCY_2023[gender];
  }
  return LIFE_EXPECTANCY_2023[gender];
}

