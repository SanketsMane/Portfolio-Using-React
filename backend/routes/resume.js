import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Resume from '../models/Resume.js';

const router = express.Router();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

// POST /api/resume/upload - Upload resume file
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { description, version, tags } = req.body;

    // Deactivate previous resumes
    await Resume.updateMany({ isActive: true }, { isActive: false });

    // Create new resume record
    const resume = new Resume({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      description,
      version: version || '1.0',
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        id: resume._id,
        filename: resume.filename,
        originalName: resume.originalName,
        size: resume.size,
        version: resume.version
      }
    });

  } catch (error) {
    console.error('Resume upload error:', error);
    
    // Clean up uploaded file if database save fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to upload resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/resume/download - Download active resume
router.get('/download', async (req, res) => {
  try {
    // Find the active resume
    const resume = await Resume.findOne({ isActive: true });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'No active resume found'
      });
    }

    // Check if file exists
    if (!fs.existsSync(resume.path)) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found'
      });
    }

    // Increment download count
    resume.downloadCount += 1;
    await resume.save();

    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename="${resume.originalName}"`);
    res.setHeader('Content-Type', resume.mimetype);

    // Stream the file
    const fileStream = fs.createReadStream(resume.path);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Resume download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/resume/info - Get resume info
router.get('/info', async (req, res) => {
  try {
    const resume = await Resume.findOne({ isActive: true })
      .select('-path'); // Exclude file path for security

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'No active resume found'
      });
    }

    res.json({
      success: true,
      data: {
        filename: resume.originalName,
        size: resume.size,
        version: resume.version,
        description: resume.description,
        downloadCount: resume.downloadCount,
        createdAt: resume.createdAt,
        tags: resume.tags
      }
    });

  } catch (error) {
    console.error('Resume info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get resume info',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/resume/list - Get all resumes (admin only)
router.get('/list', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const resumes = await Resume.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-path'); // Exclude file path for security

    const total = await Resume.countDocuments();

    res.json({
      success: true,
      data: resumes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Resume list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resumes',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/resume/:id/activate - Activate a specific resume
router.put('/:id/activate', async (req, res) => {
  try {
    const { id } = req.params;

    // Deactivate all resumes
    await Resume.updateMany({}, { isActive: false });

    // Activate the specified resume
    const resume = await Resume.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      message: 'Resume activated successfully',
      data: {
        id: resume._id,
        filename: resume.originalName,
        version: resume.version
      }
    });

  } catch (error) {
    console.error('Resume activation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to activate resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE /api/resume/:id - Delete a resume
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Don't allow deletion of active resume
    if (resume.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete active resume'
      });
    }

    // Delete file from filesystem
    if (fs.existsSync(resume.path)) {
      fs.unlinkSync(resume.path);
    }

    // Delete from database
    await Resume.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });

  } catch (error) {
    console.error('Resume deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
