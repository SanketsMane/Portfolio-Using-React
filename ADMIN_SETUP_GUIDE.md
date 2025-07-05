# Admin Panel Setup Guide

## 🎉 Admin Panel Successfully Implemented!

Your portfolio now has a fully functional admin panel with authentication, data management, and CV upload functionality.

## 🔐 Admin Credentials

- **Email**: `contactsanket1@gmail.com`
- **Password**: `Sanket.patil@3030`

## 🚀 Features Implemented

### 1. **Admin Authentication**
- Secure login with JWT tokens
- Password hashing with bcrypt
- Persistent login sessions
- Auto-logout on token expiration

### 2. **Admin Dashboard**
- **Personal Info Management**: Edit name, email, phone, bio, education, etc.
- **Experience Management**: Add, edit, delete work experience entries
- **Skills Management**: Add, edit, delete skills with level indicators
- **Projects Management**: Add, edit, delete projects with GitHub links
- **Resume Upload**: Upload PDF resumes to MongoDB with file validation

### 3. **Database Integration**
- **Admin Collection**: Stores admin credentials securely
- **PortfolioData Collection**: Stores all portfolio content
- **Resume Collection**: Stores uploaded CV files
- All data is automatically synced with the live website

### 4. **UI/UX Improvements**
- **Admin Button**: Shield icon in the navbar
- **Login Modal**: Beautiful glassmorphism login form
- **Dashboard**: Tabbed interface for easy navigation
- **Download CV Button**: Added top margin as requested
- **Toast Notifications**: Real-time feedback for all actions

## 🔧 How to Use

### **1. Access Admin Panel**
1. Visit your portfolio website
2. Click the **Shield icon** (🛡️) in the top navigation bar
3. Login with the credentials above

### **2. Manage Content**
- **Personal Info**: Update your bio, contact details, education
- **Experience**: Add new jobs, edit descriptions, update technologies
- **Skills**: Add new skills, adjust proficiency levels
- **Projects**: Add new projects, update GitHub links
- **Resume**: Upload a new PDF resume

### **3. Save Changes**
- Make your edits in any section
- Click **"Save Changes"** button when ready
- Changes are immediately reflected on your live website

### **4. Upload Resume**
1. Go to the **Resume** tab in admin dashboard
2. Click **"Choose File"** and select a PDF
3. Click **"Upload Resume"** to save to database
4. The new resume will be available for download on your website

## 🗄️ Database Collections

### **admins**
```javascript
{
  email: "contactsanket1@gmail.com",
  password: "hashed_password",
  lastLogin: "2024-01-01T00:00:00Z",
  isActive: true
}
```

### **portfoliodatas**
```javascript
{
  personalInfo: {
    name: "Sanket Patil",
    email: "contactsanket1@gmail.com",
    phone: "+91 7310013030",
    // ... more fields
  },
  experience: [...],
  skills: [...],
  projects: [...]
}
```

### **resumes**
```javascript
{
  filename: "resume-1234567890.pdf",
  originalName: "Sanket_Resume.pdf",
  path: "./uploads/resume-1234567890.pdf",
  size: 1024000,
  mimetype: "application/pdf"
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds for password security
- **File Validation**: Only PDF files allowed for resume upload
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Server-side validation for all inputs

## 🛠️ API Endpoints

### **Authentication**
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify JWT token

### **Data Management**
- `GET /api/admin/portfolio` - Get portfolio data
- `PUT /api/admin/portfolio` - Update portfolio data
- `POST /api/admin/upload-resume` - Upload resume file

## 🎨 UI Changes Made

1. **Admin Button**: Added shield icon to navbar
2. **Download CV Button**: Added `mt-8` class for top margin
3. **Login Modal**: Beautiful animated login form
4. **Dashboard**: Full-screen sliding dashboard
5. **Toast Notifications**: Real-time success/error messages

## 🚀 Next Steps

1. **Login to Admin Panel**: Use the credentials above
2. **Update Your Content**: Add your real projects, experience, and skills
3. **Upload Your Resume**: Replace the default resume with your actual CV
4. **Test Everything**: Make sure all changes reflect on the live website

## 🛡️ Admin Button States

- **Gray Shield**: Not logged in - click to login
- **Green Settings**: Logged in - click to open dashboard

## 💡 Tips

1. **Always save changes**: Click the "Save Changes" button after editing
2. **Test on live site**: Check that your changes appear correctly
3. **Backup your data**: Your data is stored in MongoDB
4. **Use good images**: Add proper project images for better presentation
5. **Keep descriptions clear**: Write engaging project and experience descriptions

Your portfolio now has enterprise-level admin functionality! 🎉
