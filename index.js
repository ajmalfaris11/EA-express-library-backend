require('dotenv').config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser'); // For handling cookies
const cors = require("cors"); // For handling cross-origin requests

const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const userRoutes = require("./routes/userRoutes"); // Assuming you have user routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and handle cookies
app.use(bodyParser.json());
app.use(cookieParser());

// Enable CORS (with credentials if necessary)
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL or domain allowed to access the API
  credentials: true // Allow sending cookies and headers
}));

// MongoDB connection
const dbURI = process.env.MONGO_URI || "your-fallback-mongo-uri";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/users", userRoutes); // Route for user signup/login (if applicable)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
