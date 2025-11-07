import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
    unique: true,
    uppercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Format: MP 04 ZH 7691 or MP04ZH7691 (with or without spaces)
        return /^[A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{4}$/i.test(v);
      },
      message: props => `${props.value} is not a valid vehicle number! Format: MP 04 ZH 7691`
    }
  },
  passNumber: {
    type: String,
    required: [true, 'Pass number is required'],
    unique: true,
    uppercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Z]{1,2}-?[A-Z0-9]{4,10}$/i.test(v);
      },
      message: props => `${props.value} is not a valid pass number! Format: T-25FD0001 or O-S45D001`
    }
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
