# GitHub Integration Setup

## Overview
Your portfolio now automatically fetches projects from your GitHub repositories! This feature will display your actual repositories as portfolio projects, and whenever you create new repositories, they'll automatically appear on your portfolio.

## Setup Steps

### 1. Create a GitHub Personal Access Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a descriptive name like "Portfolio Website"
4. Select these scopes:
   - `public_repo` (to read your public repositories)
   - `repo` (if you want to include private repos)
5. Click "Generate token"
6. **Important**: Copy the token immediately as you won't be able to see it again!

### 2. Update Your Backend Environment
1. Open `/backend/.env` file
2. Replace `your-github-token-here` with your actual token:
   ```
   GITHUB_TOKEN=ghp_your_actual_token_here
   GITHUB_USERNAME=SanketsMane
   ```

### 3. Restart Your Backend Server
1. Stop the current backend server (Ctrl+C)
2. Run `npm start` again in the backend directory

## Features

### Automatic Project Fetching
- Your portfolio will automatically fetch all your public repositories
- Projects are filtered to exclude:
  - Forked repositories
  - Repositories without descriptions
  - Config/dotfiles repositories
  - Empty repositories

### Project Information Displayed
- Repository name (formatted as title)
- Description
- Technologies used (based on primary language + topics)
- GitHub link
- Live demo link (auto-generated or from homepage field)
- Star count
- Fork count
- Last updated date

### Manual Refresh
- Click the refresh button (🔄) in the Projects section to manually update projects
- Projects are automatically fetched when the page loads

## Customization

### Repository Topics
Add topics to your GitHub repositories to improve technology detection:
- Go to your repository → Settings → Topics
- Add relevant topics like: `react`, `nodejs`, `mongodb`, `tailwindcss`, etc.

### Homepage URL
Set the homepage URL in your repository settings to provide live demo links:
- Go to your repository → Settings → General → Website
- Enter your deployed app URL

### Repository Description
Make sure your repositories have good descriptions as they're used as project descriptions in your portfolio.

## Troubleshooting

### No Projects Loading
1. Check if your GitHub token is valid
2. Verify your GitHub username is correct in the .env file
3. Check the browser console for any error messages
4. Ensure your backend server is running

### API Rate Limits
- Without a token: 60 requests per hour
- With a token: 5,000 requests per hour
- The app caches results to minimize API calls

## Fallback System
If the GitHub API fails or is unavailable, the portfolio will automatically fall back to showing the static projects defined in the code, ensuring your portfolio always works.

## Testing
You can test the GitHub integration by:
1. Creating a new repository on GitHub with a good description
2. Adding relevant topics
3. Clicking the refresh button on your portfolio
4. The new project should appear automatically!
