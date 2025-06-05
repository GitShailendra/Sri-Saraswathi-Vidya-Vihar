const express = require('express');
const router = express.Router();
const upload= require('../middlewares/multer');
const { protect } = require('../middlewares/auth');
const {
  getResults,
  getResultsAdmin,
  getStats,
  createResult,
  updateResult,
  deleteResult,
  toggleResultStatus,
  getStudentImage,
  resultValidation
} = require('../controllers/ResultController');

// Public routes
router.get('/', getResults);
router.get('/image/:id', getStudentImage);

// Admin routes (require authentication)
router.get('/admin', protect, getResultsAdmin);
router.get('/stats', getStats);
router.get('/admin/stats', protect, getStats);
router.post('/admin', protect, upload.fields([
  { name: 'studentImages', maxCount: 10 },
  { name: 'resultPoster', maxCount: 1 }
]), createResult);
router.put('/admin/:id', protect, upload.fields([
  { name: 'studentImages', maxCount: 10 },
  { name: 'resultPoster', maxCount: 1 }
]), resultValidation, updateResult);
router.delete('/admin/:id', protect, deleteResult);
router.patch('/admin/:id/toggle-status', protect, toggleResultStatus);

module.exports = router;