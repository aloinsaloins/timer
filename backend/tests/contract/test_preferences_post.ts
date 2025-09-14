import request from 'supertest';
import app from '../../src/server.js';

describe('Contract: POST /api/preferences', () => {
  it('saves preferences and returns 200 with saved object', async () => {
    const payload = {
      ageBuffer: 0,
      useCustomLifeExpectancy: false,
      displayFormat: 'days_hours',
      locale: 'en',
      theme: 'auto',
      enableReminders: false
    };
    const res = await request(app).post('/api/preferences').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(payload);
  });
});
