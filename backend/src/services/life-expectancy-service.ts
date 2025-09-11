import type { Gender } from '../models/types.js';
import { getLifeExpectancy } from '../lib/life-expectancy/index.js';

export class LifeExpectancyService {
  async get(gender: Gender, year = 2023): Promise<{ year: number; gender: Gender; expectancy: number }> {
    // Intentionally not implemented in RED phase
    void getLifeExpectancy; // keep import referenced
    throw new Error('Not implemented');
  }
}

