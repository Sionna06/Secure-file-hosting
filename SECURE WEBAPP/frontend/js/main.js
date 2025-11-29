
const API_BASE_URL = '/api';


function checkAuth() {
    const token = localStorage.getItem('token');
    const authLinks = document.getElementById('auth-links');
    
    if (token && authLinks) {
        
        authLinks.innerHTML = `
            <li><a href="pages/upload.html">Upload</a></li>
            <li><a href="pages/my-files.html">My Files</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
        `;
        
        
        document.getElementById('logout-link')?.addEventListener('click', logout);
    } else if (authLinks) {
        
        authLinks.innerHTML = `
            <li><a href="pages/register.html">Register</a></li>
            <li><a href="pages/login.html">Login</a></li>
        `;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}

// Make API request
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };
    
    if (token && config.headers.Authorization === undefined) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Show alert message
function showAlert(message, type = 'success') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.querySelector('main');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});