const Book = require("../models/book");

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res) => {
  const books = await Book.find().populate("author");
  res.json(books);
};

// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
const addBook = async (req, res) => {
  const { title, author, image, description } = req.body;
  const book = new Book({ title, author, image, description });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
};

// @desc    Update book details
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  const { title, author, image, description } = req.body;
  const book = await Book.findById(req.params.id);
  if (book) {
    book.title = title;
    book.author = author;
    book.image = image;
    book.description = description;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.remove();
    res.json({ message: "Book removed" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
