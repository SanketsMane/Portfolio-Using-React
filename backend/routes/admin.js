import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import PortfolioData from '../models/PortfolioData.js';
import Resume from '../models/Resume.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `resume-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Middleware to verify admin token
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Access denied. Invalid admin.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// POST /api/admin/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Check if admin exists
    let admin = await Admin.findOne({ email: email.toLowerCase() });
    
    // If admin doesn't exist, create one with the fixed credentials
    if (!admin) {
      if (email.toLowerCase() === 'contactsanket1@gmail.com' && password === 'Sanket.patil@3030') {
        admin = new Admin({
          email: 'contactsanket1@gmail.com',
          password: 'Sanket.patil@3030'
        });
        await admin.save();
      } else {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// GET /api/admin/portfolio - Get portfolio data
router.get('/portfolio', verifyAdmin, async (req, res) => {
  try {
    const portfolioData = await PortfolioData.findOne({ isActive: true });
    
    if (!portfolioData) {
      return res.status(404).json({ 
        success: false, 
        message: 'Portfolio data not found' 
      });
    }

    res.json({
      success: true,
      data: portfolioData
    });
  } catch (error) {
    console.error('Get portfolio data error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// PUT /api/admin/portfolio - Update portfolio data
router.put('/portfolio', verifyAdmin, async (req, res) => {
  try {
    const { personalInfo, experience, skills, projects } = req.body;

    // Validate required fields
    if (!personalInfo || !experience || !skills || !projects) {
      return res.status(400).json({ 
        success: false, 
        message: 'All portfolio sections are required' 
      });
    }

    // Update or create portfolio data
    let portfolioData = await PortfolioData.findOne({ isActive: true });
    
    if (portfolioData) {
      // Update existing data
      portfolioData.personalInfo = personalInfo;
      portfolioData.experience = experience;
      portfolioData.skills = skills;
      portfolioData.projects = projects;
    } else {
      // Create new data
      portfolioData = new PortfolioData({
        personalInfo,
        experience,
        skills,
        projects
      });
    }

    await portfolioData.save();

    res.json({
      success: true,
      message: 'Portfolio data updated successfully',
      data: portfolioData
    });

  } catch (error) {
    console.error('Update portfolio data error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// POST /api/admin/upload-resume - Upload resume
router.post('/upload-resume', verifyAdmin, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Delete old resume if exists
    await Resume.deleteMany({});

    // Save new resume
    const resume = new Resume({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    await resume.save();

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resume: {
        filename: resume.filename,
        originalName: resume.originalName,
        size: resume.size,
        uploadDate: resume.uploadDate
      }
    });

  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// GET /api/admin/verify - Verify admin token
router.get('/verify', verifyAdmin, async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Token is valid',
      admin: {
        id: req.admin._id,
        email: req.admin.email,
        lastLogin: req.admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// GET /api/admin/portfolio/public - Get portfolio data (public access)
router.get('/portfolio/public', async (req, res) => {
  try {
    const portfolioData = await PortfolioData.findOne().sort({ createdAt: -1 });
    
    if (!portfolioData) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio data not found'
      });
    }

    res.json({
      success: true,
      data: portfolioData
    });

  } catch (error) {
    console.error('Portfolio fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio data'
    });
  }
});

export default router;
