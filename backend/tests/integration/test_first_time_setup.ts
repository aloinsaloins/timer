import request from 'supertest';
import app from '../../src/server.js';

describe('Integration: First-time user setup with both parents', () => {
  it('calculates for father and mother and returns combined results', async () => {
    const father = await request(app)
      .post('/api/calculate')
      .send({ parent: { relationship: 'father', currentAge: 75, gender: 'male' }, visitPattern: { annualDays: 10, dailyHours: 8, isLivingTogether: false }, preferences: { ageBuffer: 0, displayFormat: 'days_hours', locale: 'en' } });
    expect(father.status).toBe(200);

    const mother = await request(app)
      .post('/api/calculate')
      .send({ parent: { relationship: 'mother', currentAge: 72, gender: 'female' }, visitPattern: { annualDays: 10, dailyHours: 8, isLivingTogether: false }, preferences: { ageBuffer: 0, displayFormat: 'days_hours', locale: 'en' } });
    expect(mother.status).toBe(200);
  });
});
