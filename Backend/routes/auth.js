import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import Customer from "../models/Customer.js"
import { registerUser, loginUser } from "../controllers/AuthController.js"

const router = express.Router()

// 🔐 Register Route
router.post("/register", registerUser)

// 🔑 Login Route
router.post("/login", loginUser)

// 🔍 Get User Profile (Protected Route)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const Model = req.user.role === "admin" ? Admin : Customer
    const user = await Model.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({ user })
  } catch (error) {
    console.error("Profile Error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// 🔒 Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" })
    }
    req.user = user
    next()
  })
}

export default router
