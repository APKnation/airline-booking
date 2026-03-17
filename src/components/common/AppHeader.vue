<template>
  <nav class="bg-gradient-to-r from-midnight-900 to-midnight-800 fixed w-full z-20 top-0 start-0 border-b border-midnight-700 backdrop-blur-lg">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 sm:p-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2 sm:space-x-3 text-lg sm:text-xl font-semibold hover:scale-105 transition-transform duration-200">
        <span class="text-2xl sm:text-3xl">✈️</span>
        <span class="text-gradient hidden xs:inline sm:inline">TravelBook</span>
      </router-link>

      <!-- Desktop Search & Menu -->
      <div class="flex items-center md:order-2">
        <!-- Mobile Search Toggle -->
        <button 
          type="button" 
          @click="toggleMobileSearch"
          class="flex items-center justify-center md:hidden text-midnight-300 hover:text-midnight-100 bg-transparent border border-transparent hover:bg-midnight-700 focus:ring-2 focus:ring-twilight-500 font-medium leading-5 rounded-lg text-sm w-8 h-8 sm:w-10 sm:h-10 focus:outline-none transition-all duration-200"
        >
          <svg class="w-4 h-4 sm:w-6 sm:h-6 text-midnight-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="sr-only">Search</span>
        </button>

        <!-- Desktop Search -->
        <div class="relative hidden md:block">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-midnight-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="text" 
            v-model="searchQuery"
            class="block w-full ps-9 pe-3 py-2.5 bg-midnight-700 border border-midnight-600 text-midnight-100 text-sm rounded-lg focus:ring-2 focus:ring-twilight-500 focus:border-twilight-500 px-2.5 py-2 shadow-sm placeholder:text-midnight-400 transition-all duration-200" 
            placeholder="Search flights, hotels, destinations..."
          />
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="toggleMobileMenu"
          class="inline-flex items-center p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 justify-center text-sm text-midnight-300 rounded-lg md:hidden hover:bg-midnight-700 hover:text-midnight-100 focus:outline-none focus:ring-2 focus:ring-twilight-500 transition-all duration-200"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-4 h-4 sm:w-6 sm:h-6 text-midnight-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Search & Menu -->
      <div 
        :class="showMobileSearch || showMobileMenu ? 'block' : 'hidden'"
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      >
        <!-- Mobile Search -->
        <div v-if="showMobileSearch" class="relative mt-3 md:hidden">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-midnight-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="text" 
            v-model="searchQuery"
            class="block w-full ps-9 pe-3 py-2.5 bg-midnight-700 border border-midnight-600 text-midnight-100 text-sm rounded-lg focus:ring-2 focus:ring-twilight-500 focus:border-twilight-500 px-2.5 py-2 shadow-sm placeholder:text-midnight-400 transition-all duration-200" 
            placeholder="Search flights, hotels, destinations..."
          />
        </div>

        <!-- Navigation Links -->
        <ul class="font-medium flex flex-col p-3 sm:p-4 md:p-0 mt-4 border border-midnight-600 rounded-lg bg-midnight-800 md:flex-row md:space-x-6 lg:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
          <li>
            <router-link 
              to="/" 
              class="block py-2 px-3 text-midnight-100 bg-gradient-to-r from-twilight-500 to-purple-500 rounded md:bg-transparent md:text-twilight-400 md:p-0 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
              :class="$route.path === '/' ? 'md:text-midnight-100 md:bg-gradient-to-r md:from-twilight-500 md:to-purple-500' : ''"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link 
              to="/flights" 
              class="block py-2 px-3 text-midnight-300 rounded hover:bg-midnight-700 md:hover:bg-transparent md:hover:text-twilight-400 md:p-0 transition-all duration-200 text-sm sm:text-base"
              :class="$route.path === '/flights' ? 'md:text-midnight-100 md:bg-gradient-to-r md:from-twilight-500 md:to-purple-500' : ''"
            >
              Flights
            </router-link>
          </li>
          <li>
            <router-link 
              to="/hotels" 
              class="block py-2 px-3 text-midnight-300 rounded hover:bg-midnight-700 md:hover:bg-transparent md:hover:text-twilight-400 md:p-0 transition-all duration-200 text-sm sm:text-base"
              :class="$route.path === '/hotels' ? 'md:text-midnight-100 md:bg-gradient-to-r md:from-twilight-500 md:to-purple-500' : ''"
            >
              Hotels
            </router-link>
          </li>
          <li>
            <router-link 
              to="/cars" 
              class="block py-2 px-3 text-midnight-300 rounded hover:bg-midnight-700 md:hover:bg-transparent md:hover:text-twilight-400 md:p-0 transition-all duration-200 text-sm sm:text-base"
              :class="$route.path === '/cars' ? 'md:text-midnight-100 md:bg-gradient-to-r md:from-twilight-500 md:to-purple-500' : ''"
            >
              Cars
            </router-link>
          </li>
          <li>
            <router-link 
              to="/guide" 
              class="block py-2 px-3 text-midnight-300 rounded hover:bg-midnight-700 md:hover:bg-transparent md:hover:text-twilight-400 md:p-0 transition-all duration-200 text-sm sm:text-base"
              :class="$route.path === '/guide' ? 'md:text-midnight-100 md:bg-gradient-to-r md:from-twilight-500 md:to-purple-500' : ''"
            >
              Travel Guide
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center space-x-2 sm:space-x-4">
        <!-- Cart Icon -->
        <div 
          @click="goToCheckout" 
          class="relative cursor-pointer p-1.5 sm:p-2 rounded-lg hover:bg-midnight-700 transition-all duration-200 group"
        >
          <span class="text-lg sm:text-2xl group-hover:scale-110 transition-transform duration-200">🛒</span>
          <span 
            v-if="cartCount > 0" 
            class="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-aurora-500 text-midnight-100 text-xs font-semibold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center animate-bounce-in shadow-lg"
          >
            {{ cartCount }}
          </span>
        </div>

        <!-- User Menu / Auth Links -->
        <div v-if="isAuthenticated" class="hidden sm:flex items-center space-x-2 sm:space-x-3">
          <router-link 
            to="/dashboard" 
            class="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg bg-midnight-700 hover:bg-midnight-600 transition-all duration-200 group"
          >
            <span class="text-lg sm:text-xl">👤</span>
            <span class="text-midnight-300 group-hover:text-midnight-100 text-xs sm:text-sm">Dashboard</span>
          </router-link>
          <button 
            @click="logout" 
            class="hidden sm:block px-3 sm:px-4 py-2 rounded-lg border border-midnight-600 text-midnight-300 hover:bg-midnight-700 hover:text-midnight-100 transition-all duration-200 text-xs sm:text-sm"
          >
            Logout
          </button>
        </div>
        <div v-else class="flex items-center space-x-1 sm:space-x-3">
          <router-link 
            to="/login" 
            class="hidden sm:block px-3 sm:px-4 py-2 rounded-lg border border-midnight-600 text-midnight-300 hover:bg-midnight-700 hover:text-midnight-100 transition-all duration-200 text-xs sm:text-sm"
          >
            Login
          </router-link>
          <router-link 
            to="/register" 
            class="btn-twilight text-xs sm:text-sm px-2 sm:px-4 py-2"
          >
            <span class="hidden sm:inline">Sign Up</span>
            <span class="sm:hidden">Join</span>
          </router-link>
        </div>
        
        <!-- Mobile User Actions -->
        <div v-if="isAuthenticated" class="sm:hidden">
          <button 
            @click="toggleMobileMenu"
            class="p-1.5 rounded-lg hover:bg-midnight-700 transition-all duration-200"
          >
            <span class="text-lg">👤</span>
          </button>
        </div>
        <div v-else class="sm:hidden">
          <router-link 
            to="/login" 
            class="px-2 py-1.5 rounded-lg border border-midnight-600 text-midnight-300 hover:bg-midnight-700 hover:text-midnight-100 transition-all duration-200 text-xs"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'AppHeader',

  data() {
    return {
      showMobileSearch: false,
      showMobileMenu: false,
      searchQuery: '',
      cartCount: 0,
      isAuthenticated: false
    }
  },

  computed: {
    authStore() {
      return useAuthStore()
    },
    cartStore() {
      return useCartStore()
    }
  },

  mounted() {
    this.isAuthenticated = this.authStore.isAuthenticated
    this.cartCount = this.cartStore.items.length
  },

  methods: {
    toggleMobileSearch() {
      this.showMobileSearch = !this.showMobileSearch
      this.showMobileMenu = false
    },

    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
      this.showMobileSearch = false
    },

    goToCheckout() {
      if (this.cartCount > 0) {
        this.$router.push('/checkout')
      }
    },

    logout() {
      this.authStore.logout()
      this.$router.push('/login')
    },

    handleSearch() {
      if (this.searchQuery) {
        console.log('Searching for:', this.searchQuery)
        // Implement search logic here
      }
    }
  }
}
</script>

