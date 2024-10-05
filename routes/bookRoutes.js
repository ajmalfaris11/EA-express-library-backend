const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

// Public routes (no authentication needed)
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

// Protected routes (require authentication)
router.post("/", protect, bookController.addBook);
router.put("/:id", protect, bookController.updateBook);
router.delete("/:id", protect, bookController.deleteBook);

module.exports = router;
