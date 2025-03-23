const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();
connectDB(); 

const app = express();
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors({
//   origin: 'http://10.0.2.2:5001/', // Replace with your Flutter app's URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));
app.use(cors({
  origin: ["http://10.0.2.2:5001", "http://localhost:5001", "http://localhost:3000"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/routes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error Handling Middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Start Server

const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));