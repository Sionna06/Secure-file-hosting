# Secure File Hosting Web Application - Project Summary

This document provides a comprehensive overview of the Secure File Hosting Web Application, including its features, architecture, and implementation details.

## Project Overview

The Secure File Hosting Web Application is a full-stack solution that allows users to register, log in, upload, download, and delete files with robust access control mechanisms. The application implements industry-standard security practices to ensure data protection and privacy.

## Key Features

### User Management
- User registration with email verification
- Secure authentication with JWT tokens
- Password hashing with bcrypt
- Duplicate email/username prevention

### File Management
- File upload with size and format restrictions (PDF, MP4, max 20MB)
- Public/private file access control
- File listing with metadata (size, upload date, privacy status)
- File deletion with ownership verification
- Secure file storage in dedicated directory

### Access Control
- Public files accessible to all users
- Private files accessible only to owners or via shareable links
- JWT-based authentication for protected routes
- Role-based access control

### Security Features
- Input validation and sanitization
- File type and size validation
- Secure password storage
- JWT token authentication
- Protection against unauthorized file access
- Shareable link mechanism for private files

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling tool
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing library
- **Multer** - Middleware for handling file uploads

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling and layout
- **JavaScript** - Client-side scripting
- **Fetch API** - Making HTTP requests

## Project Structure

```
secure-file-hosting/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Database models
│   ├── routes/          # API route definitions
│   ├── .env             # Environment variables
│   ├── package.json     # Backend dependencies
│   └── server.js        # Main server file
├── frontend/
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── pages/           # HTML pages
│   └── index.html       # Main HTML file
├── uploads/             # File storage directory
├── .gitignore           # Git ignore file
├── API_DOCUMENTATION.md # API endpoints documentation
├── DATABASE_SCHEMA.md   # Database schema documentation
├── README.md            # Setup and usage instructions
├── SECURITY.md          # Security features documentation
└── UI_MOCKUPS.md        # UI mockups
```

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate a user

### File Management
- `POST /api/upload` - Upload a file (authenticated)
- `GET /api/public-files` - Get all public files
- `GET /api/my-files` - Get authenticated user's files
- `GET /api/files/:id/download` - Download a file
- `DELETE /api/files/:id` - Delete a file (authenticated)

## Security Implementation

### Authentication Flow
1. User registers with email, username, and password
2. Password is hashed with bcrypt before storage
3. User logs in with email and password
4. Server validates credentials and generates JWT token
5. Token is stored in browser localStorage
6. All protected requests include token in Authorization header

### File Access Control
- Public files are accessible to everyone
- Private files require authentication or direct link access
- File ownership is verified before allowing deletion
- File paths are sanitized to prevent directory traversal attacks

### Shareable Link Mechanism
Private files can be shared via direct links without making them public. The download endpoint checks:
1. If the user is authenticated and owns the file
2. If the user has the direct link (no ownership check for direct access)

This allows users to share private files selectively without changing their privacy status.

## Setup and Deployment

### Prerequisites
- Node.js v14+
- MongoDB v4.4+
- Git

### Installation
1. Clone the repository
2. Install backend dependencies with `npm install`
3. Configure environment variables in `.env` file
4. Start MongoDB service
5. Run the server with `npm start`

### Usage Flow
1. Register a new account
2. Log in to the application
3. Upload files with desired privacy settings
4. View and download public files
5. Manage personal files in "My Files" section
6. Delete files as needed
7. Log out when finished

## Conclusion

The Secure File Hosting Web Application provides a robust, secure solution for file storage and sharing with comprehensive access controls. The implementation follows security best practices and provides an intuitive user interface for managing files.