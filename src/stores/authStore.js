import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('authToken'))

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  function setUser(userData) {
    user.value = userData
  }

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('authToken', newToken)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('authToken')
  }

  async function login(credentials) {
    // Mock login - replace with actual API
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockToken = 'mock_jwt_token_' + Date.now()
        setToken(mockToken)
        setUser({
          id: 1,
          name: 'John Doe',
          email: credentials.email
        })
        resolve({ success: true })
      }, 1000)
    })
  }

  return {
    user,
    token,
    isAuthenticated,
    currentUser,
    setUser,
    setToken,
    logout,
    login
  }
})