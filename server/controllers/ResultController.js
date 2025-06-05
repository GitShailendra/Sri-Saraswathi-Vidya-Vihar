const Result = require("../models/ResultModel");
const { body, validationResult } = require("express-validator");
const sharp = require("sharp");
const axios = require("axios");

const resultValidation = [
  body("year")
    .notEmpty()
    .withMessage("Year is required")
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage("Year must be between 4 and 10 characters"),
  body("numberOfTopPerformers")
    .notEmpty()
    .withMessage("Number of top performers is required")
    .isInt({ min: 1, max: 10 })
    .withMessage("Number of top performers must be between 1 and 10"),
];

// Get all results (public endpoint)
const getResults = async (req, res) => {
  try {
    const { limit = 10, page = 1, year } = req.query;

    const query = { isActive: true };
    if (year) {
      query.year = new RegExp(year, "i");
    }

    const results = await Result.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    console.log("Results fetched:", results);
    // Convert image buffers to base64 for frontend
    const resultsWithImages = results.map((result) => ({
      ...result.toObject(),
      studentImageData: result.studentImageData
        ? `data:image/jpeg;base64,${result.studentImageData.toString("base64")}`
        : null,
    }));

    res.json({
      success: true,
      data: resultsWithImages,
      count: resultsWithImages.length,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch results",
    });
  }
};

// Get results for admin with pagination
const getResultsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", year = "" } = req.query;

    const query = {};

    // Search in year field
    if (search) {
      query.year = new RegExp(search, "i");
    }

    if (year) {
      query.year = year;
    }

    const totalResults = await Result.countDocuments(query);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    const results = await Result.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    // Convert image buffers to base64
    const resultsWithImages = results.map((result) => ({
      ...result.toObject(),
      studentImageData: result.studentImageData
        ? `data:image/jpeg;base64,${result.studentImageData.toString("base64")}`
        : null,
    }));

    res.json({
      success: true,
      data: resultsWithImages,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalResults,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching admin results:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch results",
    });
  }
};

// Get statistics
const getStats = async (req, res) => {
  try {
    const overview = await Result.aggregate([
      {
        $group: {
          _id: null,
          totalResults: { $sum: 1 },
          activeResults: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
          inactiveResults: {
            $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] },
          },
        },
      },
    ]);

    const yearStats = await Result.aggregate([
      {
        $group: {
          _id: "$year",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        overview: overview[0] || {
          totalResults: 0,
          activeResults: 0,
          inactiveResults: 0,
        },
        yearStats,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};

// Create new result
const createResult = async (req, res) => {
  try {
    console.log("helklo");
    const { year, numberOfTopPerformers } = req.body;
    const files = req.files; // Multiple files now
    console.log("Files received:", files);
    console.log("Body received:", req.body);
    const studentsFromBody = req.body.students || [];
    const students = studentsFromBody
      .slice(0, parseInt(numberOfTopPerformers))
      .map((s, index) => ({
        name: s.name,
        marks: s.marks,
        rank: index + 1,
      }));

    if (students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one student is required",
      });
    }
    console.log("Students processed:", students);
    // Process student images
    const studentImages = [];
    if (files && files.studentImages) {
      const imageFiles = Array.isArray(files.studentImages)
        ? files.studentImages
        : [files.studentImages];

      for (let i = 0; i < imageFiles.length && i < students.length; i++) {
        try {
          const imageBuffer = await sharp(imageFiles[i].buffer)
            .resize(400, 400, { fit: "cover" })
            .jpeg({ quality: 80 })
            .toBuffer();
          studentImages.push(imageBuffer);
        } catch (error) {
          console.error(`Error processing student image ${i}:`, error);
          studentImages.push(null);
        }
      }
    }

    // Process result poster
    let resultPosterBuffer = null;
    if (files && files.resultPoster) {
      try {
        resultPosterBuffer = await sharp(files.resultPoster[0].buffer)
          .resize(800, 600, { fit: "cover" })
          .jpeg({ quality: 90 })
          .toBuffer();
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Failed to process result poster image",
        });
      }
    }

    // Create results for each student
    const createdResults = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      console.log(`Creating result for student: student`,student);
      const result = new Result({
        year,
        studentName: student.name,
        rank: student.rank,
        totalStudents: parseInt(numberOfTopPerformers),
        studentImageData: studentImages[i] || null,
        resultPosterData: resultPosterBuffer,
        uploadType: "file",
        createdBy: req.user.id,
        marks: student.marks,
      });

      await result.save();
      await result.populate("createdBy", "name email");
      createdResults.push(result);
    }

    // Convert images for response
    const resultsWithImages = createdResults.map((result) => ({
      ...result.toObject(),
      studentImageData: result.studentImageData
        ? `data:image/jpeg;base64,${result.studentImageData.toString("base64")}`
        : null,
      resultPosterData: result.resultPosterData
        ? `data:image/jpeg;base64,${result.resultPosterData.toString("base64")}`
        : null,
    }));

    res.status(201).json({
      success: true,
      message: "Results created successfully",
      data: resultsWithImages,
    });
  } catch (error) {
    console.error("Error creating result:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create result",
    });
  }
};

