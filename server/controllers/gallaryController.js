const Gallery = require('../models/gallaryModal');
const axios = require('axios');
const sharp = require('sharp'); 
const downloadImageFromUrl = async (url) => {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const buffer = Buffer.from(response.data);
    const contentType = response.headers['content-type'];
    
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('URL does not point to a valid image');
    }

    return {
      buffer,
      contentType,
      size: buffer.length
    };
  } catch (error) {
    throw new Error(`Failed to download image: ${error.message}`);
  }
};

// Helper function to optimize image
const optimizeImage = async (buffer, contentType) => {
  try {
    let optimizedBuffer = buffer;
    
    if (contentType.includes('jpeg') || contentType.includes('jpg') || contentType.includes('png')) {
      optimizedBuffer = await sharp(buffer)
        .resize(1200, 800, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 85,
          progressive: true 
        })
        .toBuffer();
    }

    return optimizedBuffer;
  } catch (error) {
    console.warn('Image optimization failed, using original:', error.message);
    return buffer;
  }
};

// @desc    Get all gallery images WITH BUFFER DATA
// @route   GET /api/gallery
// @access  Public
const getAllImages = async (req, res) => {
  try {
    console.log('Fetching all gallery images with buffer data');
    const { category, limit = 50, page = 1 } = req.query;
    
    const filter = { isActive: true };
    if (category && category !== 'all') {
      filter.category = category;
    }

    const skip = (page - 1) * parseInt(limit);
    
    // Include image buffer data in the response
    const images = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('uploadedBy', 'email');

    console.log(`Fetched ${images.length} images for category: ${category || 'all'}`);
    const total = await Gallery.countDocuments(filter);

    // Transform data for frontend with buffer data
    const transformedImages = images.map(img => {
      let imageData = null;
      
      // Convert buffer to base64 for frontend consumption
      if (img.image && img.image.data) {
        const base64String = img.image.data.toString('base64');
        imageData = `data:${img.image.contentType};base64,${base64String}`;
      }

      return {
        id: img._id,
        title: img.title,
        category: img.category,
        imageData: imageData, // Base64 encoded image data
        imageUrl: img.imageUrl, // Original URL if exists
        uploadDate: img.createdAt.toISOString().split('T')[0],
        uploadType: img.uploadType,
        uploadedBy: img.uploadedBy?.email,
        contentType: img.image?.contentType,
        size: img.image?.size
      };
    });

    console.log(`Transformed ${transformedImages.length} images with buffer data`);
    
    res.json({
      success: true,
      data: transformedImages,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        hasNext: skip + parseInt(limit) < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get all images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery images',
      error: error.message
    });
  }
};

// @desc    Upload new image - UPDATED RESPONSE WITH BUFFER
// @route   POST /api/gallery
// @access  Private (Admin only)
const uploadImage = async (req, res) => {
  try {
    const { title, category, imageUrl } = req.body;
    const file = req.file;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    if (!file && !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Either file upload or image URL is required'
      });
    }

    if (file && imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either file or URL, not both'
      });
    }

    let imageData = null;
    let uploadType = '';

    // Handle file upload
    if (file) {
      const optimizedBuffer = await optimizeImage(file.buffer, file.mimetype);
      
      imageData = {
        data: optimizedBuffer,
        contentType: file.mimetype,
        size: optimizedBuffer.length
      };
      uploadType = 'file';
    }

    // Handle URL upload
    if (imageUrl) {
      try {
        const downloadedImage = await downloadImageFromUrl(imageUrl);
        const optimizedBuffer = await optimizeImage(downloadedImage.buffer, downloadedImage.contentType);
        
        imageData = {
          data: optimizedBuffer,
          contentType: downloadedImage.contentType,
          size: optimizedBuffer.length
        };
        uploadType = 'url';
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
    }

    // Create gallery item
    const galleryItem = new Gallery({
      title: title.trim(),
      category: category || 'campus',
      image: imageData,
      imageUrl: uploadType === 'url' ? imageUrl : null,
      uploadType,
      uploadedBy: req.user.id
    });

    await galleryItem.save();

    // Return response WITH BUFFER DATA for immediate frontend use
    const base64String = imageData.data.toString('base64');
    const responseImageData = `data:${imageData.contentType};base64,${base64String}`;

    const response = {
      id: galleryItem._id,
      title: galleryItem.title,
      category: galleryItem.category,
      imageData: responseImageData, // Base64 encoded image
      imageUrl: galleryItem.imageUrl,
      uploadDate: galleryItem.createdAt.toISOString().split('T')[0],
      uploadType: galleryItem.uploadType,
      contentType: imageData.contentType,
      size: imageData.size
    };

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: response
    });

  } catch (error) {
    console.error('Upload image error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
};
// @desc    Get single image buffer
// @route   GET /api/gallery/image/:id
// @access  Public
const getImageById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    if (!image.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Image not available'
      });
    }

    // If it's a URL-based image, redirect
    if (image.uploadType === 'url' && image.imageUrl) {
      return res.redirect(image.imageUrl);
    }

    // Serve buffer image
    if (image.image && image.image.data) {
      res.set({
        'Content-Type': image.image.contentType,
        'Content-Length': image.image.size,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        'ETag': `"${image._id}"`
      });
      
      res.send(image.image.data);
    } else {
      res.status(404).json({
        success: false,
        message: 'Image data not found'
      });
    }
  } catch (error) {
    console.error('Get image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve image',
      error: error.message
    });
  }
};


const updateImage = async (req, res) => {
  try {
    const { title, category, isActive } = req.body;
    
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Update fields
    if (title) image.title = title.trim();
    if (category) image.category = category;
    if (typeof isActive === 'boolean') image.isActive = isActive;

    await image.save();

    const response = {
      id: image._id,
      title: image.title,
      category: image.category,
      imageUrl: `/api/gallery/image/${image._id}`,
      uploadDate: image.createdAt.toISOString().split('T')[0],
      uploadType: image.uploadType,
      isActive: image.isActive
    };

    res.json({
      success: true,
      message: 'Image updated successfully',
      data: response
    });

  } catch (error) {
    console.error('Update image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update image',
      error: error.message
    });
  }
};

// @desc    Delete image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin only)
const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message
    });
  }
};

// @desc    Get gallery statistics
// @route   GET /api/gallery/stats
// @access  Private (Admin only)
const getGalleryStats = async (req, res) => {
  try {
    const stats = await Gallery.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalSize: { $sum: '$image.size' }
        }
      }
    ]);

    const totalImages = await Gallery.countDocuments({ isActive: true });
    const totalSize = await Gallery.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, totalSize: { $sum: '$image.size' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalImages,
        totalSize: totalSize[0]?.totalSize || 0,
        categoryStats: stats,
        categories: [
          { id: 'campus', name: 'Campus' },
          { id: 'events', name: 'Events' },
          { id: 'sports', name: 'Sports' },
          { id: 'activities', name: 'Activities' }
        ]
      }
    });

  } catch (error) {
    console.error('Get gallery stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get gallery statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllImages,
  getImageById,
  uploadImage,
  updateImage,
  deleteImage,
  getGalleryStats
};