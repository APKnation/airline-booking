<template>
  <header class="glass-effect sticky top-0 z-50 border-b border-white/10">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center space-x-2 text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200">
            <span class="text-3xl">✈️</span>
            <span>TravelBook</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden lg:flex items-center space-x-1">
          <router-link 
            to="/" 
            class="nav-link"
            :class="$route.path === '/' ? 'active' : ''"
          >
            Home
          </router-link>
          <router-link 
            to="/flights" 
            class="nav-link"
            :class="$route.path === '/flights' ? 'active' : ''"
          >
            Flights
          </router-link>
          <router-link 
            to="/hotels" 
            class="nav-link"
            :class="$route.path === '/hotels' ? 'active' : ''"
          >
            Hotels
          </router-link>
          <router-link 
            to="/cars" 
            class="nav-link"
            :class="$route.path === '/cars' ? 'active' : ''"
          >
            Cars
          </router-link>
          <router-link 
            to="/taxi" 
            class="nav-link"
            :class="$route.path === '/taxi' ? 'active' : ''"
          >
            Taxi
          </router-link>
          <router-link 
            to="/guide" 
            class="nav-link"
            :class="$route.path === '/guide' ? 'active' : ''"
          >
            Travel Guide
          </router-link>
          <router-link 
            to="/attractions" 
            class="nav-link"
            :class="$route.path === '/attractions' ? 'active' : ''"
          >
            Attractions
          </router-link>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Cart Icon -->
          <div 
            @click="goToCheckout" 
            class="relative cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
          >
            <span class="text-2xl group-hover:scale-110 transition-transform duration-200">🛒</span>
            <span 
              v-if="cartCount > 0" 
              class="absolute -top-1 -right-1 bg-aurora-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-in shadow-medium"
            >
              {{ cartCount }}
            </span>
          </div>

          <!-- User Menu / Auth Links -->
          <div v-if="isAuthenticated" class="flex items-center space-x-3">
            <router-link 
              to="/dashboard" 
              class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group"
            >
              <span class="text-lg">👤</span>
              <span class="font-medium text-white group-hover:text-primary-200">{{ userName || 'User' }}</span>
            </router-link>
            <button 
              @click="logoutHandler" 
              class="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200 font-medium"
            >
              Logout
            </button>
          </div>
          <div v-else class="flex items-center space-x-3">
            <router-link 
              to="/login" 
              class="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-200 font-medium"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              class="btn-twilight text-sm px-4 py-2"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'AppHeader',

  data() {
    return {
      authStore: null,
      cartStore: null
    }
  },

  computed: {
    isAuthenticated() {
      return this.authStore?.isAuthenticated || false
    },
    userName() {
      return this.authStore?.userName || ''
    },
    cartCount() {
      return this.cartStore?.totalItems || 0
    }
  },

  created() {
    try {
      this.authStore = useAuthStore()
    } catch (e) {
      console.warn('Auth store not available', e)
    }

    try {
      this.cartStore = useCartStore()
    } catch (e) {
      console.warn('Cart store not available', e)
    }
  },

  methods: {
    logoutHandler() {
      if (this.authStore && typeof this.authStore.logout === 'function') {
        this.authStore.logout()
      }
    },

    goToCheckout() {
      if (this.cartCount > 0) {
        this.$router.push('/checkout')
      }
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply px-4 py-2 rounded-lg text-midnight-200 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium;
}

.nav-link.active {
  @apply text-white bg-white/20;
}

.nav-link.router-link-active {
  @apply text-white bg-white/20;
}
</style>
