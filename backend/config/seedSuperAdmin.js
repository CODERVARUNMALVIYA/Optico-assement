import User from '../models/User.js';
import connectDB from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await connectDB();

    const existingSuperAdmin = await User.findOne({ role: 'SuperAdmin' });

    if (existingSuperAdmin) {
     
      process.exit(0);
    }

    const superAdmin = await User.create({
      fullName: 'Super Administrator',
      mobile: '9999999999',
      role: 'SuperAdmin',
      designation: 'System Administrator',
      email: 'superadmin@optico.com',
      address: 'Head Office',
      password: 'Super@123'
    });

    
    process.exit(0);
  } catch (error) {
    console.error('Error creating SuperAdmin:', error.message);
    process.exit(1);
  }
};

seedSuperAdmin();
