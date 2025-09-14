import request from 'supertest';
import app from '../../src/server.js';

describe('Integration: Single parent entry', () => {
  it('works with only one parent', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({ parent: { relationship: 'mother', currentAge: 70, gender: 'female' }, visitPattern: { annualDays: 30, dailyHours: 10, isLivingTogether: false }, preferences: { ageBuffer: 0, displayFormat: 'days_hours', locale: 'en' } });
    expect(res.status).toBe(200);
  });
});