// Update result
const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, studentName, rank, totalStudents, imageUrl } = req.body;
    const file = req.file;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    if (parseInt(rank) > parseInt(totalStudents)) {
      return res.status(400).json({
        success: false,
        message: "Rank cannot be greater than total students",
      });
    }
    const result = await Result.findById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    result.year = year;
    result.studentName = studentName;
    result.rank = rank;
    result.totalStudents = totalStudents;
    let imageBuffer = null;
    let uploadType = null;

    // Handle image update
    if (file) {
      // Process uploaded file
      uploadType = "file";
      try {
        imageBuffer = await sharp(file.buffer)
          .resize(400, 400, { fit: "cover" })
          .jpeg({ quality: 80 })
          .toBuffer();

        result.studentImageData = imageBuffer;
        result.imageUrl = undefined;
        result.uploadType = uploadType;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Failed to process image file",
        });
      }
    } else if (imageUrl && imageUrl !== result.imageUrl) {
      // Download and process new image from URL
      uploadType = "url";
      try {
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
          timeout: 10000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        imageBuffer = await sharp(response.data)
          .resize(400, 400, { fit: "cover" })
          .jpeg({ quality: 80 })
          .toBuffer();

        result.studentImageData = imageBuffer;
        result.imageUrl = imageUrl;
        result.uploadType = uploadType;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Failed to download or process image from URL",
        });
      }
    }

    await result.save();
    await result.populate("createdBy", "name email");

    const resultWithImage = {
      ...result.toObject(),
      studentImageData: result.studentImageData
        ? `data:image/jpeg;base64,${result.studentImageData.toString("base64")}`
        : null,
    };

    res.json({
      success: true,
      message: "Result updated successfully",
      data: resultWithImage,
    });
  } catch (error) {
    console.error("Error updating result:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update result",
    });
  }
};

// Delete result
const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    await Result.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting result:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete result",
    });
  }
};

// Toggle result status
const toggleResultStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    result.isActive = !result.isActive;
    await result.save();

    res.json({
      success: true,
      message: `Result ${
        result.isActive ? "activated" : "deactivated"
      } successfully`,
      data: { isActive: result.isActive },
    });
  } catch (error) {
    console.error("Error toggling result status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle result status",
    });
  }
};

// Get student image
const getStudentImage = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findById(id);
    if (!result || !result.studentImageData) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.set("Content-Type", "image/jpeg");
    res.send(result.studentImageData);
  } catch (error) {
    console.error("Error fetching student image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch image",
    });
  }
};

module.exports = {
  getResults,
  getResultsAdmin,
  getStats,
  createResult,
  updateResult,
  deleteResult,
  toggleResultStatus,
  getStudentImage,
  resultValidation,
};
