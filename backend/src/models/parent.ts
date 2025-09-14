import type { Gender, Relationship } from './types.js';

export interface Parent {
  id: string;
  relationship: Relationship;
  currentAge: number; // 1-150
  customLifeExpectancy?: number; // Optional override
  createdAt: Date;
  updatedAt: Date;
}

