<template>
  <div class="register-page d-flex align-items-center justify-content-center">
    <div class="card shadow-sm w-100" style="max-width: 480px;">
      <div class="card-header bg- text-green">
        <h4 class="mb-0">Register</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleRegister">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="firstName"
                v-model="formData.first_name"
                required
              >
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="lastName"
                v-model="formData.last_name"
                required
              >
            </div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              class="form-control" 
              id="email"
              v-model="formData.email"
              required
            >
          </div>

          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input 
              type="text" 
              class="form-control" 
              id="username"
              v-model="formData.username"
              required
            >
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="password"
              v-model="formData.password"
              required
            >
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="confirmPassword"
              v-model="confirmPassword"
              required
            >
          </div>

          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-100"
            :disabled="loading || formData.password !== confirmPassword"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>

        <div class="mt-3 text-center">
          <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import bgImage from '@/assets/images/im1.png' // <-- Add your image here

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
      if (this.formData.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      
      try {
        await this.register(this.formData)
        this.$router.push('/dashboard')
      } catch (error) {
        // Error is handled in the store
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/images/im1.png') center/cover no-repeat;
}

.card {
  border-radius: 12px;
}

.card-header {
  border-bottom: none;
}
</style>
