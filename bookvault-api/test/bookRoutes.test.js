const request = require('supertest');
const app = require('../server');

describe('GET /api/books', () => {
  it('should return 200 and an array of books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
