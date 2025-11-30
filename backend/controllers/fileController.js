const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const User = require('../models/User');

// Configure multer for file uploads
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Sanitize filename
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, Date.now() + '-' + sanitizedFilename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only PDF files with additional security checks
    if (file.mimetype === 'application/pdf' && 
        file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Upload file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { privacy } = req.body;
    
    // Validate privacy setting
    if (privacy !== 'public' && privacy !== 'private') {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Privacy must be either public or private' });
    }

    // Create file record
    const file = new File({
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      privacy,
      uploadedBy: req.user._id
    });

    await file.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        id: file._id,
        filename: file.filename,
        size: file.size,
        privacy: file.privacy,
        uploadedBy: file.uploadedBy,
        uploadedAt: file.uploadedAt
      }
    });
  } catch (error) {
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

// Get public files
const getPublicFiles = async (req, res) => {
  try {
    const files = await File.find({ privacy: 'public' })
      .populate('uploadedBy', 'username')
      .sort({ uploadedAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's files
const getUserFiles = async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user._id })
      .sort({ uploadedAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download file
const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check access permissions
    if (file.privacy === 'private' && 
        !req.user && 
        req.user._id.toString() !== file.uploadedBy.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if file exists on disk
    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream file to response
    const fileStream = fs.createReadStream(file.path);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete file
const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Check if user owns the file
    if (file.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete file from disk
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Delete file record from database
    await File.findByIdAndDelete(fileId);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upload: upload.single('file'),
  uploadFile,
  getPublicFiles,
  getUserFiles,
  downloadFile,
  deleteFile
};