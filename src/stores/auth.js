import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import API from '@/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('authToken') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.name || user.value?.username || 'Guest')

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const response = await API.auth.login(credentials)
      
      token.value = response.data.access_token || response.data.access
      user.value = response.data.user
      
      localStorage.setItem('authToken', token.value)
      localStorage.setItem('refreshToken', response.data.refresh_token || response.data.refresh)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      router.push('/dashboard')
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Login failed. Please check your credentials.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null
    try {
      const response = await API.auth.register(userData)
      
      // Auto-login after successful registration
      await login({
        username: userData.username,
        password: userData.password
      })
      
      return response.data
    } catch (err) {
      error.value = err.response?.data?.detail || 'Registration failed. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await API.auth.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      clearAuth()
      router.push('/login')
    }
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  async function fetchProfile() {
    if (!isAuthenticated.value) return
    
    try {
      const response = await API.auth.profile()
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
    } catch (err) {
      console.error('Profile fetch error:', err)
      if (err.response?.status === 401) {
        clearAuth()
      }
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    userName,
    login,
    register,
    logout,
    fetchProfile,
    clearAuth
  }
})