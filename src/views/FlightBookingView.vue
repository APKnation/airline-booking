<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white font-sans antialiased overflow-x-hidden relative">
    <!-- Background subtle noise / pattern -->
    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: url('https://www.transparenttextures.com/patterns/noise.png'); mix-blend-mode: overlay;"></div>

    <div class="relative z-10 container mx-auto px-5 py-10 md:py-16 max-w-7xl">
      <!-- Hero Header -->
      <header class="text-center mb-12 md:mb-16">
        <div class="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 mb-6">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span class="text-sm font-medium">Trusted by 120,000+ travelers worldwide</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          Find Your <span class="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">Perfect Flight</span>
        </h1>

        <p class="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Discover unbeatable deals, flexible dates, and seamless booking — from economy to first class.
        </p>
      </header>

      <!-- Glassmorphic Search Card -->
      <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/40 p-6 md:p-8 mb-16 max-w-6xl mx-auto">
        <form @submit.prevent="handleSearch" class="space-y-6">
          <!-- Trip Type Toggle -->
          <div class="flex justify-center">
            <div class="inline-flex bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1.5">
              <button
                type="button"
                @click="tripType = 'oneway'"
                class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="tripType === 'oneway' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' : 'hover:bg-white/10'"
              >
                One Way
              </button>
              <button
                type="button"
                @click="tripType = 'round'"
                class="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                :class="tripType === 'round' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' : 'hover:bg-white/10'"
              >
                Round Trip
              </button>
            </div>
          </div>

          <!-- Main Inputs Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <!-- From -->
            <div class="relative">
              <label class="absolute -top-2 left-4 px-2 bg-gradient-to-r from-indigo-950 to-purple-950 text-xs font-semibold text-slate-300 rounded-full">From</label>
              <div class="flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 focus-within:border-indigo-400 transition-all">
                <i class="bi bi-geo-alt-fill text-xl text-indigo-400 mr-3"></i>
                <input
                  v-model="search.from"
                  type="text"
                  placeholder="City or airport"
                  class="flex-1 bg-transparent outline-none text-lg placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <!-- To -->
            <div class="relative">
              <label class="absolute -top-2 left-4 px-2 bg-gradient-to-r from-indigo-950 to-purple-950 text-xs font-semibold text-slate-300 rounded-full">To</label>
              <div class="flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 focus-within:border-indigo-400 transition-all">
                <i class="bi bi-geo-fill text-xl text-purple-400 mr-3"></i>
                <input
                  v-model="search.to"
                  type="text"
                  placeholder="City or airport"
                  class="flex-1 bg-transparent outline-none text-lg placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <!-- Departure -->
            <div class="relative">
              <label class="absolute -top-2 left-4 px-2 bg-gradient-to-r from-indigo-950 to-purple-950 text-xs font-semibold text-slate-300 rounded-full">Departure</label>
              <input
                v-model="search.departDate"
                type="date"
                :min="today"
                class="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 text-lg text-white focus:border-indigo-400 transition-all"
                required
              />
            </div>

            <!-- Return (conditional) -->
            <div v-if="tripType === 'round'" class="relative">
              <label class="absolute -top-2 left-4 px-2 bg-gradient-to-r from-indigo-950 to-purple-950 text-xs font-semibold text-slate-300 rounded-full">Return</label>
              <input
                v-model="search.returnDate"
                type="date"
                :min="search.departDate || today"
                class="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 text-lg text-white focus:border-indigo-400 transition-all"
                required
              />
            </div>
          </div>

          <!-- Passengers + Class + Button -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
            <div class="relative">
              <label class="absolute -top-2 left-4 px-2 bg-gradient-to-r from-indigo-950 to-purple-950 text-xs font-semibold text-slate-300 rounded-full">Travelers</label>
              <select v-model="search.passengers" class="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 text-lg appearance-none focus:border-indigo-400 transition-all">
                <option v-for="n in 9" :key="n" :value="n">{{ n }} Traveler{{ n > 1 ? 's' : '' }}</option>
              </select>
            </div>

            <div class="relative">
              <label class="absolute -top-2 left-4 px-2 bg-gradient-to-r from-indigo-950 to-purple-950 text-xs font-semibold text-slate-300 rounded-full">Cabin</label>
              <select v-model="search.class" class="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 text-lg appearance-none focus:border-indigo-400 transition-all">
                <option>Economy</option>
                <option>Premium Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60"
            >
              <i class="bi bi-search"></i>
              Search Flights
            </button>
          </div>

          <!-- Quick toggles -->
          <div class="flex flex-wrap gap-4 justify-center text-sm">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="search.directOnly" class="w-5 h-5 accent-indigo-500" />
              Direct flights only
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-5 h-5 accent-indigo-500" />
              Flexible dates
            </label>
          </div>
        </form>
      </div>

      <!-- Results / States -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-14 w-14 border-4 border-white/20 border-t-indigo-400 mb-6"></div>
        <h3 class="text-2xl font-bold mb-3">Finding your best flights...</h3>
        <p class="text-slate-300">Scanning hundreds of airlines for the lowest fares</p>
      </div>

      <div v-else-if="searched && flights.length > 0" class="space-y-10">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-6">
          <h2 class="text-3xl md:text-4xl font-bold">
            {{ flights.length }} {{ flights.length === 1 ? 'Flight' : 'Flights' }} Found
          </h2>
          <button @click="clearSearch" class="bg-white/5 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 transition-all">
            New Search
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            v-for="flight in flights"
            :key="flight.id"
            class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-400/50 transition-all group shadow-xl hover:shadow-2xl"
          >
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div class="space-y-2">
                <div class="flex items-center gap-4">
                  <div class="text-2xl font-bold">{{ flight.departTime }} — {{ flight.arriveTime }}</div>
                  <div class="text-sm text-slate-400">{{ flight.duration }}</div>
                </div>
                <div class="text-lg font-semibold">{{ flight.from }} → {{ flight.to }}</div>
                <div class="text-sm text-slate-300">{{ flight.airline }} • {{ flight.stops === 0 ? 'Direct' : flight.stops + ' stop' }}</div>
              </div>

              <div class="text-right">
                <div class="text-3xl font-extrabold text-emerald-400">${{ flight.price }}</div>
                <div class="text-sm text-slate-400">per passenger • {{ search.class }}</div>
                <button class="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="searched && !loading" class="text-center py-20 max-w-2xl mx-auto">
        <div class="text-6xl mb-6">✈️</div>
        <h3 class="text-3xl font-bold mb-4">No flights found</h3>
        <p class="text-slate-300 mb-8">Try adjusting dates, airports, or remove filters for more options.</p>
        <button @click="clearSearch" class="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all">
          Start New Search
        </button>
      </div>

      <!-- Initial welcome when no search -->
      <div v-if="!searched && !loading" class="text-center py-20 max-w-4xl mx-auto">
        <div class="text-8xl mb-10 opacity-80">🌍✈️</div>
        <h2 class="text-4xl md:text-5xl font-bold mb-6">Where would you like to fly today?</h2>
        <p class="text-xl text-slate-300 mb-10">Enter your travel details above and unlock exclusive flight deals.</p>
        <div class="flex flex-wrap justify-center gap-8 text-lg">
          <div class="flex items-center gap-3"><i class="bi bi-shield-check text-emerald-400 text-2xl"></i> Best Price Guarantee</div>
          <div class="flex items-center gap-3"><i class="bi bi-headset text-emerald-400 text-2xl"></i> 24/7 Support</div>
          <div class="flex items-center gap-3"><i class="bi bi-lock text-emerald-400 text-2xl"></i> Secure Booking</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tripType = ref('oneway')
