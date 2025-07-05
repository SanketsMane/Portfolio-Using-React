import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Code, 
  Users, 
  Award,
  ArrowRight
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Experience = () => {
  const { personalInfo } = useData();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const ExperienceCard = ({ experience, index }) => {
    const isEven = index % 2 === 0;
    
    return (
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12`}
      >
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 transform -translate-x-1/2 hidden md:block"></div>
        
        {/* Timeline Dot */}
        <div className="absolute left-1/2 top-8 w-4 h-4 bg-primary-500 rounded-full transform -translate-x-1/2 z-10 hidden md:block">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-75"></div>
        </div>
        
        {/* Experience Card */}
        <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
          <div className="glass-card p-6 rounded-xl group hover:shadow-xl transition-all duration-300">
            {/* Company Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {experience.company}
                  </h3>
                  <p className="text-primary-500 font-medium">
                    {experience.position}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{experience.duration}</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {experience.description}
            </p>
            
            {/* Technologies */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Technologies Used:
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-green-500" />
                  <span>Key Contributor</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Team Collaboration</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Code className="w-4 h-4 text-purple-500" />
                  <span>Problem Solving</span>
                </div>
              </div>
            </div>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        {/* Empty Space for Timeline */}
        <div className="hidden md:block w-2/12"></div>
      </motion.div>
    );
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional journey and the valuable experiences that shaped my career.
          </p>
        </motion.div>

        {/* Experience Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              2
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Professional Roles
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              11+
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Months of Experience
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              15+
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Projects Contributed
            </p>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {personalInfo.experience.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready for New Challenges
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              I'm always looking for opportunities to grow and contribute to meaningful projects. 
              Let's connect and discuss how I can help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 glass hover:bg-white/20 dark:hover:bg-white/10 rounded-lg font-medium transition-all duration-300"
              >
                <span>View LinkedIn</span>
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
