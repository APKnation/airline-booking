<template>
  <div class="auth-page">
    <div class="auth-container">
      <v-card class="auth-card" elevation="10">
        <v-card-title class="text-center py-4">
          <h2 class="text-h4 font-weight-bold">Create Account</h2>
          <p class="text-body-2 text-grey mt-2">Start your journey with us</p>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="handleRegister" ref="form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.firstName"
                  label="First Name"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  :rules="[v => !!v || 'First name is required']"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.lastName"
                  label="Last Name"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  :rules="[v => !!v || 'Last name is required']"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="formData.email"
              label="Email"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              :rules="[
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
              ]"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.phone"
              label="Phone Number"
              type="tel"
              prepend-inner-icon="mdi-phone"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              :rules="[
                v => !!v || 'Password is required',
                v => v.length >= 6 || 'Password must be at least 6 characters'
              ]"
              required
            ></v-text-field>

            <v-text-field
              v-model="formData.confirmPassword"
              label="Confirm Password"
              type="password"
              prepend-inner-icon="mdi-lock-check"
              variant="outlined"
              :rules="[
                v => !!v || 'Please confirm your password',
                v => v === formData.password || 'Passwords do not match'
              ]"
              required
            ></v-text-field>

            <v-checkbox
              v-model="formData.agreeTerms"
              :rules="[v => !!v || 'You must agree to continue']"
              required
            >
              <template v-slot:label>
                <div class="text-body-2">
                  I agree to the
                  <a href="#" class="text-primary">Terms of Service</a>
                  and
                  <a href="#" class="text-primary">Privacy Policy</a>
                </div>
              </template>
            </v-checkbox>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="loading"
              class="mt-2"
            >
              Create Account
            </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p class="text-body-2">
              Already have an account?
              <router-link to="/login" class="text-primary font-weight-bold">
                Sign In
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

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const handleRegister = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  try {
    // Mock registration - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Registration data:', formData)
    
    // Auto login after registration
    await authStore.login({ email: formData.email, password: formData.password })
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
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
    url('https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1920&q=80');
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
  max-width: 500px;
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