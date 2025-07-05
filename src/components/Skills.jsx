import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, 
  Database, 
  Settings, 
  Layers, 
  Globe, 
  Zap,
  Star,
  TrendingUp
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Skills = () => {
  const { personalInfo } = useData();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [animatedSkills, setAnimatedSkills] = useState([]);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedSkills(personalInfo.skills);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView, personalInfo.skills]);

  const categoryIcons = {
    'Frontend': { icon: Code, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    'Backend': { icon: Database, color: 'text-green-500', bg: 'bg-green-500/10' },
    'Database': { icon: Database, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    'Tools': { icon: Settings, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    'Deployment': { icon: Globe, color: 'text-pink-500', bg: 'bg-pink-500/10' },
    'Programming': { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
  };

  const groupedSkills = personalInfo.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const getSkillIcon = (skill) => {
    const iconMap = {
      'React': '⚛️',
      'JavaScript': '🟨',
      'Node.js': '🟢',
      'Express.js': '⚡',
      'MongoDB': '🍃',
      'Tailwind CSS': '🎨',
      'HTML5': '🔥',
      'CSS3': '💎',
      'Firebase': '🔥',
      'Git': '📚',
      'Postman': '📮',
      'Vercel': '▲',
      'Netlify': '🌐',
      'VS Code': '💻'
    };
    return iconMap[skill] || '🔧';
  };

  const SkillBar = ({ skill, index }) => {
    const [currentLevel, setCurrentLevel] = useState(0);

    useEffect(() => {
      if (inView) {
        const timer = setTimeout(() => {
          const interval = setInterval(() => {
            setCurrentLevel(prev => {
              if (prev >= skill.level) {
                clearInterval(interval);
                return skill.level;
              }
              return prev + 1;
            });
          }, 20);
          return () => clearInterval(interval);
        }, index * 100);
        return () => clearTimeout(timer);
      }
    }, [inView, skill.level, index]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getSkillIcon(skill.name)}</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {skill.name}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {currentLevel}%
            </span>
            {skill.level >= 85 && (
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>
        </div>
        
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 progress-bar bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${currentLevel}%` }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {Object.entries(groupedSkills).map(([category, skills], index) => {
            const categoryData = categoryIcons[category] || categoryIcons['Programming'];
            return (
              <div
                key={category}
                className={`glass-card p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300 ${categoryData.bg}`}
              >
                <categoryData.icon className={`w-8 h-8 ${categoryData.color} mx-auto mb-3`} />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {category}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {skills.length} skills
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Detailed Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {Object.entries(groupedSkills).map(([category, skills]) => {
            const categoryData = categoryIcons[category] || categoryIcons['Programming'];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-10 h-10 ${categoryData.bg} rounded-lg flex items-center justify-center`}>
                    <categoryData.icon className={`w-5 h-5 ${categoryData.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Skill Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalInfo.skills
              .filter(skill => skill.level >= 80)
              .slice(0, 4)
              .map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="glass-card p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300">
                    <div className="text-4xl mb-4">{getSkillIcon(skill.name)}</div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {skill.name}
                    </h4>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">
                        {skill.level}% proficient
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.category}
                    </p>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
