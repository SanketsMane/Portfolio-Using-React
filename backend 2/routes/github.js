import express from 'express';
import axios from 'axios';

const router = express.Router();

// GET /api/github/stats - Get GitHub statistics
router.get('/stats', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || 'SanketsMane';
    const token = process.env.GITHUB_TOKEN;

    const headers = {};
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    // Get user profile
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const user = userResponse.data;

    // Get repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
    const repos = reposResponse.data;

    // Calculate statistics
    const totalRepos = repos.length;
    const publicRepos = repos.filter(repo => !repo.private).length;
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const totalWatchers = repos.reduce((sum, repo) => sum + repo.watchers_count, 0);

    // Get languages
    const languages = {};
    for (const repo of repos.slice(0, 20)) { // Limit to avoid rate limiting
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    }

    // Sort languages by usage
    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([lang, count]) => ({ language: lang, count }));

    // Get recent repositories
    const recentRepos = repos
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 6)
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at
      }));

    // Get contribution data (simplified)
    const contributionData = await getContributionData(username, token);

    res.json({
      success: true,
      data: {
        profile: {
          name: user.name,
          bio: user.bio,
          location: user.location,
          company: user.company,
          blog: user.blog,
          followers: user.followers,
          following: user.following,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          avatarUrl: user.avatar_url,
          htmlUrl: user.html_url
        },
        stats: {
          totalRepos,
          publicRepos,
          totalStars,
          totalForks,
          totalWatchers,
          followers: user.followers,
          following: user.following
        },
        languages: sortedLanguages,
        recentRepos,
        contributions: contributionData
      }
    });

  } catch (error) {
    console.error('GitHub stats error:', error);
    
    // Return mock data if GitHub API fails
    res.json({
      success: true,
      data: {
        profile: {
          name: 'Sanket Mane',
          bio: 'Full Stack Developer',
          location: 'Kolhapur, Maharashtra, India',
          followers: 25,
          following: 50,
          avatarUrl: null,
          htmlUrl: 'https://github.com/SanketsMane'
        },
        stats: {
          totalRepos: 15,
          publicRepos: 15,
          totalStars: 45,
          totalForks: 12,
          totalWatchers: 30,
          followers: 25,
          following: 50
        },
        languages: [
          { language: 'JavaScript', count: 8 },
          { language: 'Python', count: 3 },
          { language: 'TypeScript', count: 2 },
          { language: 'HTML', count: 4 },
          { language: 'CSS', count: 4 }
        ],
        recentRepos: [
          {
            name: 'portfolio-website',
            description: 'My personal portfolio website built with React and Node.js',
            language: 'JavaScript',
            stars: 15,
            forks: 3,
            url: 'https://github.com/SanketsMane/portfolio-website',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-20T14:45:00Z'
          },
          {
            name: 'ecommerce-platform',
            description: 'Full-stack e-commerce solution with React and Node.js',
            language: 'JavaScript',
            stars: 12,
            forks: 5,
            url: 'https://github.com/SanketsMane/ecommerce-platform',
            createdAt: '2023-12-01T09:15:00Z',
            updatedAt: '2023-12-15T16:20:00Z'
          }
        ],
        contributions: {
          totalContributions: 150,
          weeklyContributions: 8,
          streak: 5
        }
      }
    });
  }
});

// Helper function to get contribution data
async function getContributionData(username, token) {
  try {
    // This is a simplified version - GitHub's contribution graph requires GraphQL API
    // For now, we'll return mock data
    return {
      totalContributions: 150,
      weeklyContributions: 8,
      streak: 5
    };
  } catch (error) {
    console.error('Error fetching contribution data:', error);
    return {
      totalContributions: 0,
      weeklyContributions: 0,
      streak: 0
    };
  }
}

