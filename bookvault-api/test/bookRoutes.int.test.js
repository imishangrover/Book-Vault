const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../server');
const Book = require('../models/Book');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Book.deleteMany(); // Clean DB after each test
});

describe('Book API Integration Tests', () => {
  it('POST /api/books - create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: 'Test Book', author: 'Author' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Book');
  });

  it('GET /api/books - should return all books', async () => {
    await Book.create({ title: 'Sample Book', author: 'John' });

    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Sample Book');
  });

  it('PUT /api/books/:id - update a book', async () => {
    const book = await Book.create({ title: 'Old Title', author: 'A' });

    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .send({ title: 'Updated Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('DELETE /api/books/:id - delete a book', async () => {
    const book = await Book.create({ title: 'Book to Delete' });

    const res = await request(app).delete(`/api/books/${book._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });
});
