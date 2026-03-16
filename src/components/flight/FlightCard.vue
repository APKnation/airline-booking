<template>
  <div class="card card-hover p-6 flight-card backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl">
    <!-- Airline Info -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
          <img 
            :src="airlineLogo" 
            alt="Airline Logo" 
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <div class="font-bold text-white text-lg">{{ flight.airline }}</div>
          <div class="text-white/60 text-sm">{{ flight.flightNumber }}</div>
        </div>
      </div>
      <span :class="getStatusClass(flight.status)" class="px-4 py-2 rounded-full text-sm font-semibold">
        {{ flight.status || 'On Time' }}
      </span>
    </div>

    <!-- Flight Route -->
    <div class="border-y border-white/20 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
        <!-- Departure -->
        <div class="space-y-2">
          <div class="text-2xl font-bold text-white">{{ flight.departureTime }}</div>
          <div class="text-white/80 font-medium">{{ flight.from }}</div>
          <div class="text-white/60 text-sm">{{ flight.departureDate }}</div>
        </div>

        <!-- Duration & Stops -->
        <div class="space-y-2">
          <div class="text-white/60 text-sm">{{ flight.duration }}</div>
          <div class="relative my-4">
            <div class="h-0.5 bg-white/20 w-full"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <i class="bi bi-airplane-fill text-white text-sm"></i>
              </div>
            </div>
          </div>
          <div class="text-white/60 text-sm">
            {{ flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop(s)' }}
          </div>
        </div>

        <!-- Arrival -->
        <div class="space-y-2">
          <div class="text-2xl font-bold text-white">{{ flight.arrivalTime }}</div>
          <div class="text-white/80 font-medium">{{ flight.to }}</div>
          <div class="text-white/60 text-sm">{{ flight.arrivalDate }}</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 space-y-4 lg:space-y-0">
      <div class="flex flex-wrap gap-2">
        <span class="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full text-sm font-semibold">
          {{ flight.class || 'Economy' }}
        </span>
        <span
          v-if="flight.seatsAvailable < 10"
          class="px-4 py-2 bg-pink-500/20 backdrop-blur-sm text-pink-300 border border-pink-400/30 rounded-full text-sm font-semibold"
        >
          Only {{ flight.seatsAvailable }} seats left!
        </span>
      </div>
      
      <div class="flex items-center space-x-6">
        <div class="text-right">
          <div class="text-2xl font-bold text-white">${{ flight.price }}</div>
          <div class="text-white/60 text-sm">per passenger</div>
        </div>
        <button
          class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          @click="selectFlight"
          :disabled="flight.seatsAvailable === 0"
          :class="flight.seatsAvailable === 0 ? 'opacity-50 cursor-not-allowed' : ''"
        >
          <i class="bi bi-check-circle mr-2"></i>
          Select Flight
        </button>
      </div>
    </div>
  </div>
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

<style scoped>
.flight-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.flight-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Status badge classes */
.status-on-time {
  @apply bg-green-50 text-green-700 border border-green-200;
}

.status-delayed {
  @apply bg-yellow-50 text-yellow-700 border border-yellow-200;
}

.status-cancelled {
  @apply bg-red-50 text-red-700 border border-red-200;
}

.status-boarding {
  @apply bg-blue-50 text-blue-700 border border-blue-200;
}

/* Flight line animation */
.flight-line {
  position: relative;
}

.flight-line::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-color: rgb(14 165 233);
  border-radius: 50%;
}

.flight-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-color: rgb(14 165 233);
  border-radius: 50%;
}

/* Button disabled state */
button:disabled {
  @apply cursor-not-allowed opacity-50;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>