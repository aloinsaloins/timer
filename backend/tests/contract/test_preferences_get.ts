import request from 'supertest';
import app from '../../src/server.js';

describe('Contract: GET /api/preferences', () => {
  it('returns 200 with UserPreferences or 404 when not found', async () => {
    const res = await request(app).get('/api/preferences');
    // Expect 200 for happy path contract to force RED
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('displayFormat');
  });
});

