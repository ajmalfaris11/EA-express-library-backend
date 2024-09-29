const express = require("express");
const router = express.Router();
let books = require("../models/book");

// Get all books
router.get("/", (req, res) => {
  res.json(books);
});

// Get book by ID
router.get("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Add a new book
router.post("/", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    authorId: req.body.authorId
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
router.put("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    book.title = req.body.title || book.title;
    book.authorId = req.body.authorId || book.authorId;
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports = router;