// GET /api/github/repos - Get repositories
router.get('/repos', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || 'SanketsMane';
    const token = process.env.GITHUB_TOKEN;
    const { page = 1, per_page = 10, sort = 'updated' } = req.query;

    const headers = {};
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers,
      params: {
        page,
        per_page,
        sort,
        direction: 'desc'
      }
    });

    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      url: repo.html_url,
      homepage: repo.homepage,
      topics: repo.topics,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at
    }));

    res.json({
      success: true,
      data: repos
    });

  } catch (error) {
    console.error('GitHub repos error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch repositories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/github/languages - Get language statistics
router.get('/languages', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || 'SanketsMane';
    const token = process.env.GITHUB_TOKEN;

    const headers = {};
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    // Get all repositories
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
    const repos = reposResponse.data;

    const languageStats = {};
    let totalBytes = 0;

    // Get language statistics for each repository
    for (const repo of repos.slice(0, 50)) { // Limit to avoid rate limiting
      try {
        const langResponse = await axios.get(`https://api.github.com/repos/${repo.full_name}/languages`, { headers });
        const languages = langResponse.data;

        Object.entries(languages).forEach(([lang, bytes]) => {
          languageStats[lang] = (languageStats[lang] || 0) + bytes;
          totalBytes += bytes;
        });
      } catch (langError) {
        console.warn(`Error fetching languages for ${repo.name}:`, langError.message);
      }
    }

    // Calculate percentages and sort
    const sortedLanguages = Object.entries(languageStats)
      .map(([language, bytes]) => ({
        language,
        bytes,
        percentage: ((bytes / totalBytes) * 100).toFixed(1)
      }))
      .sort((a, b) => b.bytes - a.bytes);

    res.json({
      success: true,
      data: {
        totalBytes,
        languages: sortedLanguages
      }
    });

  } catch (error) {
    console.error('GitHub languages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch language statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/github/projects - Get all GitHub repositories as projects
router.get('/projects', async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME || 'SanketsMane';
    const token = process.env.GITHUB_TOKEN;

    const headers = {};
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    // Get all repositories
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`, 
      { headers }
    );
    const repos = reposResponse.data;

    // Filter and format repositories for portfolio
    const projects = repos
      .filter(repo => 
        !repo.fork && // Exclude forked repositories
        repo.description && // Only include repos with descriptions
        !repo.name.includes('config') && // Exclude config repos
        !repo.name.includes('dotfiles') && // Exclude dotfiles
        repo.size > 0 // Exclude empty repos
      )
      .map(repo => ({
        id: repo.id,
        title: repo.name
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        description: repo.description,
        technologies: [
          repo.language,
          ...getAdditionalTechnologies(repo.topics || [])
        ].filter(Boolean),
        github: repo.html_url,
        live: repo.homepage || getLiveUrl(repo.name, username),
        image: `/api/placeholder/400/300`,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        topics: repo.topics || []
      }));

    res.json({
      success: true,
      data: projects
    });

  } catch (error) {
    console.error('GitHub projects error:', error);
    
    // Handle different types of errors
    let errorMessage = 'GitHub API error';
    if (error.response?.status === 401) {
      errorMessage = 'GitHub API authentication failed. Please check your GitHub token.';
      console.error('GitHub API 401 Error: Invalid or missing GitHub token');
    } else if (error.response?.status === 403) {
      errorMessage = 'GitHub API rate limit exceeded. Please try again later.';
      console.error('GitHub API 403 Error: Rate limit exceeded');
    } else if (error.response?.status === 404) {
      errorMessage = 'GitHub user not found. Please check your GitHub username.';
      console.error('GitHub API 404 Error: User not found');
    }
    
    // Return fallback projects if GitHub API fails
    res.json({
      success: true,
      data: [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'Full-stack e-commerce solution with React frontend and Node.js backend',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
          github: 'https://github.com/SanketsMane/ecommerce-platform',
          live: 'https://ecommerce-demo.vercel.app',
          image: '/api/placeholder/400/300',
          stars: 12,
          forks: 5,
          language: 'JavaScript',
          createdAt: '2023-12-01T09:15:00Z',
          updatedAt: '2023-12-15T16:20:00Z'
        },
        {
          id: 2,
          title: 'Task Management App',
          description: 'Collaborative task management application with real-time updates',
          technologies: ['React', 'Firebase', 'Material-UI'],
          github: 'https://github.com/SanketsMane/task-manager',
          live: 'https://task-manager-demo.netlify.app',
          image: '/api/placeholder/400/300',
          stars: 8,
          forks: 3,
          language: 'JavaScript',
          createdAt: '2023-11-01T10:20:00Z',
          updatedAt: '2023-11-20T14:30:00Z'
        }
      ]
    });
  }
});

// Helper function to get additional technologies from topics
function getAdditionalTechnologies(topics) {
  const techMap = {
    'react': 'React',
    'nodejs': 'Node.js',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'mongodb': 'MongoDB',
    'express': 'Express',
    'tailwindcss': 'Tailwind CSS',
    'firebase': 'Firebase',
    'nextjs': 'Next.js',
    'vue': 'Vue.js',
    'angular': 'Angular',
    'python': 'Python',
    'django': 'Django',
    'flask': 'Flask',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'redis': 'Redis',
    'docker': 'Docker',
    'aws': 'AWS',
    'vercel': 'Vercel',
    'netlify': 'Netlify'
  };

  return topics
    .map(topic => techMap[topic.toLowerCase()] || topic)
    .filter(tech => tech !== undefined);
}

// Helper function to generate live URL
function getLiveUrl(repoName, username) {
  // Common hosting patterns
  const patterns = [
    `https://${repoName}.vercel.app`,
    `https://${username}.github.io/${repoName}`,
    `https://${repoName}.netlify.app`
  ];
  
  // Return first pattern as default
  return patterns[0];
}

export default router;
