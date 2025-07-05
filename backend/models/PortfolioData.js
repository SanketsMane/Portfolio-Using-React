import mongoose from 'mongoose';

const portfolioDataSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    education: {
      degree: { type: String, required: true },
      university: { type: String, required: true },
      location: { type: String, required: true },
      duration: { type: String, required: true },
      grade: { type: String, required: true }
    }
  },
  experience: [{
    id: { type: Number, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }]
  }],
  skills: [{
    name: { type: String, required: true },
    level: { type: Number, required: true },
    category: { type: String, required: true }
  }],
  projects: [{
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    github: { type: String, required: true },
    live: { type: String, required: true },
    image: { type: String, required: true }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('PortfolioData', portfolioDataSchema);
