<template>
  <v-app-bar app color="primary" dark elevation="2">
    <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>
    
    <v-toolbar-title>
      <router-link to="/" class="text-white text-decoration-none d-flex align-center">
        <v-icon size="32" class="mr-2">mdi-airplane</v-icon>
        <span class="font-weight-bold">SkyBooker</span>
      </router-link>
    </v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <div class="d-none d-md-flex">
      <v-btn text to="/flights" class="mx-1">
        <v-icon start>mdi-airplane</v-icon>
        Flights
      </v-btn>
      <v-btn text to="/hotels" class="mx-1">
        <v-icon start>mdi-bed</v-icon>
        Hotels
      </v-btn>
      <v-btn text to="/cars" class="mx-1">
        <v-icon start>mdi-car</v-icon>
        Cars
      </v-btn>
      <v-btn text to="/taxi" class="mx-1">
        <v-icon start>mdi-taxi</v-icon>
        Taxi
      </v-btn>
      <v-btn text to="/guide" class="mx-1">
        <v-icon start>mdi-book-open</v-icon>
        Guide
      </v-btn>
      <v-btn text to="/attractions" class="mx-1">
        <v-icon start>mdi-map-marker</v-icon>
        Attractions
      </v-btn>
    </div>
    
    <v-spacer></v-spacer>
    
    <v-btn icon to="/checkout" class="mr-2">
      <v-badge :content="bookingCount" color="error" v-if="bookingCount > 0">
        <v-icon>mdi-cart</v-icon>
      </v-badge>
      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>
    
    <v-btn v-if="!isAuthenticated" to="/login" variant="outlined">
      Login
    </v-btn>
    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/dashboard">
          <v-list-item-title>My Bookings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  
  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/flights" prepend-icon="mdi-airplane">Flights</v-list-item>
      <v-list-item to="/hotels" prepend-icon="mdi-bed">Hotels</v-list-item>
      <v-list-item to="/cars" prepend-icon="mdi-car">Cars</v-list-item>
      <v-list-item to="/taxi" prepend-icon="mdi-taxi">Taxi</v-list-item>
      <v-list-item to="/guide" prepend-icon="mdi-book-open">Guide</v-list-item>
      <v-list-item to="/attractions" prepend-icon="mdi-map-marker">Attractions</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { useAuthStore } from '@/stores/authStore'

const drawer = ref(false)
const bookingStore = useBookingStore()
const authStore = useAuthStore()

const bookingCount = computed(() => bookingStore.bookingCount)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
}
</script>