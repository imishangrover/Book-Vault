const express = require("express");
const router = express.Router();
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// @route   GET /api/books
// @desc    Get all books
router.get("/", getBooks);

// @route   POST /api/books
// @desc    Add a new book
router.post("/", addBook);

// @route   PUT /api/books/:id
// @desc    Update a book
router.put("/:id", updateBook);

// @route   DELETE /api/books/:id
// @desc    Delete a book
router.delete("/:id", deleteBook);

module.exports = router;
