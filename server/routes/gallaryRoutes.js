const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { protect } = require('../middlewares/auth');
const {
  getAllImages,
  getImageById,
  uploadImage,
  updateImage,
  deleteImage,
  getGalleryStats
} = require('../controllers/gallaryController');

// Public routes
router.get('/', getAllImages);
router.get('/image/:id', getImageById);

router.use(protect); 

router.post('/', upload.single('image'), uploadImage);
router.put('/:id', updateImage);
router.delete('/:id', deleteImage);
router.get('/stats', getGalleryStats);

module.exports = router;