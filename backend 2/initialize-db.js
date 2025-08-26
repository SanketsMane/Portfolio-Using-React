import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PortfolioData from './models/PortfolioData.js';
import Admin from './models/Admin.js';
import bcrypt from 'bcrypt';

// Load environment variables
dotenv.config();

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Initial portfolio data
const initialPortfolioData = {
  personalInfo: {
    name: 'Sanket Mane',
    email: 'contactsanket1@gmail.com',
    phone: '+91 7310013030',
    linkedin: 'https://linkedin.com/in/sanket-mane-b16a35238',
    github: 'https://github.com/SanketsMane',
    location: 'Karad, Maharashtra, India',
    title: 'Full Stack Developer',
    bio: 'Passionate Full Stack Developer with expertise in React, Node.js, and modern web technologies. I love creating innovative solutions and bringing ideas to life through code.',
    education: {
      degree: 'BTech. Computer Science & Engineering',
      university: 'Shivaji University',
      location: 'Kolhapur',
      duration: '2020-2024',
      grade: 'First Class'
    }
  },
  experience: [
    {
      id: 1,
      company: 'ACME Infovision Systems Pvt Ltd',
      position: 'Jr Full Stack Developer',
      duration: 'June 2024 - December 2024 (6 months)',
      description: 'Worked as a Junior Full Stack Developer, gaining hands-on experience in modern web development technologies. Contributed to various projects and enhanced my skills in both frontend and backend development.',
      technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express.js', 'HTML5', 'CSS3']
    },
    {
      id: 2,
      company: 'Formonex Solutions Pvt Ltd',
      position: 'Software Developer Trainee',
      duration: 'May 2024 - Present',
      description: 'Currently working as a Software Developer Trainee, focusing on learning and implementing modern software development practices. Actively participating in code reviews and collaborative development.',
      technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Git', 'Agile Methodology']
    }
  ],
  skills: [
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 85, category: 'Programming' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'MongoDB', level: 75, category: 'Database' },
    { name: 'Express.js', level: 80, category: 'Backend' },
    { name: 'HTML5', level: 95, category: 'Frontend' },
    { name: 'CSS3', level: 90, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
    { name: 'Git', level: 80, category: 'Tools' },
    { name: 'Python', level: 70, category: 'Programming' },
    { name: 'Java', level: 75, category: 'Programming' },
    { name: 'MySQL', level: 70, category: 'Database' },
    { name: 'Firebase', level: 65, category: 'Backend' },
    { name: 'Bootstrap', level: 80, category: 'Frontend' },
    { name: 'jQuery', level: 70, category: 'Frontend' }
  ],
  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React frontend and Node.js backend',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      github: 'https://github.com/SanketsMane/ecommerce-platform',
      live: 'https://ecommerce-demo.vercel.app',
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates',
      technologies: ['React', 'Firebase', 'Material-UI'],
      github: 'https://github.com/SanketsMane/task-manager',
      live: 'https://task-manager-demo.netlify.app',
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with location-based forecasts',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      github: 'https://github.com/SanketsMane/weather-dashboard',
      live: 'https://weather-dashboard-demo.vercel.app',
      image: '/api/placeholder/400/300'
    }
  ]
};

// Admin credentials
const adminCredentials = {
  email: 'contactsanket1@gmail.com',
  password: 'Sanket.patil@3030'
};

async function initializeDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await PortfolioData.deleteMany({});
    await Admin.deleteMany({});
    
    console.log('🧹 Cleared existing data');

    // Create portfolio data
    const portfolioData = new PortfolioData(initialPortfolioData);
    await portfolioData.save();
    console.log('✅ Portfolio data saved to MongoDB Atlas');

    // Create admin user
    const admin = new Admin({
      email: adminCredentials.email,
      password: adminCredentials.password // Let the model hash this automatically
    });
    await admin.save();
    console.log('✅ Admin user created');

    console.log('\n🎉 Database initialization complete!');
    console.log('📊 Data stored in MongoDB Atlas:');
    console.log(`   • Personal Info: ${initialPortfolioData.personalInfo.name}`);
    console.log(`   • Experience: ${initialPortfolioData.experience.length} entries`);
    console.log(`   • Skills: ${initialPortfolioData.skills.length} skills`);
    console.log(`   • Projects: ${initialPortfolioData.projects.length} projects`);
    console.log(`   • Admin User: ${adminCredentials.email}`);
    console.log('\n🔐 Admin Login Credentials:');
    console.log(`   Email: ${adminCredentials.email}`);
    console.log(`   Password: ${adminCredentials.password}`);

  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
  }
}

// Run the initialization
initializeDatabase();
