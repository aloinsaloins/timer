import type { Gender, Relationship } from '../models/types.js';

export function getGenderFromRelationship(relationship: Relationship): Gender {
  switch (relationship) {
    case 'father':
      return 'male';
    case 'mother':
      return 'female';
    case 'other':
      // Default to male for 'other' - can be customized later if needed
      return 'male';
    default:
      return 'male';
  }
}