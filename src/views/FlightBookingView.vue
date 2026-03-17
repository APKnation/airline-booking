<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
    <div class="container mx-auto px-4 max-w-7xl">

      <!-- Header -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl mb-6 backdrop-blur-sm bg-white/10 border border-white/20">
          <div class="flex items-center mb-4">
            <div class="rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-6 w-16 h-16 border border-white/30">
              <span class="text-3xl">✈️</span>
            </div>
            <h1 class="text-4xl lg:text-5xl font-bold text-white mb-0">Book Your Flight</h1>
          </div>
          <div class="flex items-center text-white/90 text-lg">
            <span class="text-2xl mr-4">🎯</span>
            <span>Discover perfect journeys with exclusive deals</span>
          </div>
        </div>
      </div>

      <!-- Flight Search Form -->
      <div class="card border-0 shadow-2xl rounded-3xl overflow-hidden mb-8 backdrop-blur-sm bg-white/10 border border-white/20">
        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 backdrop-blur-sm">
          <div class="flex items-center">
            <span class="text-2xl mr-3">🔍</span>
            <span class="text-2xl font-semibold">Search Flights</span>
          </div>
        </div>

        <div class="p-8">
          <form @submit.prevent="handleSearch">

            <!-- Trip Type -->
            <div class="mb-8">
              <label class="block text-lg font-semibold text-blue-700 mb-4">Trip Type</label>
              <div class="flex flex-wrap gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <button
                  type="button"
                  @click="tripType = 'oneway'"
                  class="flex-1 min-w-[140px] px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  :class="tripType === 'oneway' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg border border-white/30' : 'text-white/80 hover:bg-white/20'"
                >
                  One Way
                </button>
                <button
                  type="button"
                  @click="tripType = 'round'"
                  class="flex-1 min-w-[140px] px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  :class="tripType === 'round' ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg border border-white/30' : 'text-white/80 hover:bg-white/20'"
                >
                  Round Trip
                </button>
              </div>
            </div>

            <!-- Main Form Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <!-- From -->
              <div>
                <label class="block text-lg font-semibold text-white mb-3">From</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">📍</span>
                  <input
                    v-model="search.from"
                    type="text"
                    placeholder="Departure city"
                    class="input-field pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50"
                    :class="search.from ? 'border-indigo-400 ring-2 ring-indigo-300/50 bg-white/20' : 'border-white/20'"
                    required
                  />
                </div>
              </div>

              <!-- To -->
              <div>
                <label class="block text-lg font-semibold text-white mb-3">To</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">🎯</span>
                  <input
                    v-model="search.to"
                    type="text"
                    placeholder="Destination city"
                    class="input-field pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50"
                    :class="search.to ? 'border-indigo-400 ring-2 ring-indigo-300/50 bg-white/20' : 'border-white/20'"
                    required
                  />
                </div>
              </div>

              <!-- Departure Date -->
              <div>
                <label class="block text-lg font-semibold text-white mb-3">Departure</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">📅</span>
                  <input
                    v-model="search.departDate"
                    type="date"
                    :min="today"
                    class="input-field pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                    :class="search.departDate ? 'border-indigo-400 ring-2 ring-indigo-300/50 bg-white/20' : 'border-white/20'"
                    required
                  />
                </div>
              </div>

              <!-- Return Date -->
              <div v-if="tripType === 'round'">
                <label class="block text-lg font-semibold text-white mb-3">Return</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">📅</span>
                  <input
                    v-model="search.returnDate"
                    type="date"
                    :min="search.departDate || today"
                    class="input-field pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                    :class="search.returnDate ? 'border-indigo-400 ring-2 ring-indigo-300/50 bg-white/20' : 'border-white/20'"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Second Row: Passengers & Class -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label class="block text-lg font-semibold text-white mb-3">Travelers</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">👥</span>
                  <select v-model="search.passengers" class="input-field pl-12 pr-4 py-4 text-lg appearance-none bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                    <option v-for="n in 8" :key="n" :value="n">
                      {{ n }} {{ n === 1 ? 'Traveler' : 'Travelers' }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-lg font-semibold text-white mb-3">Cabin Class</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">✈️</span>
                  <select v-model="search.class" class="input-field pl-12 pr-4 py-4 text-lg appearance-none bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business Class</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
              </div>

              <div class="flex items-end">
                <button
                  type="button"
                  @click="showAdvanced = !showAdvanced"
                  class="w-full px-6 py-4 border-2 border-dashed border-white/30 rounded-xl text-white font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span class="text-xl">⚙️</span>
                  <span>Advanced Options</span>
                </button>
              </div>
            </div>

            <!-- Advanced Options Panel -->
            <div v-if="showAdvanced" class="bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 mb-8 animate-slide-up">
              <h5 class="text-lg font-semibold text-white mb-6 flex items-center">
                <span class="text-xl mr-3">🔧</span>
                Advanced Search Options
              </h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-lg font-semibold text-white mb-3">Flexible Dates</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">📅</span>
                    <select v-model="search.flexibleDates" class="input-field pl-12 pr-4 py-4 text-lg appearance-none bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                      <option value="">None</option>
                      <option value="1">±1 day</option>
                      <option value="2">±2 days</option>
                      <option value="3">±3 days</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-lg font-semibold text-white mb-3">Preferred Airline</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">🛩️</span>
                    <input
                      v-model="search.airline"
                      type="text"
                      placeholder="e.g., Delta, Emirates"
                      class="input-field pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50"
                    />
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <input
                    id="directFlights"
                    type="checkbox"
                    v-model="search.directOnly"
                    class="w-5 h-5 text-primary-600 border-2 border-primary-300 rounded focus:ring-primary-500"
                  />
                  <label for="directFlights" class="text-lg font-semibold text-white cursor-pointer">
                    Direct Flights Only
                  </label>
                </div>
                <div>
                  <label class="block text-lg font-semibold text-white mb-3">Price Range ($)</label>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">💵</span>
                      <input
                        v-model.number="search.priceMin"
                        type="number"
                        placeholder="Min"
                        min="0"
                        class="input-field pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50"
                      />
                    </div>
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl">💰</span>
                      <input
                        v-model.number="search.priceMax"
                        type="number"
                        placeholder="Max"
                        min="0"
                        class="input-field pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Search Button -->
            <div class="flex justify-center">
              <button type="submit" class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-12 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-3 transform hover:scale-105">
                <span class="text-2xl">🔍</span>
                <span>Search Flights</span>
                <i class="bi bi-arrow-right text-xl"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white mb-6"></div>
        <h4 class="text-2xl font-semibold text-white mb-2">Searching flights...</h4>
        <p class="text-white/70">Please wait while we find the best flights for you</p>
      </div>

      <!-- Flight Results -->
      <div v-if="searched && !loading && flights.length > 0" class="mb-8">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-0">
            {{ flights.length }} Flight{{ flights.length > 1 ? 's' : '' }} Found
          </h2>
          <button @click="clearSearch" class="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200">
            <i class="bi bi-arrow-clockwise mr-2"></i>
            New Search
          </button>
        </div>
        <div class="space-y-6">
          <div v-for="flight in validFlights" :key="flight.id" class="w-full">
            <FlightCard
              :flight="flight"
              :passengers="search.passengers"
              @select="bookFlight(flight)"
            />
          </div>
        </div>
      </div>

      <!-- No Flights Found -->
      <div v-else-if="searched && !loading && flights.length === 0" class="text-center py-16">
        <div class="card max-w-2xl mx-auto p-8 backdrop-blur-sm bg-white/10 border border-white/20">
          <div class="text-6xl mb-6">✈️</div>
          <h3 class="text-2xl font-bold text-white mb-4">No flights match your search</h3>
          <p class="text-white/70 mb-6">Try adjusting your search criteria or dates to find available flights</p>
          <button @click="clearSearch" class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            <i class="bi bi-search mr-2"></i>
            Try New Search
          </button>
        </div>
      </div>

      <!-- Welcome State -->
      <div v-else-if="!searched && !loading" class="text-center py-16">
        <div class="card max-w-4xl mx-auto p-8 backdrop-blur-sm bg-white/10 border border-white/20">
          <div class="w-48 h-48 mx-auto mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-6xl">🌍</span>
          </div>
          <h3 class="text-3xl lg:text-4xl font-bold text-white mb-4">Your Journey Begins Here</h3>
          <p class="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Enter your travel details above to explore amazing flight deals and create unforgettable travel experiences.
          </p>
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <div class="flex items-center space-x-3">
              <i class="bi bi-check-circle-fill text-emerald-400 text-xl"></i>
              <span class="font-medium text-white">Best Price Guarantee</span>
            </div>
            <div class="flex items-center space-x-3">
              <i class="bi bi-check-circle-fill text-emerald-400 text-xl"></i>
              <span class="font-medium text-white">24/7 Customer Support</span>
            </div>
            <div class="flex items-center space-x-3">
              <i class="bi bi-check-circle-fill text-emerald-400 text-xl"></i>
              <span class="font-medium text-white">Secure Booking</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFlights } from '@/composables/useFlights'
