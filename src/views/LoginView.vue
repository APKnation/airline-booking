<template>
  <div class="login-page d-flex align-items-center justify-content-center">
    <div class="card shadow-sm w-100" style="max-width: 480px;">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Login</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              class="form-control" 
              id="email"
              v-model="username"
              required
            >
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              class="form-control" 
              id="password"
              v-model="password"
              required
            >
          </div>

          <!-- Show Password -->
          <div class="form-check mb-3">
            <input 
              type="checkbox" 
              class="form-check-input" 
              id="showPassword" 
              v-model="showPassword"
            >
            <label class="form-check-label" for="showPassword">Show Password</label>
          </div>

          <!-- Error -->
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Submit -->
          <button 
            type="submit" 
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="mt-3 text-center">
          <p>
            Don't have an account? 
            <router-link to="/register">Register</router-link>
          </p>
          <p>
            <a href="#" class="text-primary" @click.prevent="forgotPassword">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bgImage from '@/assets/images/im1.png'  // <-- put your image here

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
.login-page {
  min-height: 100vh;
  background: url('@/assets/images/im1.png') center/cover no-repeat;
  padding: 2rem;
}

.card {
  border-radius: 12px;
}
.card-header {
  border-bottom: none;
}
</style>
