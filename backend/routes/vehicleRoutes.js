import express from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  searchVehicles
} from '../controllers/vehicleController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/search', protect, searchVehicles);
router.get('/', protect, getAllVehicles);
router.get('/:id', protect, getVehicleById);

router.post('/', protect, authorize('Admin', 'SuperAdmin'), createVehicle);
router.put('/:id', protect, authorize('Admin', 'SuperAdmin'), updateVehicle);

router.delete('/:id', protect, authorize('SuperAdmin'), deleteVehicle);

export default router;

