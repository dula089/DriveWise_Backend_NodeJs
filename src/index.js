const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Error Handling Middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// const connectDB = require("./db");
// const routes = require('./routes/routes')

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test Route
// app.get("/", (req, res) => {
//   res.json({ message: "Node.js Backend for Flutter is Running!" });
// });

app.use("/api", routes);

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
