import Vehicle from '../models/Vehicle.js';


export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      count: vehicles.length,
      data: vehicles 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle || !vehicle.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: vehicle 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


export const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    
    res.status(201).json({ 
      success: true, 
      message: 'Vehicle created successfully',
      data: vehicle 
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        success: false, 
        message: `${field} already exists` 
      });
    }
    
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


export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Vehicle updated successfully',
      data: vehicle 
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        success: false, 
        message: `${field} already exists` 
      });
    }
    
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


export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Vehicle deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


