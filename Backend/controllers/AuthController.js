// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import Admin from '../models/Admin.js';
// import Customer from '../models/Customer.js';

// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export const registerUser = async (req, res) => {
//   const { name, email, password, confirmPassword, role } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     let userModel;
//     let userData;
//     if (role === 'admin') {
//       userModel = Admin;
//       userData = { name, email, password: hashedPassword, role };
//     } else {
//       userModel = Customer;
//       // Pass confirmPassword as required by the Customer model, but do not hash it
//       userData = { name, email, password: hashedPassword, confirmPassword, role: 'customer' };
//     }

//     const user = new userModel(userData);
//     await user.save();

//     // Remove sensitive fields from response
//     const userObj = user.toObject();
//     delete userObj.password;
//     delete userObj.confirmPassword;

//     res.status(201).json({ message: 'User registered successfully', user: userObj });
//   } catch (error) {
//     res.status(500).json({ message: 'Registration failed', error });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     let userModel = role === 'admin' ? Admin : Customer;

//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

//     res.status(200).json({ message: 'Login successful', token, user });
//   } catch (error) {
//     res.status(500).json({ message: 'Login failed', error });
//   }
// };

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Customer from '../models/Customer.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  try {
    // Validate confirmPassword before hashing
    if (role === 'customer' && password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userModel;
    let userData;
    if (role === 'admin') {
      userModel = Admin;
      userData = { name, email, password: hashedPassword, role };
    } else {
      userModel = Customer;
      // Only store necessary fields in the database
      userData = { name, email, password: hashedPassword, role: 'customer' };
    }

    const user = new userModel(userData);
    await user.save();

    // Remove sensitive fields from response
    const userObj = user.toObject();
    delete userObj.password;
    if (userObj.confirmPassword) delete userObj.confirmPassword;

    res.status(201).json({ 
      success: true,
      message: 'User registered successfully', 
      user: userObj 
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed', 
        errors 
      });
    }

    res.status(500).json({ 
      success: false,
      message: 'Registration failed', 
      error: error.message 
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    let userModel = role === 'admin' ? Admin : Customer;
    const user = await userModel.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Remove sensitive fields before sending user data
    const userObj = user.toObject();
    delete userObj.password;
    if (userObj.confirmPassword) delete userObj.confirmPassword;

    res.status(200).json({ 
      success: true,
      message: 'Login successful', 
      token, 
      user: userObj 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed', 
      error: error.message 
    });
  }
};