import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/User.js';

import vehicleRoutes from './routes/vehicleRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const createSuperAdminIfNotExists = async () => {
  try {
    const existingSuperAdmin = await User.findOne({ role: 'SuperAdmin' });
    
    if (!existingSuperAdmin) {
      await User.create({
        fullName: 'Super Administrator',
        mobile: '9999999999',
        role: 'SuperAdmin',
        designation: 'System Administrator',
        email: 'superadmin@optico.com',
        address: 'Head Office',
        password: 'Super@123'
      });
      console.log(' SuperAdmin auto-created successfully!');
      console.log('📱 Mobile: 9999999999 | 🔑 Password: Super@123');
    } else {
      console.log('SuperAdmin already exists');
    }
  } catch (error) {
    console.error('SuperAdmin creation error:', error.message);
  }
};

setTimeout(createSuperAdminIfNotExists, 2000);

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Optico Backend API is running' });
});

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong!' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
