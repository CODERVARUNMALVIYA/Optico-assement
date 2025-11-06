import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  passNumber: {
    type: String,
    required: [true, 'Pass number is required'],
    unique: true,
    trim: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Vehicle type is required'],
    enum: ['car', 'bike', 'scooter', 'van'],
  },
  rcDlNumber: {
    type: String,
    required: [true, 'RC/DL number is required'],
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  flatNumber: {
    type: String,
    required: [true, 'Flat number is required'],
    trim: true
  },
  ownerContact: {
    type: String,
    required: [true, 'Owner contact is required'],
    trim: true
  },
  alternateContact: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
    trim: true
  },
  flatOwnerName: {
    type: String,
    required: [true, 'Flat owner name is required'],
    trim: true
  },
  flatOwnerContact: {
    type: String,
    trim: true
  },
  validTill: {
    type: Date,
    required: [true, 'Valid till date is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
