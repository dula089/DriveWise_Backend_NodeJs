const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/routes");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/routes"));
app.use("/api/user", require("./routes/userRoutes"));

// Assuming 'app' is your Express application instance
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error Handling Middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// app.use("/api", routes);

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
