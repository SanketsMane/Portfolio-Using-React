#!/bin/bash

# GitHub Token Setup Script
# This script helps you set up your GitHub Personal Access Token

echo "🚀 GitHub Integration Setup"
echo "==========================="
echo ""

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "❌ Error: backend/.env file not found!"
    echo "Please make sure you're running this script from the project root directory."
    exit 1
fi

echo "📝 To set up GitHub integration, you need to:"
echo "1. Create a GitHub Personal Access Token"
echo "2. Update your backend/.env file"
echo ""

echo "📋 Steps to create a GitHub token:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token' → 'Generate new token (classic)'"
echo "3. Give it a name like 'Portfolio Website'"
echo "4. Select these scopes:"
echo "   - public_repo (to read your public repositories)"
echo "   - repo (if you want to include private repos)"
echo "5. Click 'Generate token'"
echo "6. Copy the token (you won't be able to see it again!)"
echo ""

read -p "📋 Have you created your GitHub token? (y/n): " token_created

if [ "$token_created" != "y" ]; then
    echo "Please create your GitHub token first, then run this script again."
    exit 1
fi

echo ""
read -p "🔑 Enter your GitHub token: " github_token

if [ -z "$github_token" ]; then
    echo "❌ Error: GitHub token cannot be empty!"
    exit 1
fi

echo ""
read -p "👤 Enter your GitHub username (default: SanketsMane): " github_username
github_username=${github_username:-SanketsMane}

echo ""
echo "📝 Updating backend/.env file..."

# Update the .env file
sed -i.bak "s/GITHUB_TOKEN=.*/GITHUB_TOKEN=$github_token/" backend/.env
sed -i.bak "s/GITHUB_USERNAME=.*/GITHUB_USERNAME=$github_username/" backend/.env

echo "✅ Successfully updated backend/.env file!"
echo ""
echo "🔄 Please restart your backend server to apply changes:"
echo "   cd backend && npm start"
echo ""
echo "🎉 GitHub integration is now set up!"
echo "   Visit your portfolio and click the refresh button in the Projects section."
echo ""
