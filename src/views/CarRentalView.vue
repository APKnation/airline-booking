<template>
  <v-container>
    <h1 class="text-h3 mb-6">Rent a Car</h1>
    
    <v-card class="pa-4 mb-6" elevation="2">
      <CarSearchForm />
    </v-card>

    <v-row v-if="cars.length">
      <v-col v-for="car in cars" :key="car.id" cols="12" md="6" lg="4">
        <v-card hover>
          <v-img :src="car.image" height="180" contain class="bg-grey-lighten-3"></v-img>
          <v-card-title class="d-flex justify-space-between">
            {{ car.model }}
            <v-chip color="primary" small>{{ car.type }}</v-chip>
          </v-card-title>
          <v-card-subtitle>{{ car.company }}</v-card-subtitle>
          <v-card-text>
            <v-row dense>
              <v-col cols="6">
                <v-icon small>mdi-seat</v-icon> {{ car.seats }} Seats
              </v-col>
              <v-col cols="6">
                <v-icon small>mdi-briefcase</v-icon> {{ car.bags }} Bags
              </v-col>
              <v-col cols="6">
                <v-icon small>mdi-car-shift-pattern</v-icon> {{ car.transmission }}
              </v-col>
              <v-col cols="6">
                <v-icon small>mdi-gas-station</v-icon> {{ car.fuel }}
              </v-col>
            </v-row>
            <div class="text-h5 mt-4 text-primary">${{ car.price }}/day</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="rentCar(car)">
              Rent Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info">
      Enter your rental details to see available cars
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import CarSearchForm from '@/components/car/CarSearchForm.vue'
import { useBookingStore } from '@/stores/bookingStore'

const bookingStore = useBookingStore()
const cars = ref([])

const rentCar = (car) => {
  bookingStore.addToCart({
    type: 'car',
    name: `${car.company} ${car.model}`,
    price: car.price,
    carDetails: car
  })
}
</script>