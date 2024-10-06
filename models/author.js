const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
}, {
  timestamps: true,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
