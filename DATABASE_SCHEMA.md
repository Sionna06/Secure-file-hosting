# Database Schema

## Users Table

| Field | Type | Description |
|-------|------|-------------|
| id | ObjectId (MongoDB) | Unique identifier for the user |
| email | String (unique) | User's email address |
| username | String (unique) | User's chosen username |
| password | String (hashed) | Hashed password |
| createdAt | Date | Timestamp when user registered |

## Files Table

| Field | Type | Description |
|-------|------|-------------|
| id | ObjectId (MongoDB) | Unique identifier for the file |
| filename | String | Original name of the uploaded file |
| path | String | Path to the file on the server |
| size | Number | Size of the file in bytes |
| privacy | String (public/private) | Access control setting |
| uploadedBy | ObjectId (ref: Users) | Reference to the user who uploaded the file |
| uploadedAt | Date | Timestamp when file was uploaded |

## Relationships

- Each file is associated with one user (uploadedBy references Users.id)
- One user can have many files