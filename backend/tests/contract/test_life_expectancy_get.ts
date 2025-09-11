import request from 'supertest';
import app from '../../src/server.js';

describe('Contract: GET /api/life-expectancy', () => {
  it('returns 200 with life expectancy data', async () => {
    const res = await request(app).get('/api/life-expectancy?gender=male&year=2023');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('year', 2023);
    expect(res.body).toHaveProperty('gender', 'male');
    expect(res.body).toHaveProperty('expectancy');
  });
});

