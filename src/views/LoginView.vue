<template>
  <div 
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    :style="{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <!-- Backdrop overlay for better text contrast -->
    <div class="absolute inset-0 bg-black/40"></div>
    
    <div class="relative w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h4 class="text-white text-xl font-semibold mb-0">Login</h4>
        </div>

        <!-- Form Body -->
        <div class="p-6">
          <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                v-model="username"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-150 ease-in-out
                       placeholder:text-gray-400"
              >
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password"
                v-model="password"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       transition duration-150 ease-in-out
                       placeholder:text-gray-400"
              >
            </div>

            <!-- Show Password Toggle -->
            <div class="flex items-center">
              <input 
                type="checkbox" 
                id="showPassword" 
                v-model="showPassword"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded 
                       focus:ring-blue-500 focus:ring-offset-0 
                       cursor-pointer"
              >
              <label class="ml-2 block text-sm text-gray-700 cursor-pointer select-none" for="showPassword">
                Show Password
              </label>
            </div>

            <!-- Error Message -->
            <div 
              v-if="error" 
              class="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start"
              role="alert"
            >
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              {{ error }}
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent 
                     rounded-lg shadow-sm text-sm font-medium text-white 
                     bg-blue-600 hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition-all duration-200 ease-in-out"
            >
              <svg 
                v-if="loading" 
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </form>

          <!-- Footer Links -->
          <div class="mt-6 text-center space-y-3">
            <p class="text-sm text-gray-600">
              Don't have an account? 
              <router-link 
                to="/register" 
                class="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-150"
              >
                Register
              </router-link>
            </p>
            <p>
              <a 
                href="#" 
                class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-150" 
                @click.prevent="forgotPassword"
              >
                Forgot Password?
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Optional: Branding/Footer -->
      <div class="mt-4 text-center">
        <p class="text-xs text-white/80">&copy; {{ new Date().getFullYear() }} Your Company. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import bgImage from '@/assets/images/im1.png'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loading: false,
      error: '',
      background: bgImage
    }
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        this.error = 'Please fill in all fields'
        return
      }

      this.loading = true
      this.error = ''
      
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('authToken', 'demo-token-123')
        this.$router.push('/')
        this.loading = false
      }, 800)
    },
    forgotPassword() {
      alert('Password reset functionality will be implemented.')
    }
  }
}
</script>

<style scoped>
/* Optional: Add subtle animation for page load */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-white {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>