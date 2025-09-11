import type { DisplayFormat } from './types.js';

export interface TimeCalculation {
  id: string;
  parentId: string;
  visitationPatternId: string;
  calculatedAt: Date;
  inputAge: number;
  inputLifeExpectancy: number;
  inputAnnualDays: number;
  inputDailyHours: number;
  inputAgeBuffer: number;
  remainingYears: number;
  totalRemainingDays: number;
  totalRemainingHours: number;
  displayFormat: DisplayFormat;
  formattedOutput: string;
}

