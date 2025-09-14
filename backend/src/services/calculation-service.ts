import type { CalculationRequest, CalculationResponse } from '../models/types.js';
import { calculateRemainingTime } from '../lib/time-calculator/index.js';
import { getGenderFromRelationship } from '../lib/utils.js';

export class CalculationService {
  async calculate(_req: CalculationRequest): Promise<CalculationResponse> {
    // Intentionally not implemented in RED phase
    void calculateRemainingTime; // keep import referenced
    void getGenderFromRelationship; // keep import referenced
    throw new Error('Not implemented');
  }
}

