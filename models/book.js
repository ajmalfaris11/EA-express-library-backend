const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String, // URL to the book image
    },
    publishedDate: {
        type: Date,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
