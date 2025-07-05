# Portfolio Project

A modern, tech-themed portfolio website built with React, Node.js, and MongoDB.

## Features

### Frontend
- **Modern UI**: Glassmorphism and neumorphism design patterns
- **Responsive**: Mobile-first design, works on all devices
- **Animations**: Smooth Framer Motion animations
- **Theme Toggle**: Light, dark, and auto (system) themes
- **Interactive Sections**: Hero, About, Skills, Experience, Projects, Contact

### Backend
- **RESTful API**: Express.js server with MongoDB
- **Contact Form**: Email notifications with NodeMailer
- **Resume Management**: Upload and download functionality
- **GitHub Integration**: Live stats and repository data
- **Email Service**: Automated responses and notifications

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- NodeMailer
- Multer for file uploads
- JWT for authentication
- Rate limiting and security

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Gmail account for email service

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   Create `.env` in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=contactsanket1@gmail.com
   EMAIL_PASS=your-app-password
   JWT_SECRET=your-jwt-secret
   GITHUB_TOKEN=your-github-token
   GITHUB_USERNAME=your-github-username
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Start the development servers**
   
   Frontend:
   ```bash
   npm run dev
   ```
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── contexts/
│   │   ├── ThemeContext.jsx
│   │   └── DataContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── models/
│   │   ├── Contact.js
│   │   └── Resume.js
│   ├── routes/
│   │   ├── contact.js
│   │   ├── resume.js
│   │   └── github.js
│   ├── utils/
│   │   └── emailService.js
│   └── server.js
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/stats` - Get contact statistics
- `PUT /api/contact/:id/status` - Update contact status

### Resume
- `POST /api/resume/upload` - Upload resume
- `GET /api/resume/download` - Download active resume
- `GET /api/resume/info` - Get resume information
- `GET /api/resume/list` - Get all resumes (admin)
- `PUT /api/resume/:id/activate` - Activate resume
- `DELETE /api/resume/:id` - Delete resume

### GitHub
- `GET /api/github/stats` - Get GitHub statistics
- `GET /api/github/repos` - Get repositories
- `GET /api/github/languages` - Get language statistics

## Features Implemented

### ✅ Frontend Features
- [x] Modern glassmorphism/neumorphism UI
- [x] Responsive design (mobile, tablet, desktop)
- [x] Theme toggle (light/dark/auto)
- [x] Smooth scroll navigation
- [x] Framer Motion animations
- [x] Interactive hero section with typing animation
- [x] About section with timeline
- [x] Skills section with animated progress bars
- [x] Experience section with timeline
- [x] Projects section with filtering
- [x] Contact form with validation
- [x] Footer with social links
- [x] Loading states and error handling

### ✅ Backend Features
- [x] Express.js REST API
- [x] MongoDB integration
- [x] Contact form handling
- [x] Email notifications (NodeMailer)
- [x] Resume upload/download
- [x] GitHub API integration
- [x] Rate limiting and security
- [x] Input validation
- [x] Error handling
- [x] File upload (Multer)

### ✅ Security Features
- [x] Helmet for security headers
- [x] CORS configuration
- [x] Rate limiting
- [x] Input validation and sanitization
- [x] File type validation
- [x] Environment variable protection

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Backend (Railway/Heroku)
1. Create a new app on Railway or Heroku
2. Set environment variables
3. Deploy from GitHub repository

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update MONGODB_URI in environment variables
3. Configure network access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

- **Name**: Sanket Mane
- **Email**: contactsanket1@gmail.com
- **Phone**: +91 7310013030
- **LinkedIn**: https://linkedin.com/in/sanket-mane-b16a35238
- **GitHub**: https://github.com/SanketsMane

---

Built with ❤️ by Sanket Mane

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