const searched = ref(false)
const loading = ref(false)
const search = ref({
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: 1,
  class: 'Economy',
  directOnly: false
})

const today = computed(() => new Date().toISOString().split('T')[0])

// Mock flights (replace with real API/composable)
const flights = ref([])

const mockFlights = [
  { id: 1, from: 'DAR', to: 'NBO', departTime: '08:45', arriveTime: '10:30', duration: '1h 45m', airline: 'Precision Air', stops: 0, price: 189 },
  { id: 2, from: 'DAR', to: 'NBO', departTime: '14:20', arriveTime: '16:05', duration: '1h 45m', airline: 'Kenya Airways', stops: 0, price: 215 },
  { id: 3, from: 'DAR', to: 'DXB', departTime: '23:55', arriveTime: '05:40', duration: '5h 45m', airline: 'Emirates', stops: 0, price: 478 },
  // add more...
]

const handleSearch = async () => {
  if (!search.value.from || !search.value.to || !search.value.departDate) return

  loading.value = true
  searched.value = true

  // Simulate API delay
  await new Promise(r => setTimeout(r, 1400))

  flights.value = mockFlights.filter(f =>
    (!search.value.directOnly || f.stops === 0)
  )

  loading.value = false
}

const clearSearch = () => {
  search.value = { from: '', to: '', departDate: '', returnDate: '', passengers: 1, class: 'Economy', directOnly: false }
  searched.value = false
  flights.value = []
}

onMounted(() => {
  // Optional: pre-fill from query params or defaults
})
</script>

<style>
/* Optional subtle slide animation for results */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>