import { useBookingStore } from '@/stores/bookingStore'
import FlightCard from '@/components/flight/FlightCard.vue'

// Composables
const route = useRoute()
const { flights, loading, searchFlights } = useFlights()
const bookingStore = useBookingStore()

// State
const searched = ref(false)
const tripType = ref('oneway')
const showAdvanced = ref(false)

const search = reactive({
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: 1,
  class: 'Economy',
  flexibleDates: '',
  airline: '',
  directOnly: false,
  priceMin: null,
  priceMax: null
})

// Computed Properties
const today = computed(() => new Date().toISOString().split('T')[0])
const isFormValid = computed(() => {
  const hasRequiredFields = search.from && search.to && search.departDate
  if (tripType.value === 'round') {
    return hasRequiredFields && search.returnDate
  }
  return hasRequiredFields
})
const validFlights = computed(() => {
  return flights.filter(f => f != null && f.id)
})

// Methods
const handleSearch = async () => {
  if (!isFormValid.value) return
  searched.value = true
  await searchFlights({ ...search, tripType: tripType.value })
}

const clearSearch = () => {
  search.from = ''
  search.to = ''
  search.departDate = ''
  search.returnDate = ''
  search.passengers = 1
  search.class = 'Economy'
  search.flexibleDates = ''
  search.airline = ''
  search.directOnly = false
  search.priceMin = null
  search.priceMax = null
  searched.value = false
  tripType.value = 'oneway'
  showAdvanced.value = false
}

const bookFlight = (flight) => {
  if (!flight) return
  bookingStore.selectFlight(flight)
  alert(`Flight ${flight.id} selected!`)
}

// Lifecycle
onMounted(() => {
  if (route.query.from) {
    Object.assign(search, {
      from: route.query.from || '',
      to: route.query.to || '',
      departDate: route.query.departDate || '',
      returnDate: route.query.returnDate || '',
      passengers: parseInt(route.query.passengers) || 1,
      class: route.query.class || 'Economy'
    })
    tripType.value = route.query.returnDate ? 'round' : 'oneway'
    if (search.from && search.to && search.departDate) {
      handleSearch()
    }
  }
})
</script>

