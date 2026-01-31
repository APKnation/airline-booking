<template>
  <v-container>
    <h1 class="text-h3 mb-6">Book a Taxi</h1>
    
    <v-card class="pa-4 mb-6" elevation="2">
      <TaxiSearchForm />
    </v-card>

    <v-row v-if="rides.length">
      <v-col v-for="ride in rides" :key="ride.id" cols="12" md="6">
        <v-card hover>
          <v-card-title class="d-flex align-center">
            <v-icon large color="primary" class="mr-3">{{ getVehicleIcon(ride.vehicleType) }}</v-icon>
            <div>
              <div>{{ ride.vehicleType }}</div>
              <div class="text-caption text-grey">{{ ride.provider }}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span>Base fare:</span>
              <span>${{ ride.basePrice }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span>Estimated distance:</span>
              <span>{{ ride.distance }} km</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span>Estimated time:</span>
              <span>{{ ride.duration }} min</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between text-h6">
              <span>Total Estimate:</span>
              <span class="text-primary">${{ ride.totalPrice }}</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="bookTaxi(ride)">
              Book Ride
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info">
      Enter your ride details to get fare estimates
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import TaxiSearchForm from '@/components/taxi/TaxiSearchForm.vue'
import { useBookingStore } from '@/stores/bookingStore'

const bookingStore = useBookingStore()
const rides = ref([])

const getVehicleIcon = (type) => {
  const icons = {
    'Sedan': 'mdi-car',
    'SUV': 'mdi-car-estate',
    'Luxury': 'mdi-car-convertible',
    'Van': 'mdi-van-passenger',
    'Shared Shuttle': 'mdi-bus'
  }
  return icons[type] || 'mdi-taxi'
}

const bookTaxi = (ride) => {
  bookingStore.addToCart({
    type: 'taxi',
    name: `${ride.provider} - ${ride.vehicleType}`,
    price: ride.totalPrice,
    rideDetails: ride
  })
}
</script>