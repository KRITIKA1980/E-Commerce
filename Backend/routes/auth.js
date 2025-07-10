// import express from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import Admin from '../models/Admin.js';
// import Customer from '../models/Customer.js';

// const router = express.Router();

// // 🔐 Register Route
// router.post('/register', async (req, res) => {
//   const { name, email, password, role = 'customer' } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'Please fill all fields' });
//   }

//   try {
//     const Model = role === 'admin' ? Admin : Customer;

//     const existing = await Model.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new Model({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: `${role} registered successfully` });
//   } catch (error) {
//     console.error('Register Error:', error.message);
//     res.status(500).json({ error: 'Server error during registration' });
//   }
// });

// // 🔑 Login Route
// router.post('/login', async (req, res) => {
//   const { email, password, role = 'customer' } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: 'Please fill all fields' });
//   }

//   try {
//     const Model = role === 'admin' ? Admin : Customer;

//     const user = await Model.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     const token = jwt.sign(
//       { id: user._id, role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     const { password: _, ...userData } = user._doc;

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: { ...userData, role }
//     });
//   } catch (error) {
//     console.error('Login Error:', error.message);
//     res.status(500).json({ error: 'Server error during login' });
//   }
// });

// export default router;

import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import Customer from "../models/Customer.js"

const router = express.Router()

// 🔐 Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, role = "customer" } = req.body

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" })
  }

  try {
    // Choose the correct model based on role
    const Model = role === "admin" ? Admin : Customer

    // Check if user already exists
    const existingUser = await Model.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const user = new Model({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    })

    await user.save()

    // Remove password from response
    const { password: _, ...userResponse } = user.toObject()

    res.status(201).json({
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
      user: userResponse,
    })
  } catch (error) {
    console.error("Register Error:", error)

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({ error: messages.join(", ") })
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" })
    }

    res.status(500).json({ error: "Server error during registration" })
  }
})

// 🔑 Login Route
router.post("/login", async (req, res) => {
  const { email, password, role = "customer" } = req.body

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" })
  }

  try {
    // Choose the correct model based on role
    const Model = role === "admin" ? Admin : Customer

    // Find user by email
    const user = await Model.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    // Remove password from response
    const { password: _, ...userData } = user.toObject()

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    })
  } catch (error) {
    console.error("Login Error:", error)
    res.status(500).json({ error: "Server error during login" })
  }
})

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
