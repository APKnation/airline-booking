<template>
  <div class="auth-page">
    <div class="auth-container">
      <v-card class="auth-card" elevation="10">
        <v-card-title class="text-center py-4">
          <h2 class="text-h4 font-weight-bold">Welcome Back</h2>
          <p class="text-body-2 text-grey mt-2">Sign in to continue your journey</p>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="handleLogin" ref="form">
            <v-text-field
              v-model="credentials.email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              :rules="[v => !!v || 'Email is required']"
              required
            ></v-text-field>

            <v-text-field
              v-model="credentials.password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              :rules="[v => !!v || 'Password is required']"
              required
            ></v-text-field>

            <div class="d-flex justify-space-between align-center mb-4">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                hide-details
              ></v-checkbox>
              <a href="#" class="text-primary text-decoration-none">Forgot Password?</a>
            </div>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="loading"
            >
              Sign In
            </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p class="text-body-2">
              Don't have an account?
              <router-link to="/register" class="text-primary font-weight-bold">
                Sign Up
              </router-link>
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const form = ref(null)
const loading = ref(false)
const rememberMe = ref(false)

const credentials = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  try {
    await authStore.login(credentials)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 16px !important;
}

:deep(.v-card-title) {
  flex-direction: column;
}
</style>