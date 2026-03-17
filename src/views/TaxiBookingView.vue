<template>
  <div class="max-w-5xl mx-auto px-4 py-8 space-y-6">
    
    <!-- 1. Reduced Header Card (Former Hero) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
          <i class="bi bi-taxi-front text-3xl"></i>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Book a Taxi</h1>
          <p class="text-gray-500 text-sm">Fast, safe, and reliable rides.</p>
        </div>
      </div>
      <div class="flex gap-6 text-gray-600 text-sm">
        <div class="flex items-center gap-2">
          <i class="bi bi-clock-fill text-blue-500"></i>
          <span>Quick Pickup</span>
        </div>
        <div class="flex items-center gap-2">
          <i class="bi bi-shield-check text-green-500"></i>
          <span>Safe Rides</span>
        </div>
      </div>
    </div>

    <!-- 2. Location Details Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="bi bi-geo-alt text-blue-600"></i>
        Route Details
      </h2>
      
      <div class="space-y-4">
        <!-- Pickup -->
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Pickup Location</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="bi bi-circle-fill text-blue-600 text-xs"></i>
            </div>
            <input
              type="text"
              v-model="searchParams.pickup"
              placeholder="Enter pickup address"
              class="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>

        <!-- Swap Button -->
        <div class="flex justify-center">
          <button 
            type="button" 
            @click="swapLocations" 
            class="p-2 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-colors"
          >
            <i class="bi bi-arrow-down-up text-gray-500"></i>
          </button>
        </div>

        <!-- Dropoff -->
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Destination</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="bi bi-geo-alt-fill text-red-500"></i>
            </div>
            <input
              type="text"
              v-model="searchParams.dropoff"
              placeholder="Where to?"
              class="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>

        <!-- Quick Routes -->
        <div class="pt-2">
          <div class="text-xs text-gray-500 mb-2">Popular routes:</div>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              v-for="route in quickRoutes"
              :key="route.id"
              @click="setQuickRoute(route)"
              class="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              <i class="bi me-1" :class="route.icon"></i>
              {{ route.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Schedule & Preferences Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Schedule Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="bi bi-calendar-event text-blue-600"></i>
          Schedule
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Date</label>
            <input
              type="date"
              v-model="searchParams.date"
              :min="getTodayDate()"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Time</label>
            <input
              type="time"
              v-model="searchParams.time"
              class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
        </div>
        
        <!-- Counters -->
        <div class="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Passengers</label>
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200">
              <button type="button" @click="adjustPassengers(-1)" :disabled="searchParams.passengers <= 1" class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50">-</button>
              <div class="flex-1 text-center font-bold text-gray-800">{{ searchParams.passengers }}</div>
              <button type="button" @click="adjustPassengers(1)" :disabled="searchParams.passengers >= 6" class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50">+</button>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Luggage</label>
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-200">
              <button type="button" @click="adjustLuggage(-1)" :disabled="searchParams.luggage <= 0" class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50">-</button>
              <div class="flex-1 text-center font-bold text-gray-800">{{ searchParams.luggage }}</div>
              <button type="button" @click="adjustLuggage(1)" :disabled="searchParams.luggage >= 4" class="w-10 h-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Ride Type Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="bi bi-car-front text-blue-600"></i>
          Choose Ride
        </h2>
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="type in rideTypes"
            :key="type.id"
            @click="searchParams.type = type.id"
            class="p-3 rounded-lg border-2 cursor-pointer transition-all text-center"
            :class="searchParams.type === type.id 
              ? 'border-blue-600 bg-blue-50 shadow-sm' 
              : 'border-gray-100 hover:border-gray-200'"
          >
            <i class="bi text-2xl mb-1" :class="type.icon"></i>
            <div class="font-semibold text-sm text-gray-800">{{ type.name }}</div>
            <div class="text-xs text-gray-500">${{ type.price }}/km</div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-6">
          <button
            @click="handleSearch"
            :disabled="loading || !isFormValid"
            class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center justify-center gap-2"
          >
            <template v-if="loading">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </template>
            <template v-else>
              <i class="bi bi-search"></i>
              Find Rides
            </template>
          </button>
        </div>
      </div>
    </div>

    <!-- 4. Results Section -->
    <div v-if="hasSearched">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-gray-800">Available Rides</h3>
        <div class="flex gap-2">
          <button @click="sortRides('price')" class="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50">Sort by Price</button>
          <button @click="sortRides('time')" class="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50">Sort by ETA</button>
        </div>
      </div>

      <!-- Rides List -->
      <div v-if="rides.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="ride in rides" 
          :key="ride.id" 
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
        >
          <!-- Card Header -->
          <div class="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div>
              <span class="font-bold text-gray-900">{{ ride.type }}</span>
              <span class="text-xs text-gray-500 ml-2">{{ ride.provider }}</span>
            </div>
            <span class="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600">
              <i class="bi bi-clock me-1"></i>{{ ride.eta }} min
            </span>
          </div>

          <!-- Card Body -->
          <div class="p-4 flex-1">
            <div class="text-sm text-gray-600 space-y-1 mb-4">
              <div class="flex items-center gap-2">
                <i class="bi bi-circle-fill text-blue-500 text-[6px]"></i>
                <span>{{ ride.pickup }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="bi bi-geo-alt-fill text-red-500 text-xs"></i>
                <span>{{ ride.dropoff }}</span>
              </div>
            </div>
            
            <div class="flex items-center gap-3 text-xs text-gray-500 mb-4">
              <span><i class="bi bi-speedometer2 me-1"></i>{{ ride.distance }} km</span>
              <span><i class="bi bi-people me-1"></i>{{ ride.capacity }}</span>
            </div>

            <div class="flex flex-wrap gap-1">
              <span v-for="feature in ride.features" :key="feature" class="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
                {{ feature }}
              </span>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <div>
              <span class="text-xs text-gray-500">Est. Fare</span>
              <div class="text-xl font-bold text-gray-900">${{ ride.price }}</div>
            </div>
            <button 
              @click="bookRide(ride)"
              class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <i class="bi bi-taxi-front text-5xl text-gray-300 mb-3 block"></i>
        <h4 class="text-lg font-semibold text-gray-800 mb-1">No rides found</h4>
        <p class="text-gray-500 text-sm mb-4">Try adjusting your location or time.</p>
        <button @click="clearSearch" class="text-blue-600 hover:underline text-sm font-medium">Clear Search</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchParams = ref({
  pickup: '',
  dropoff: '',
  date: new Date().toISOString().split('T')[0],
  time: getNextHour(),
  type: 'sedan',
  passengers: 1,
  luggage: 0
})

const rides = ref([])
const loading = ref(false)
const hasSearched = ref(false)

const quickRoutes = [
  { id: 1, label: 'Airport → City', pickup: 'Airport', dropoff: 'Downtown', icon: 'bi-airplane' },
  { id: 2, label: 'Hotel → Airport', pickup: 'Hotel', dropoff: 'Airport', icon: 'bi-building' },
  { id: 3, label: 'Station → Mall', pickup: 'Train Station', dropoff: 'Shopping Mall', icon: 'bi-train' }
]

const rideTypes = [
  { id: 'economy', name: 'Economy', icon: 'bi-car-front text-green-600', price: 1.5 },
  { id: 'sedan', name: 'Sedan', icon: 'bi-car-front-fill text-blue-600', price: 2.0 },
  { id: 'suv', name: 'SUV', icon: 'bi-truck text-orange-500', price: 2.5 },
  { id: 'luxury', name: 'Luxury', icon: 'bi-stars text-purple-600', price: 3.5 }
]

const mockRides = [
  {
    id: 1, type: 'Economy', provider: 'UberX', eta: 5, pickup: 'City Center', dropoff: 'Airport', distance: 15, capacity: 4, price: 22.50, features: ['AC', 'WiFi'], discount: 2.50
  },
  {
    id: 2, type: 'Sedan', provider: 'Lyft', eta: 7, pickup: 'Hotel Grand', dropoff: 'Mall', distance: 8, capacity: 4, price: 18.75, features: ['Premium', 'AC'], discount: 0
  },
  {
    id: 3, type: 'SUV', provider: 'UberXL', eta: 10, pickup: 'Station', dropoff: 'Resort', distance: 20, capacity: 6, price: 32.90, features: ['Spacious', 'WiFi'], discount: 3.10
  }
]

const isFormValid = computed(() => {
  return searchParams.value.pickup.trim() && 
         searchParams.value.dropoff.trim() &&
         searchParams.value.date &&
         searchParams.value.time
})

function getTodayDate() {
  return new Date().toISOString().split('T')[0]
}

function getNextHour() {
  const now = new Date()
  now.setHours(now.getHours() + 1)
  return now.toTimeString().slice(0, 5)
}

function adjustPassengers(change) {
  const newVal = searchParams.value.passengers + change
  if (newVal >= 1 && newVal <= 6) searchParams.value.passengers = newVal
}

function adjustLuggage(change) {
  const newVal = searchParams.value.luggage + change
  if (newVal >= 0 && newVal <= 4) searchParams.value.luggage = newVal
}

function swapLocations() {
  [searchParams.value.pickup, searchParams.value.dropoff] = 
  [searchParams.value.dropoff, searchParams.value.pickup]
}

function setQuickRoute(route) {
  searchParams.value.pickup = route.pickup
  searchParams.value.dropoff = route.dropoff
}

async function handleSearch() {
  if (!isFormValid.value) return
  
  loading.value = true
  hasSearched.value = true
  
  // Simulate API
  await new Promise(r => setTimeout(r, 1000))
  
  rides.value = mockRides.filter(ride => 
    ride.type.toLowerCase() === searchParams.value.type
  )
  
  loading.value = false
}

function sortRides(criteria) {
  if (criteria === 'price') {
    rides.value.sort((a, b) => a.price - b.price)
  } else {
    rides.value.sort((a, b) => a.eta - b.eta)
  }
}

function bookRide(ride) {
  alert(`Booking confirmed: ${ride.provider} ${ride.type} from ${searchParams.value.pickup} to ${searchParams.value.dropoff}. Total: $${ride.price}`)
}

function clearSearch() {
  searchParams.value.pickup = ''
  searchParams.value.dropoff = ''
  rides.value = []
  hasSearched.value = false
}
</script>