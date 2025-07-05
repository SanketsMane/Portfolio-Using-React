import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
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
        description: 'Currently working as a Software Developer Trainee, focusing on learning and implementing modern software development practices. Actively participating in team projects and contributing to the development of innovative solutions.',
        technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Git', 'Tailwind CSS']
      }
    ],
    skills: [
      { name: 'React', level: 90, category: 'Frontend' },
      { name: 'JavaScript', level: 85, category: 'Programming' },
      { name: 'Node.js', level: 80, category: 'Backend' },
      { name: 'Express.js', level: 80, category: 'Backend' },
      { name: 'MongoDB', level: 75, category: 'Database' },
      { name: 'Tailwind CSS', level: 85, category: 'Frontend' },
      { name: 'HTML5', level: 90, category: 'Frontend' },
      { name: 'CSS3', level: 85, category: 'Frontend' },
      { name: 'Firebase', level: 70, category: 'Backend' },
      { name: 'Git', level: 80, category: 'Tools' },
      { name: 'Postman', level: 75, category: 'Tools' },
      { name: 'Vercel', level: 80, category: 'Deployment' },
      { name: 'Netlify', level: 80, category: 'Deployment' },
      { name: 'VS Code', level: 90, category: 'Tools' }
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
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

  const downloadResume = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/resume/download`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Sanket_Mane_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError('Failed to download resume');
      console.error('Resume download error:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitContactForm = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);
      return response.data;
    } catch (error) {
      setError('Failed to submit form');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getGitHubStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/github/stats`);
      return response.data;
    } catch (error) {
      console.error('GitHub stats error:', error);
      return null;
    }
  };

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/github/projects`);
      
      if (response.data.success && response.data.data) {
        setProjects(response.data.data);
        
        // Show success notification
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast('success', `Successfully loaded ${response.data.data.length} projects from GitHub!`);
        }
        
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('GitHub projects error:', error);
      setError(error.message);
      
      // Show error notification
      if (typeof window !== 'undefined' && window.showToast) {
        window.showToast('error', 'Failed to fetch projects from GitHub. Using fallback data.');
      }
      
      // Return fallback projects if API fails
      const fallbackProjects = personalInfo.projects || [];
      setProjects(fallbackProjects);
      return fallbackProjects;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch portfolio data from database
  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get data from portfolio endpoint
      const response = await axios.get(`${API_BASE_URL}/portfolio`);
      
      if (response.data.success) {
        const data = response.data.data;
        setPersonalInfo(prev => ({
          ...prev,
          ...data.personalInfo,
          experience: data.experience || prev.experience,
          skills: data.skills || prev.skills,
          projects: data.projects || prev.projects
        }));
        return data;
      }
    } catch (error) {
      console.log('Using fallback data - portfolio endpoint not available');
      setError(null); // Don't show error for fallback
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    // Fetch GitHub projects first to prioritize them
    fetchGitHubProjects();
    // Then fetch portfolio data for other info
    fetchPortfolioData();
  }, []);

  return (
    <DataContext.Provider value={{
      personalInfo,
      projects,
      loading,
      error,
      downloadResume,
      submitContactForm,
      getGitHubStats,
      fetchGitHubProjects,
      setError
    }}>
      {children}
    </DataContext.Provider>
  );
};
