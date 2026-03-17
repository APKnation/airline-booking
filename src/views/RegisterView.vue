<template>
  <div 
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
    :style="{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <!-- Backdrop overlay for better readability -->
    <div class="absolute inset-0 bg-black/40"></div>
    
    <div class="relative w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
          <h4 class="text-white text-xl font-semibold">Register</h4>
        </div>

        <!-- Form Body -->
        <div class="p-6">
          <form @submit.prevent="handleRegister" class="space-y-5">
            
            <!-- Name Fields (2-column on md+) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input 
                  type="text" 
                  id="firstName"
                  v-model="formData.first_name"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         transition duration-150 ease-in-out
                         placeholder:text-gray-400"
                >
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input 
                  type="text" 
                  id="lastName"
                  v-model="formData.last_name"
                  required
                  class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                         transition duration-150 ease-in-out
                         placeholder:text-gray-400"
                >
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                v-model="formData.email"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       transition duration-150 ease-in-out
                       placeholder:text-gray-400"
              >
            </div>

            <!-- Username -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input 
                type="text" 
                id="username"
                v-model="formData.username"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
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
                type="password" 
                id="password"
                v-model="formData.password"
                required
                minlength="8"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       transition duration-150 ease-in-out
                       placeholder:text-gray-400"
                placeholder="••••••••"
              >
              <p class="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input 
                type="password" 
                id="confirmPassword"
                v-model="confirmPassword"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                       transition duration-150 ease-in-out
                       placeholder:text-gray-400"
              >
              <p 
                v-if="confirmPassword && formData.password !== confirmPassword" 
                class="mt-1 text-xs text-red-600"
              >
                Passwords do not match
              </p>
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
              :disabled="loading || formData.password !== confirmPassword || !formData.password"
              class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent 
                     rounded-lg shadow-sm text-sm font-medium text-white 
                     bg-emerald-600 hover:bg-emerald-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
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
              {{ loading ? 'Registering...' : 'Register' }}
            </button>
          </form>

          <!-- Footer Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Already have an account? 
              <router-link 
                to="/login" 
                class="font-medium text-emerald-600 hover:text-emerald-800 transition-colors duration-150"
              >
                Login
              </router-link>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Optional: Terms notice -->
      <div class="mt-4 text-center">
        <p class="text-xs text-white/80">
          By registering, you agree to our <a href="#" class="underline hover:text-white">Terms</a> and <a href="#" class="underline hover:text-white">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import bgImage from '@/assets/images/im1.png'

export default {
  name: 'RegisterView',
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: ''
      },
      confirmPassword: '',
      background: bgImage
    }
  },
  computed: {
    ...mapState(useAuthStore, ['loading', 'error'])
  },
  methods: {
    ...mapActions(useAuthStore, ['register']),
    
    async handleRegister() {
      // Client-side validation
      if (this.formData.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      
      if (this.formData.password.length < 8) {
        alert('Password must be at least 8 characters')
        return
      }
      
      try {
        await this.register(this.formData)
        // Success redirect handled in store or here
        this.$router.push('/dashboard')
      } catch (error) {
        // Error is handled in the Pinia store
        console.error('Registration error:', error)
      }
    }
  }
}
</script>

