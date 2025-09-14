import request from 'supertest';
import app from '../../src/server.js';

describe('Contract: POST /api/calculate', () => {
  it('returns 200 with CalculationResponse schema', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({
        parent: { relationship: 'father', currentAge: 75, gender: 'male' },
        visitPattern: { annualDays: 10, dailyHours: 8, isLivingTogether: false },
        preferences: { ageBuffer: 0, displayFormat: 'days_hours', locale: 'en' }
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('calculation');
  });
});
