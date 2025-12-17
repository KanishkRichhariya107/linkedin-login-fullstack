const express = require("express");
const cors = require("cors");
require("dotenv").config();

const linkedinRoutes = require("./linkedin");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/auth", linkedinRoutes);

// Health check
app.get("/api", (req, res) => {
  res.send("Backend running on Vercel 🚀");
});

// Export for Vercel serverless
module.exports = app;
