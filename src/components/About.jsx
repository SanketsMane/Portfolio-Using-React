import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  GraduationCap, 
  Briefcase, 
  Code, 
  Trophy, 
  Heart, 
  Coffee,
  Music,
  BookOpen,
  MapPin,
  Calendar
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const About = () => {
  const { personalInfo } = useData();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const timelineItems = [
    {
      id: 1,
      year: '2020',
      title: 'Started B.Sc. Computer Science',
      subtitle: 'Shivaji University, Kolhapur',
      description: 'Began my journey in computer science, learning programming fundamentals and developing a passion for web development.',
      icon: GraduationCap,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      year: '2023',
      title: 'Graduated',
      subtitle: 'B.Sc. Computer Science',
      description: 'Completed my degree with First Class honors, ready to take on new challenges in the tech industry.',
      icon: Trophy,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 3,
      year: '2024',
      title: 'Started Professional Journey',
      subtitle: 'ACME Infovision Systems Pvt Ltd',
      description: 'Began working as a Jr Full Stack Developer (June 2024 - December 2024), gaining valuable industry experience in modern web development technologies.',
      icon: Briefcase,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 4,
      year: '2024-Present',
      title: 'Current Role',
      subtitle: 'Formonex Solutions Pvt Ltd',
      description: 'Currently working as a Software Developer Trainee since May 2024, focusing on learning advanced development practices and contributing to innovative projects.',
      icon: Code,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const interests = [
    { name: 'Web Development', icon: Code, color: 'text-blue-500' },
    { name: 'Open Source', icon: Heart, color: 'text-red-500' },
    { name: 'Coffee', icon: Coffee, color: 'text-yellow-600' },
    { name: 'Music', icon: Music, color: 'text-green-500' },
    { name: 'Learning', icon: BookOpen, color: 'text-purple-500' }
  ];

  const stats = [
    { label: 'Years of Experience', value: '1+', color: 'text-primary-500' },
    { label: 'Projects Completed', value: '20+', color: 'text-secondary-500' },
    { label: 'Technologies Mastered', value: '14+', color: 'text-accent-500' },
    { label: 'Coffee Cups', value: '∞', color: 'text-yellow-500' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Let me tell you a bit about myself and my journey in the world of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Education</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {personalInfo.education.degree}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {personalInfo.education.university}, {personalInfo.education.location} ({personalInfo.education.duration})
                    </p>
                    {personalInfo.education.grade && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Grade: {personalInfo.education.grade}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-secondary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Experience</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {personalInfo.experience.length} Professional Roles
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      11+ months in industry
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-white/50 dark:bg-white/5"
                  >
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Interests & Hobbies
              </h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full"
                  >
                    <interest.icon className={`w-5 h-5 ${interest.color}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              My Journey
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"></div>
              
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative flex items-start space-x-6 pb-8 last:pb-0"
                >
                  {/* Timeline Icon */}
                  <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1 glass-card p-6 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-semibold text-primary-500">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-secondary-500 font-medium mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
