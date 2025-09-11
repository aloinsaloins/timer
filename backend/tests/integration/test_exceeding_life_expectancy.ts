import request from 'supertest';
import app from '../../src/server.js';

describe('Integration: Parent exceeding life expectancy', () => {
  it('uses 1 year when age >= life expectancy', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({ parent: { relationship: 'father', currentAge: 85, gender: 'male' }, visitPattern: { annualDays: 20, dailyHours: 6, isLivingTogether: false }, preferences: { ageBuffer: 0, displayFormat: 'progressive', locale: 'en' } });
    expect(res.status).toBe(200);
    expect(res.body?.calculation?.totalRemainingHours).toBe(120); // 1 * 20 * 6
  });
});

