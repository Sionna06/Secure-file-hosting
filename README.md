# Secure File Hosting Web Application

A full-stack secure web application where users can register, log in, upload, download, and delete files with access control.

## Features
- User registration and authentication with JWT
- File upload with size/format restrictions
- Public/private file access control
- Secure file storage and retrieval
- File deletion with ownership verification

## Project Structure
```
secure-file-hosting/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── css/
│   ├── js/
│   └── pages/
└── uploads/
```

## Tech Stack
- Backend: Node.js with Express
- Database: MongoDB
- Frontend: HTML, CSS, JavaScript
- Authentication: JWT

## Setup Instructions

### Prerequisites
1. Node.js (v14 or higher)
2. MongoDB (v4.4 or higher)
3. Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd secure-file-hosting
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `backend` directory with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/securefilehosting
   JWT_SECRET=your_jwt_secret_key_here
   ```
   
   Replace `your_jwt_secret_key_here` with a strong secret key.

4. **Start MongoDB:**
   Make sure MongoDB is running on your system. If you haven't installed MongoDB, you can download it from [mongodb.com](https://www.mongodb.com/try/download/community).

5. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

6. **Access the application:**
   Open your browser and navigate to `http://localhost:5000`

## Usage Guide

### Demo Flow
1. **Register** - Create a new account at `http://localhost:5000/pages/register.html`
2. **Login** - Log in at `http://localhost:5000/pages/login.html`
3. **Upload** - Upload files at `http://localhost:5000/pages/upload.html`
4. **View** - View your files at `http://localhost:5000/pages/my-files.html`
5. **Download** - Download public files at `http://localhost:5000/pages/downloads.html`
6. **Delete** - Delete your files from the "My Files" page
7. **Logout** - Click the "Logout" link in the navigation bar

## API Documentation
See [API_DOCUMENTATION.md](file:///c:/Users/Azad/Desktop/SECURE%20WEBAPP/API_DOCUMENTATION.md) for detailed API endpoints and usage.

## Database Schema
See [DATABASE_SCHEMA.md](file:///c:/Users/Azad/Desktop/SECURE%20WEBAPP/DATABASE_SCHEMA.md) for database structure details.

## Security Features
See [SECURITY.md](file:///c:/Users/Azad/Desktop/SECURE%20WEBAPP/SECURITY.md) for information about security measures and the shareable link mechanism.