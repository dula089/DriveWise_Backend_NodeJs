const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); 
const routes = require('./routes/routes')

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB(); 

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Node.js Backend for Flutter is Running!" });
});

app.use('/api', routes);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});