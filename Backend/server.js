// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// // import authRoutes from './routes/auth.js';
// // import paymentRoutes from './routes/paymentRoutes.js';
// import path from 'path';
// import fs from 'fs';

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Ensure uploads folder exists
// const uploadsDir = path.join(path.resolve(), 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Static route for uploaded screenshots
// app.use('/uploads', express.static(uploadsDir));

// // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/payments', paymentRoutes);

// // Error handler (optional)
// app.use((err, req, res, next) => {
//   console.error('❌ Server Error:', err.stack);
//   res.status(500).json({ error: 'Server error. Please try again later.' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import path from "path"
import fs from "fs"

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // React dev servers
    credentials: true,
  }),
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Ensure uploads folder exists
const uploadsDir = path.join(path.resolve(), "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Static route for uploaded files
app.use("/uploads", express.static(uploadsDir))

// Routes
app.use("/api/auth", authRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack)

  // Don't leak error details in production
  const message = process.env.NODE_ENV === "production" ? "Something went wrong!" : err.message

  res.status(err.status || 500).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`)
})

export default app
