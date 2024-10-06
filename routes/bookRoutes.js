const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// Protect the routes that require authentication
router.post("/", protect, bookController.addBook);
router.put("/:id", protect, bookController.updateBook);
router.delete("/:id", protect, bookController.deleteBook);

module.exports = router;
