const express = require("express");
const router = express.Router();
let authors = require("../models/author");

// Get all authors
router.get("/", (req, res) => {
  res.json(authors);
});

// Get author by ID
router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

// Add a new author
router.post("/", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// Update an author
router.put("/:id", (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  if (author) {
    author.name = req.body.name || author.name;
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

// Delete an author
router.delete("/:id", (req, res) => {
  const authorIndex = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (authorIndex !== -1) {
    authors.splice(authorIndex, 1);
    res.json({ message: "Author deleted" });
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

module.exports = router;
