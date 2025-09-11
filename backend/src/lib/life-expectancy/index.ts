import type { Gender } from '../../models/types.js';
import { LIFE_EXPECTANCY_2023 } from '../../models/life-expectancy-data.js';

export function getLifeExpectancy(_gender: Gender, _year = 2023): number {
  // Intentionally not implemented for RED phase
  throw new Error('Not implemented');
}

