const express = require("express");
const {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getAllAuthors).post(protect, addAuthor);
router.route("/:id").get(getAuthorById).put(protect, updateAuthor).delete(protect, deleteAuthor);

module.exports = router;
