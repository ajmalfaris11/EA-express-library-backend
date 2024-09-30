const Author = require("../models/author");

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new author
exports.addAuthor = async (req, res) => {
  const newAuthor = new Author({
    name: req.body.name
  });
  try {
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an author
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      author.name = req.body.name || author.name;
      const updatedAuthor = await author.save();
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (deletedAuthor) {
      res.json({ message: "Author deleted" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
