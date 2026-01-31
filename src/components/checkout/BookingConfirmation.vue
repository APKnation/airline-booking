<template>
  <v-card class="text-center pa-6">
    <v-icon size="100" color="success" class="mb-4">mdi-check-circle</v-icon>
    <h2 class="text-h4 mb-4">Booking Confirmed!</h2>
    <p class="text-body-1 mb-4">Thank you for your booking. Your confirmation details are below:</p>
    
    <v-list v-if="booking?.length">
      <v-list-item v-for="(item, index) in booking" :key="index">
        <v-list-item-content>
          <v-list-item-title>Booking ID: {{ item.bookingId }}</v-list-item-title>
          <v-list-item-subtitle>Status: {{ item.success ? 'Confirmed' : 'Pending' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
    <v-btn color="primary" to="/" class="mt-4">Back to Home</v-btn>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'  // ✅ Added import

defineProps({
  booking: {
    type: Array,
    default: () => []
  }
})
</script>