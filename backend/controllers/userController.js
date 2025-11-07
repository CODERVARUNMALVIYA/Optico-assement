import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};


export const registerUser = async (req, res) => {
  try {
    const { fullName, mobile, role, designation, email, address, password } = req.body;

    const userExists = await User.findOne({ mobile });
    
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this mobile number' 
      });
    }

    const user = await User.create({
      fullName,
      mobile,
      role,
      designation,
      email,
      address,
      password
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          fullName: user.fullName,
          mobile: user.mobile,
          role: user.role,
          designation: user.designation,
          email: user.email,
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: messages.join(', ') 
      });
    }
    
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { mobile, password, role } = req.body;

    if (!mobile || !password || !role) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide mobile number, password, and role' 
      });
    }

    const user = await User.findOne({ mobile, role, isActive: true });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        message: 'Login successful',
        user: {
          _id: user._id,
          fullName: user.fullName,
          mobile: user.mobile,
          role: user.role,
          designation: user.designation,
          email: user.email
        },
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials or role mismatch' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


