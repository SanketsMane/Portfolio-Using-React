# Quick GitHub Setup Guide

## The Issue
You're getting a 401 Unauthorized error because the GitHub API requires authentication to fetch repository data.

## Quick Solution

### Option 1: Set up GitHub Token (Recommended)

1. **Create a GitHub Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "Portfolio Website"
   - Select these scopes:
     - ✅ `public_repo` (to read your public repositories)
     - ✅ `repo` (if you want to include private repos)
   - Click "Generate token"
   - **Important**: Copy the token immediately!

2. **Update your backend/.env file:**
   ```bash
   # Open backend/.env and update these lines:
   GITHUB_TOKEN=ghp_your_actual_token_here
   GITHUB_USERNAME=SanketsMane
   ```

3. **Restart your backend server:**
   ```bash
   cd backend
   npm start
   ```

### Option 2: Use Without Token (Limited)

If you don't want to set up a token, the portfolio will automatically fall back to showing static project data. This is perfectly fine for development and testing.

## Testing

After setting up the token:
1. Visit your portfolio at http://localhost:5174
2. Navigate to the Projects section
3. Click the refresh button (🔄)
4. You should see your actual GitHub repositories!

## Benefits of Using GitHub Token

- ✅ Shows your real repositories
- ✅ Automatic project updates
- ✅ GitHub statistics (stars, forks)
- ✅ 5,000 API requests per hour (vs 60 without token)
- ✅ Professional portfolio showcase

## Troubleshooting

- **Still getting 401 errors?** Double-check that your token is correctly copied in the .env file
- **No projects showing?** Make sure your GitHub username is correct
- **Rate limit errors?** You might need to wait a bit or use a token for higher limits

Your portfolio will work perfectly with or without the GitHub integration! 🎉
