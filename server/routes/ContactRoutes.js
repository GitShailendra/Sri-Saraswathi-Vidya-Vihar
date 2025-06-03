const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContact,
  updateContactStatus,
  deleteContact,
  getContactStats
} = require('../controllers/ContactController');

const { protect } = require('../middlewares/auth');



router.post('/submit', submitContact);

// Admin routes (protected)
router.get('/', protect, getAllContacts);
router.get('/stats', protect, getContactStats);
router.get('/:id', protect, getContact);
router.put('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;