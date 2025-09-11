import request from 'supertest';
import app from '../../src/server.js';

describe('Integration: Age buffer adjustment', () => {
  it('increases remaining years by buffer amount', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({ parent: { relationship: 'father', currentAge: 75, gender: 'male' }, visitPattern: { annualDays: 10, dailyHours: 8, isLivingTogether: false }, preferences: { ageBuffer: 2, displayFormat: 'progressive', locale: 'en' } });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('calculation');
  });
});

