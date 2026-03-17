<template>
  <a href="#" class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl md:flex-row md:max-w-xl flight-card">
    <!-- Airline Logo as Image -->
    <img 
      class="object-cover w-full rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0" 
      :src="airlineLogo" 
      :alt="flight.airline"
    />
    
    <div class="flex flex-col justify-between md:p-4 leading-normal flex-1">
      <!-- Header Section -->
      <div class="mb-4">
        <div class="flex justify-between items-start mb-2">
          <h5 class="text-2xl font-bold tracking-tight text-heading">
            {{ flight.airline }} {{ flight.flightNumber }}
          </h5>
          <span :class="getStatusClass(flight.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
            {{ flight.status || 'On Time' }}
          </span>
        </div>
        
        <!-- Flight Route Info -->
        <div class="grid grid-cols-3 gap-4 items-center text-center mb-4">
          <!-- Departure -->
          <div>
            <div class="text-lg font-bold text-heading">{{ flight.departureTime }}</div>
            <div class="text-body font-medium">{{ flight.from }}</div>
            <div class="text-body text-sm">{{ flight.departureDate }}</div>
          </div>

          <!-- Duration & Stops -->
          <div class="text-center">
            <div class="text-body text-sm">{{ flight.duration }}</div>
            <div class="relative my-2">
              <div class="h-0.5 bg-neutral-secondary-medium w-full"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-6 h-6 bg-neutral-tertiary-medium rounded-full flex items-center justify-center">
                  <i class="bi bi-airplane-fill text-white text-xs"></i>
                </div>
              </div>
            </div>
            <div class="text-body text-sm">
              {{ flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop(s)' }}
            </div>
          </div>

          <!-- Arrival -->
          <div>
            <div class="text-lg font-bold text-heading">{{ flight.arrivalTime }}</div>
            <div class="text-body font-medium">{{ flight.to }}</div>
            <div class="text-body text-sm">{{ flight.arrivalDate }}</div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-3 py-1 bg-neutral-secondary-medium text-body rounded-full text-sm font-semibold">
            {{ flight.class || 'Economy' }}
          </span>
          <span
            v-if="flight.seatsAvailable < 10"
            class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold"
          >
            Only {{ flight.seatsAvailable }} seats left!
          </span>
        </div>
      </div>

      <!-- Footer with Price and Button -->
      <div class="flex items-center justify-between">
        <div class="text-right">
          <div class="text-2xl font-bold text-heading">${{ flight.price }}</div>
          <div class="text-body text-sm">per passenger</div>
        </div>
        
        <button 
          type="button" 
          class="inline-flex items-center w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          @click="selectFlight"
          :disabled="flight.seatsAvailable === 0"
          :class="flight.seatsAvailable === 0 ? 'opacity-50 cursor-not-allowed' : ''"
        >
          Select Flight
          <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
          </svg>
        </button>
      </div>
    </div>
  </a>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  flight: { type: Object, required: true },
  passengers: { type: Number, default: 1 }
})

const emit = defineEmits(['select'])

// Airline logo placeholder
const airlineLogo = computed(() => props.flight.airlineLogo || require('@/assets/images/image.png'))

const getStatusClass = (status) => {
  const map = {
    'On Time': 'status-on-time',
    'Delayed': 'status-delayed',
    'Cancelled': 'status-cancelled',
    'Boarding': 'status-boarding'
  }
  return map[status] || 'status-on-time'
}

const selectFlight = () => emit('select', props.flight)
</script>

