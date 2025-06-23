// tests/bookController.test.js
const Book = require('../models/Book');
const bookController = require('../controllers/bookController');

jest.mock('../models/Book');

describe('bookController', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getBooks - should return all books', async () => {
    const books = [{ title: '1984' }];
    Book.find.mockResolvedValue(books);

    await bookController.getBooks({}, mockRes);
    expect(Book.find).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(books);
  });

  it('getBookById - should return book by ID', async () => {
    const req = { params: { id: '1' } };
    const book = { title: '1984' };
    Book.findById.mockResolvedValue(book);

    await bookController.getBookById(req, mockRes);
    expect(Book.findById).toHaveBeenCalledWith('1');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(book);
  });

  it('getBookById - should handle book not found', async () => {
    const req = { params: { id: '1' } };
    Book.findById.mockResolvedValue(null);

    await bookController.getBookById(req, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('Book not found');
  });

  it('createBook - should create and return new book', async () => {
    const req = { body: { title: 'New Book' } };
    const savedBook = { _id: '1', title: 'New Book' };
    Book.create.mockResolvedValue(savedBook);

    await bookController.createBook(req, mockRes);
    expect(Book.create).toHaveBeenCalledWith(req.body);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(savedBook);
  });

  it('updateBook - should update and return updated book', async () => {
    const req = {
      params: { id: '1' },
      body: { title: 'Updated Book' }
    };
    const updatedBook = { _id: '1', title: 'Updated Book' };

    Book.findByIdAndUpdate.mockResolvedValue(updatedBook);

    await bookController.updateBook(req, mockRes);
    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, {
      new: true,
      runValidators: true
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(updatedBook);
  });

  it('updateBook - should handle book not found', async () => {
    const req = { params: { id: '1' }, body: {} };
    Book.findByIdAndUpdate.mockResolvedValue(null);

    await bookController.updateBook(req, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('Book not found');
  });

  it('deleteBook - should delete a book and return success', async () => {
    const req = { params: { id: '1' } };
    const deletedBook = { _id: '1' };
    Book.findByIdAndDelete.mockResolvedValue(deletedBook);

    await bookController.deleteBook(req, mockRes);
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Book deleted successfully'
    });
  });

  it('deleteBook - should handle book not found', async () => {
    const req = { params: { id: '1' } };
    Book.findByIdAndDelete.mockResolvedValue(null);

    await bookController.deleteBook(req, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.send).toHaveBeenCalledWith('Book not found');
  });
});
