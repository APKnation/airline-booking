<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans antialiased">
    <!-- Hero Section – Split Layout: Text Left | Image Right -->
    <div class="relative bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950 overflow-hidden">
      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 opacity-10 mix-blend-soft-light" style="background-image: url('https://www.transparenttextures.com/patterns/white-carbon.png');"></div>

      <div class="container mx-auto px-5 pt-16 pb-40 md:pt-24 md:pb-56 relative z-10">
        <div class="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          
          <!-- Left: Text & CTA -->
          <div class="text-white space-y-7 lg:space-y-9 text-center lg:text-left">
            <div class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm font-medium mx-auto lg:mx-0">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Trusted by 75,000+ global travelers
            </div>

            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Your Journey Begins
              <span class="block mt-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                With the Perfect Ride
              </span>
            </h1>

            <p class="text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover freedom on four wheels — from economy to exotic supercars. Instant quotes, no hidden fees, delivered wherever you are.
            </p>

            <div class="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
              <button class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-2xl transition-all duration-300 flex items-center gap-3">
                <i class="bi bi-search"></i> Find Your Car
              </button>
              <button class="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300">
                Browse Luxury Fleet
              </button>
            </div>
          </div>

          <!-- Right: Hero Image (hidden on mobile) -->
          <div class="relative hidden lg:block">
            <div class="absolute -inset-10 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
            
            <img
              src="https://sandiegoprestige.com/wp-content/uploads/2025/05/Side.png"
              alt="Premium black Lamborghini Urus Performante – dramatic sunset lighting, luxury SUV for exotic car rental"
              class="relative rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
            >

            <!-- Floating badge on image -->
            <div class="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-white border border-white/20 shadow-lg flex items-center gap-2">
              <i class="bi bi-lightning-fill text-yellow-400"></i>
              Exotic • Luxury • Performance
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Unified Search Bar -->
      <div class="container mx-auto px-5 relative z-20 -mt-20 md:-mt-28">
        <div class="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-black/30 p-5 md:p-6 max-w-5xl mx-auto">
          <form @submit.prevent="handleSearch" class="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
            <!-- Location -->
            <div class="flex-1 relative">
              <label class="absolute -top-2 left-4 px-2 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-600 rounded-full">Pick-up / Drop-off</label>
              <div class="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-slate-200/50 focus-within:border-blue-400 transition-all">
                <i class="bi bi-geo-alt-fill text-xl text-blue-600"></i>
                <input
                  v-model="searchParams.location"
                  type="text"
                  placeholder="City, airport or address..."
                  class="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-500 text-base font-medium"
                  required
                >
              </div>
            </div>

            <!-- Date Range -->
            <div class="flex-1 grid grid-cols-2 gap-3">
              <div class="relative">
                <label class="absolute -top-2 left-4 px-2 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-600 rounded-full">Pick-up</label>
                <input
                  v-model="searchParams.pickupDate"
                  type="date"
                  class="w-full bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-slate-200/50 focus:border-blue-400 transition-all text-slate-900 font-medium"
                  required
                >
              </div>
              <div class="relative">
                <label class="absolute -top-2 left-4 px-2 bg-white/80 backdrop-blur-sm text-xs font-semibold text-slate-600 rounded-full">Return</label>
                <input
                  v-model="searchParams.returnDate"
                  type="date"
                  :min="searchParams.pickupDate"
                  class="w-full bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-slate-200/50 focus:border-blue-400 transition-all text-slate-900 font-medium"
                  required
                >
              </div>
            </div>

            <!-- Search Button -->
            <button
              type="submit"
              :disabled="loading"
              class="md:w-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-700/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <i class="bi bi-search"></i>
              Search
            </button>
          </form>

          <!-- Quick Filters -->
          <div class="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              v-for="type in ['All', 'Economy', 'SUV', 'Luxury', 'Convertible']"
              :key="type"
              @click="searchParams.carType = type === 'All' ? '' : type.toLowerCase()"
              :class="[
                'px-5 py-2 text-sm font-medium rounded-full transition-all',
                searchParams.carType === (type === 'All' ? '' : type.toLowerCase())
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white/30 backdrop-blur-sm text-white border border-white/30 hover:bg-white/40'
              ]"
            >
              {{ type }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="container mx-auto px-5 py-20 md:py-28">
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <div v-for="n in 8" :key="n" class="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
          <div class="aspect-[4/3] bg-slate-200"></div>
          <div class="p-5 space-y-4">
            <div class="h-5 bg-slate-200 rounded w-3/4"></div>
            <div class="h-4 bg-slate-200 rounded w-1/2"></div>
            <div class="flex justify-between">
              <div class="h-7 bg-slate-200 rounded w-1/3"></div>
              <div class="h-10 bg-slate-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="cars.length" class="space-y-10">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 class="text-3xl font-bold text-slate-900">Available Cars</h2>
          <p class="text-slate-600">
            <span class="font-semibold text-blue-700">{{ cars.length }}</span> matches found
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          <div
            v-for="car in cars"
            :key="car.id"
            class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 border border-slate-100 hover:border-blue-200 flex flex-col"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="car.image"
                :alt="car.model"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
              <div v-if="car.discount" class="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {{ car.discount }}% OFF
              </div>
              <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 uppercase shadow-sm">
                {{ car.type }}
              </div>
            </div>

            <div class="p-5 flex flex-col flex-1">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-xl font-bold text-slate-900">{{ car.model }}</h3>
                  <p class="text-sm text-slate-500">{{ car.company }}</p>
                </div>
                <div class="flex items-center gap-1 text-amber-500">
                  <i class="bi bi-star-fill"></i>
                  <span class="font-bold text-slate-700">4.9</span>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-2 py-4 border-t border-b border-slate-100 mb-5 text-center">
                <div>
                  <i class="bi bi-people text-slate-400 block mb-1 text-xl"></i>
                  <span class="text-xs text-slate-600">{{ car.seats }}</span>
                </div>
                <div>
                  <i class="bi bi-briefcase text-slate-400 block mb-1 text-xl"></i>
                  <span class="text-xs text-slate-600">{{ car.bags }}</span>
                </div>
                <div>
                  <i class="bi bi-gear-wide text-slate-400 block mb-1 text-xl"></i>
                  <span class="text-xs text-slate-600">{{ car.transmission.substring(0,4) }}</span>
                </div>
                <div>
                  <i class="bi bi-snow text-slate-400 block mb-1 text-xl"></i>
                  <span class="text-xs text-slate-600">A/C</span>
                </div>
              </div>

              <div class="mt-auto flex items-end justify-between">
                <div>
                  <span v-if="car.originalPrice" class="text-sm text-slate-400 line-through block">
                    ${{ car.originalPrice }}/day
                  </span>
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-extrabold text-slate-900">${{ car.price }}</span>
                    <span class="text-sm text-slate-500">/day</span>
                  </div>
                </div>
                <button
                  @click="rentCar(car)"
                  class="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors relative overflow-hidden group"
                >
                  <span class="relative z-10">Rent Now</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-24">
        <div class="max-w-md mx-auto space-y-6">
          <div class="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <i class="bi bi-car-front-fill text-6xl text-blue-300"></i>
          </div>
          <h3 class="text-2xl font-bold text-slate-800">No vehicles found</h3>
          <p class="text-slate-500">Try changing location, dates or filters.</p>
          <button @click="clearSearch" class="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800">
            <i class="bi bi-arrow-counterclockwise"></i> Reset Search
          </button>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <Transition name="slide-up">
      <div v-if="showSuccessToast" class="fixed bottom-6 right-6 z-50 max-w-xs">
        <div class="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
          <div class="bg-emerald-500 rounded-full p-2">
            <i class="bi bi-check-lg text-lg"></i>
          </div>
          <div>
            <p class="font-semibold">Booking Started!</p>
            <p class="text-sm text-slate-300">Added to your cart.</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchParams = ref({
  location: '',
  pickupDate: '',
  returnDate: '',
  carType: ''
})

const cars = ref([])
const loading = ref(false)
const showSuccessToast = ref(false)

const mockCars = [
  { id: 1, model: 'Toyota Camry', company: 'Hertz', type: 'economy', seats: 5, bags: 2, transmission: 'Automatic', price: 49, originalPrice: 65, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80', discount: 25 },
  { id: 2, model: 'BMW X5', company: 'Enterprise', type: 'suv', seats: 7, bags: 4, transmission: 'Automatic', price: 95, originalPrice: 115, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=600&q=80', discount: 17 },
  { id: 3, model: 'Mercedes E-Class', company: 'Avis', type: 'luxury', seats: 5, bags: 3, transmission: 'Automatic', price: 109, originalPrice: 135, image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=600&q=80', discount: 19 },
  { id: 4, model: 'Ford Mustang', company: 'Budget', type: 'convertible', seats: 4, bags: 2, transmission: 'Manual', price: 129, originalPrice: null, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80', discount: 0 },
]

onMounted(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const in5days = new Date(today)
  in5days.setDate(in5days.getDate() + 5)

  searchParams.value.pickupDate = tomorrow.toISOString().split('T')[0]
  searchParams.value.returnDate = in5days.toISOString().split('T')[0]
})

const handleSearch = async () => {
  if (!searchParams.value.location.trim()) return

  loading.value = true

  await new Promise(r => setTimeout(r, 1400))

  cars.value = mockCars.filter(car =>
    !searchParams.value.carType || car.type === searchParams.value.carType
  )

  loading.value = false
}

const rentCar = (car) => {
  console.log('Rent initiated:', car.model)
  showSuccessToast.value = true
  setTimeout(() => { showSuccessToast.value = false }, 4000)
}

const clearSearch = () => {
  cars.value = []
  searchParams.value.carType = ''
}
</script>

<style>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>