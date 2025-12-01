# API Documentation

## Authentication

### POST /api/register
Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username"
  }
}
```

### POST /api/login
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username"
  }
}
```

## File Management

### POST /api/upload
Uploads a file. Requires authentication.

**Request Body (multipart/form-data):**
```
file: [file_data]
privacy: "public" or "private"
```

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "id": "file_id",
    "filename": "example.pdf",
    "size": 123456,
    "privacy": "public",
    "uploadedBy": "user_id",
    "uploadedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### GET /api/public-files
Retrieves all public files. No authentication required.

**Response:**
```json
[
  {
    "id": "file_id",
    "filename": "example.pdf",
    "size": 123456,
    "privacy": "public",
    "uploadedBy": {
      "username": "uploader_username"
    },
    "uploadedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### GET /api/my-files
Retrieves all files uploaded by the authenticated user.

**Response:**
```json
[
  {
    "id": "file_id",
    "filename": "example.pdf",
    "size": 123456,
    "privacy": "public",
    "uploadedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### GET /api/files/:id/download
Downloads a file by ID. Public files can be downloaded by anyone. Private files can only be downloaded by the owner or with a shareable link.

**Response:**
File stream

### DELETE /api/files/:id
Deletes a file by ID. Only the owner can delete their files.

**Response:**
```json
{
  "message": "File deleted successfully"
}
```