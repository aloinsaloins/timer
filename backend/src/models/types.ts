// Shared types for frontend/backend integration
export type Relationship = 'father' | 'mother' | 'other';
export type Gender = 'male' | 'female';

export enum DisplayFormat {
  HOURS_ONLY = 'hours_only',
  DAYS_HOURS = 'days_hours',
  YEARS_MONTHS_DAYS = 'years_months_days',
  PROGRESSIVE = 'progressive'
}

export interface Parent {
  id: string;
  relationship: Relationship;
  currentAge: number; // 1-150
  customLifeExpectancy?: number; // currentAge-150
  createdAt: Date;
  updatedAt: Date;
}

export interface VisitationPattern {
  id: string;
  parentId: string;
  annualDays: number; // 0-365, decimal allowed
  dailyHours: number; // 0-24, decimal allowed
  isLivingTogether: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface UserPreferences {
  id: string;
  userId?: string;
  ageBuffer: number; // 0-10
  useCustomLifeExpectancy: boolean;
  displayFormat: DisplayFormat;
  locale: 'ja' | 'en';
  theme: 'light' | 'dark' | 'auto';
  enableReminders: boolean;
  reminderFrequency?: 'weekly' | 'monthly' | 'quarterly';
  createdAt: Date;
  updatedAt: Date;
}

export interface LifeExpectancyData {
  year: number;
  gender: Gender;
  expectancy: number;
  source: string;
  updatedAt: Date;
}

export interface CalculationRequest {
  parent: Omit<Parent, 'id' | 'createdAt' | 'updatedAt'>;
  visitPattern: Omit<VisitationPattern, 'id' | 'parentId' | 'createdAt' | 'updatedAt'>;
  preferences: Pick<UserPreferences, 'ageBuffer' | 'displayFormat' | 'locale'>;
}

export interface CalculationResponse {
  success: boolean;
  calculation?: TimeCalculation;
  error?: {
    code: string;
    message: string;
  };
}

