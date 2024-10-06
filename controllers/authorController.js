const Author = require("../models/author");

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
const getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
};

// @desc    Get author by ID
// @route   GET /api/authors/:id
// @access  Public
const getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
};

// @desc    Add a new author
// @route   POST /api/authors
// @access  Private
const addAuthor = async (req, res) => {
  const { name, biography } = req.body;
  const author = new Author({ name, biography });
  const createdAuthor = await author.save();
  res.status(201).json(createdAuthor);
};

// @desc    Update author details
// @route   PUT /api/authors/:id
// @access  Private
const updateAuthor = async (req, res) => {
  const { name, biography } = req.body;
  const author = await Author.findById(req.params.id);
  if (author) {
    author.name = name;
    author.biography = biography;

    const updatedAuthor = await author.save();
    res.json(updatedAuthor);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
};

// @desc    Delete an author
// @route   DELETE /api/authors/:id
// @access  Private
const deleteAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await author.remove();
    res.json({ message: "Author removed" });
  } else {
    res.status(404).json({ message: "Author not found" });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
};
