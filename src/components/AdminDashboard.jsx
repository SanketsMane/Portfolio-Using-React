import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Upload, 
  User, 
  Briefcase, 
  Code, 
  FolderOpen,
  LogOut,
  Settings,
  FileText,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const AdminDashboard = ({ isOpen, onClose }) => {
  const { logout, getPortfolioData, updatePortfolioData, uploadResume, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('personal');
  const [portfolioData, setPortfolioData] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadPortfolioData();
    }
  }, [isOpen]);

  const loadPortfolioData = async () => {
    try {
      const response = await getPortfolioData();
      setPortfolioData(response.data);
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      // Initialize with default data if not found
      setPortfolioData(getDefaultPortfolioData());
    }
  };

  const getDefaultPortfolioData = () => ({
    personalInfo: {
      name: 'Sanket Patil',
      email: 'contactsanket1@gmail.com',
      phone: '+91 7310013030',
      linkedin: 'https://linkedin.com/in/sanket-mane-b16a35238',
      github: 'https://github.com/SanketsMane',
      location: 'Kolhapur, Maharashtra, India',
      title: 'Full Stack Developer',
      bio: 'Passionate Full Stack Developer with expertise in React, Node.js, and modern web technologies.',
      education: {
        degree: 'B.Sc. Computer Science',
        university: 'Shivaji University',
        location: 'Kolhapur',
        duration: '2020-2023',
        grade: 'First Class'
      }
    },
    experience: [
      {
        id: 1,
        company: 'ACME Infovision Systems Pvt Ltd',
        position: 'Jr Full Stack Developer',
        duration: 'June 2024 - December 2024 (6 months)',
        description: 'Worked as a Junior Full Stack Developer, gaining hands-on experience in modern web development technologies.',
        technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express.js']
      },
      {
        id: 2,
        company: 'Formonex Solutions Pvt Ltd',
        position: 'Software Developer Trainee',
        duration: 'May 2024 - Present',
        description: 'Currently working as a Software Developer Trainee, focusing on learning and implementing modern software development practices.',
        technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Git']
      }
    ],
    skills: [
      { name: 'React', level: 90, category: 'Frontend' },
      { name: 'JavaScript', level: 85, category: 'Programming' },
      { name: 'Node.js', level: 80, category: 'Backend' },
      { name: 'MongoDB', level: 75, category: 'Database' }
    ],
    projects: [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React frontend and Node.js backend',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        github: 'https://github.com/SanketsMane/ecommerce-platform',
        live: 'https://ecommerce-demo.vercel.app',
        image: '/api/placeholder/400/300'
      }
    ]
  });

  const handleSave = async () => {
    try {
      await updatePortfolioData(portfolioData);
      setHasChanges(false);
      if (window.showToast) {
        window.showToast('success', 'Portfolio data saved successfully!');
      }
    } catch (error) {
      if (window.showToast) {
        window.showToast('error', 'Failed to save portfolio data');
      }
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;

    try {
      await uploadResume(resumeFile);
      setResumeFile(null);
      if (window.showToast) {
        window.showToast('success', 'Resume uploaded successfully!');
      }
    } catch (error) {
      if (window.showToast) {
        window.showToast('error', 'Failed to upload resume');
      }
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    if (window.showToast) {
      window.showToast('info', 'Logged out successfully');
    }
  };

  const updateData = (section, data) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: data
    }));
    setHasChanges(true);
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: '',
      technologies: []
    };
    updateData('experience', [...portfolioData.experience, newExperience]);
  };

  const addSkill = () => {
    const newSkill = {
      name: '',
      level: 50,
      category: 'Programming'
    };
    updateData('skills', [...portfolioData.skills, newSkill]);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      technologies: [],
      github: '',
      live: '',
      image: '/api/placeholder/400/300'
    };
    updateData('projects', [...portfolioData.projects, newProject]);
  };

  const removeItem = (section, index) => {
    const newData = [...portfolioData[section]];
    newData.splice(index, 1);
    updateData(section, newData);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'resume', label: 'Resume', icon: FileText }
  ];

  if (!portfolioData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-dark-800 w-full max-w-6xl ml-auto shadow-2xl flex flex-col h-full"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                </div>
                <div className="flex items-center space-x-4">
                  {hasChanges && (
                    <motion.button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </motion.button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'personal' && (
                <PersonalInfoTab 
                  data={portfolioData.personalInfo} 
                  onChange={(data) => updateData('personalInfo', data)} 
                />
              )}
              {activeTab === 'experience' && (
                <ExperienceTab 
                  data={portfolioData.experience} 
                  onChange={(data) => updateData('experience', data)}
                  onAdd={addExperience}
                  onRemove={(index) => removeItem('experience', index)}
                />
              )}
              {activeTab === 'skills' && (
                <SkillsTab 
                  data={portfolioData.skills} 
                  onChange={(data) => updateData('skills', data)}
                  onAdd={addSkill}
                  onRemove={(index) => removeItem('skills', index)}
                />
              )}
              {activeTab === 'projects' && (
                <ProjectsTab 
                  data={portfolioData.projects} 
                  onChange={(data) => updateData('projects', data)}
                  onAdd={addProject}
                  onRemove={(index) => removeItem('projects', index)}
                />
              )}
              {activeTab === 'resume' && (
                <ResumeTab 
                  file={resumeFile}
                  onFileChange={setResumeFile}
                  onUpload={handleResumeUpload}
                  loading={loading}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Personal Info Tab Component
const PersonalInfoTab = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      onChange({
        ...data,
        [parent]: {
          ...data[parent],
          [child]: value
        }
      });
    } else {
      onChange({
        ...data,
        [field]: value
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub
          </label>
          <input
            type="url"
            value={data.github}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={data.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Education Section */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Education</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Degree
            </label>
            <input
              type="text"
              value={data.education?.degree || ''}
              onChange={(e) => handleChange('education.degree', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              University
            </label>
            <input
              type="text"
              value={data.education?.university || ''}
              onChange={(e) => handleChange('education.university', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={data.education?.location || ''}
              onChange={(e) => handleChange('education.location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={data.education?.duration || ''}
              onChange={(e) => handleChange('education.duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Grade
            </label>
            <input
              type="text"
              value={data.education?.grade || ''}
              onChange={(e) => handleChange('education.grade', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Experience Tab Component
const ExperienceTab = ({ data, onChange, onAdd, onRemove }) => {
  const handleChange = (index, field, value) => {
    const newData = [...data];
    if (field === 'technologies') {
      newData[index][field] = value.split(',').map(tech => tech.trim());
    } else {
      newData[index][field] = value;
    }
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Experience</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Experience</span>
        </button>
      </div>

      {data.map((exp, index) => (
        <div key={exp.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Experience {index + 1}
            </h4>
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => handleChange(index, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleChange(index, 'duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={exp.technologies.join(', ')}
                onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skills Tab Component
const SkillsTab = ({ data, onChange, onAdd, onRemove }) => {
  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = field === 'level' ? parseInt(value) : value;
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((skill, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Skill {index + 1}
              </h4>
              <button
                onClick={() => onRemove(index)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Level ({skill.level}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => handleChange(index, 'level', e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={skill.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Programming">Programming</option>
                  <option value="Tools">Tools</option>
                  <option value="Deployment">Deployment</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Projects Tab Component
const ProjectsTab = ({ data, onChange, onAdd, onRemove }) => {
  const handleChange = (index, field, value) => {
    const newData = [...data];
    if (field === 'technologies') {
      newData[index][field] = value.split(',').map(tech => tech.trim());
    } else {
      newData[index][field] = value;
    }
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h3>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      {data.map((project, index) => (
        <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Project {index + 1}
            </h4>
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={project.github}
                onChange={(e) => handleChange(index, 'github', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live URL
              </label>
              <input
                type="url"
                value={project.live}
                onChange={(e) => handleChange(index, 'live', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={project.image}
                onChange={(e) => handleChange(index, 'image', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Resume Tab Component
const ResumeTab = ({ file, onFileChange, onUpload, loading }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      onFileChange(selectedFile);
    } else {
      alert('Please select a PDF file');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Resume Management</h3>
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Upload Resume
        </h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Select a PDF file to upload as your resume
        </p>
        
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />
        
        <label
          htmlFor="resume-upload"
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer transition-colors"
        >
          <Upload className="w-5 h-5 mr-2" />
          Choose File
        </label>
        
        {file && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Selected: {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            
            <button
              onClick={onUpload}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
