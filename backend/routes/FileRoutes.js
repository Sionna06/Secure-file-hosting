const express = require('express');
const { 
  upload, 
  uploadFile, 
  getPublicFiles, 
  getUserFiles, 
  downloadFile, 
  deleteFile 
} = require('../controllers/fileController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/public-files', getPublicFiles);

// Protected routes
router.post('/upload', auth, upload, uploadFile);
router.get('/my-files', auth, getUserFiles);
router.get('/files/:id/download', downloadFile);
router.delete('/files/:id', auth, deleteFile);

module.exports = router;