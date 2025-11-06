import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

router.post('/register', async (req, res) => {
  try {
    const { fullName, mobile, role, designation, email, address, password } = req.body;

    const userExists = await User.findOne({ mobile });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this mobile number' });
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
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile, isActive: true });

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
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
    } else {
      res.status(401).json({ success: false, message: 'Invalid mobile number or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});




export default router;
