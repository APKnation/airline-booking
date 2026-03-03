import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Add custom headers for travel booking
    config.headers['X-Client-Type'] = 'vue-web'
    config.headers['X-Client-Version'] = '1.0.0'
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle success responses
    return response
  },
  (error) => {
    const originalRequest = error.config
    
    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        return axiosInstance.post('/auth/refresh/', { refresh: refreshToken })
          .then(response => {
            const newToken = response.data.access
            localStorage.setItem('authToken', newToken)
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return axiosInstance(originalRequest)
          })
          .catch(refreshError => {
            // Refresh failed, logout user
            localStorage.removeItem('authToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            window.location.href = '/login'
            return Promise.reject(refreshError)
          })
      }
    }
    
    // Handle other errors
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.error('Forbidden: You do not have permission')
          break
        case 404:
          console.error('Resource not found')
          break
        case 429:
          console.error('Too many requests, please try again later')
          break
        case 500:
          console.error('Server error, please try again later')
          break
      }
    }
    
    // Extract error message
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        error.response?.data?.error || 
                        'An error occurred'
    
    // Show error notification (you can integrate with a notification system)
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(errorMessage, 'error')
    }
    
    return Promise.reject(error)
  }
)

export default axiosInstance