import express from 'express';
import PortfolioData from '../models/PortfolioData.js';

const router = express.Router();

// GET /api/portfolio - Get portfolio data (public access)
router.get('/', async (req, res) => {
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
