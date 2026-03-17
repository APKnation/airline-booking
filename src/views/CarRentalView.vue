<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased">
    
    <!-- Hero & Search Section -->
    <div class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-20" style="background-image: url('https://www.transparenttextures.com/patterns/cubes.png');"></div>
      
      <div class="container mx-auto px-4 pt-16 pb-32 relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-white space-y-6">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Trusted by over 50k travelers
            </div>
            <h1 class="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Find Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Perfect Ride</span>
            </h1>
            <p class="text-lg text-slate-300 max-w-lg leading-relaxed">
              Experience the freedom of the open road. From economy to luxury, we have the perfect vehicle waiting for you.
            </p>
            <div class="flex gap-8 pt-4">
              <div>
                <div class="text-3xl font-bold">500+</div>
                <div class="text-slate-400 text-sm">Car Models</div>
              </div>
              <div>
                <div class="text-3xl font-bold">120+</div>
                <div class="text-slate-400 text-sm">Locations</div>
              </div>
              <div>
                <div class="text-3xl font-bold">24/7</div>
                <div class="text-slate-400 text-sm">Support</div>
              </div>
            </div>
          </div>
          
          <!-- Right Side Image (Hidden on mobile) -->
          <div class="hidden lg:block relative">
             <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-20"></div>
             <img 
               src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Luxury Car" 
               class="relative rounded-2xl shadow-2xl border border-white/10"
             >
          </div>
        </div>
      </div>

      <!-- Floating Search Card -->
      <div class="container mx-auto px-4 relative z-20 -mb-20">
        <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200/50">
          <form @submit.prevent="handleSearch" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <!-- Location -->
              <div class="lg:col-span-2 space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <i class="bi bi-geo-alt-fill text-blue-600"></i> Pick-up Location
                </label>
                <div class="relative">
                  <input 
                    type="text" 
                    v-model="searchParams.pickupLocation"
                    class="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                    placeholder="City, Airport, or Address"
                    required
                  >
                  <div class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer">
                    <i class="bi bi-crosshair text-xl"></i>
                  </div>
                </div>
              </div>

              <!-- Dates -->
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pick-up Date</label>
                <input 
                  type="date" 
                  v-model="searchParams.pickupDate"
                  class="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                  required
                >
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-500 uppercase tracking-wider">Return Date</label>
                <input 
                  type="date" 
                  v-model="searchParams.returnDate"
                  :min="searchParams.pickupDate"
                  class="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                  required
                >
              </div>
            </div>

            <!-- Filters & Submit -->
            <div class="flex flex-col md:flex-row gap-4 pt-2 border-t border-slate-100">
               <div class="flex gap-4 flex-1">
                 <select v-model="searchParams.carType" class="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-600">
                    <option value="">All Car Types</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="economy">Economy</option>
                 </select>
                 <select v-model="searchParams.transmission" class="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-600">
                    <option value="">Any Transmission</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                 </select>
               </div>
               
               <button 
                type="submit" 
                class="md:w-auto w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                :disabled="loading"
              >
                <i class="bi bi-search"></i>
                Search Cars
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="container mx-auto px-4 pt-28 pb-16">
      
      <!-- Loading Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 6" :key="n" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
          <div class="aspect-video bg-slate-200"></div>
          <div class="p-6 space-y-4">
            <div class="flex justify-between">
              <div class="h-4 bg-slate-200 rounded w-1/3"></div>
              <div class="h-4 bg-slate-200 rounded w-1/4"></div>
            </div>
            <div class="h-6 bg-slate-200 rounded w-2/3"></div>
            <div class="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100">
               <div class="h-3 bg-slate-200 rounded"></div>
               <div class="h-3 bg-slate-200 rounded"></div>
               <div class="h-3 bg-slate-200 rounded"></div>
               <div class="h-3 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cars Grid -->
      <div v-else-if="cars.length">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 class="text-2xl font-bold text-slate-800">Available Vehicles</h2>
            <p class="text-slate-500 mt-1">Found <span class="font-semibold text-blue-600">{{ cars.length }}</span> cars for your trip</p>
          </div>
          <div class="flex gap-2">
            <button @click="sortByPrice" class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-2">
              <i class="bi bi-arrow-down-up"></i> Price
            </button>
            <button class="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-2">
              <i class="bi bi-sliders"></i> Filters
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="car in cars" 
            :key="car.id"
            class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-blue-200 flex flex-col"
          >
            <!-- Image Container -->
            <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img 
                :src="car.image" 
                :alt="car.model"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex gap-2">
                <span v-if="car.discount" class="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                  {{ car.discount }}% OFF
                </span>
              </div>
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                <span class="text-xs font-bold text-slate-700 uppercase">{{ car.type }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5 flex flex-col flex-1">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="text-lg font-bold text-slate-900">{{ car.model }}</h3>
                  <p class="text-sm text-slate-500">{{ car.company }}</p>
                </div>
                <div class="flex items-center gap-1 text-yellow-500">
                  <i class="bi bi-star-fill text-sm"></i>
                  <span class="text-sm font-bold text-slate-700">4.8</span>
                </div>
              </div>

              <!-- Specs Grid -->
              <div class="grid grid-cols-4 gap-2 py-3 border-t border-b border-slate-100 mb-4">
                <div class="text-center">
                  <i class="bi bi-people-fill text-slate-400 block mb-1"></i>
                  <span class="text-xs text-slate-600">{{ car.seats }}</span>
                </div>
                <div class="text-center">
                  <i class="bi bi-briefcase-fill text-slate-400 block mb-1"></i>
                  <span class="text-xs text-slate-600">{{ car.bags }}</span>
                </div>
                <div class="text-center">
                  <i class="bi bi-gear-wide-connected text-slate-400 block mb-1"></i>
                  <span class="text-xs text-slate-600">{{ car.transmission.substring(0,4) }}</span>
                </div>
                <div class="text-center">
                  <i class="bi bi-snow text-slate-400 block mb-1"></i>
                  <span class="text-xs text-slate-600">A/C</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-if="car.unlimitedMiles" class="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-md font-medium">Unlimited Miles</span>
                <span v-if="car.freeCancellation" class="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">Free Cancel</span>
              </div>

              <!-- Footer -->
              <div class="mt-auto flex items-end justify-between pt-2">
                <div>
                  <span class="text-xs text-slate-400 line-through" v-if="car.originalPrice">${{ car.originalPrice }}</span>
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl font-extrabold text-slate-900">${{ car.price }}</span>
                    <span class="text-sm text-slate-500">/day</span>
                  </div>
                </div>
                <button 
                  @click="rentCar(car)"
                  class="relative overflow-hidden px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-lg group/btn"
                >
                  <span class="relative z-10 group-hover/btn:text-slate-900 transition-colors duration-300">Rent Now</span>
                  <div class="absolute inset-0 bg-blue-500 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results / Initial State -->
      <div v-else class="text-center py-20">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="bi bi-car-front text-4xl text-slate-300"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">No cars found</h3>
          <p class="text-slate-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
          <button @click="clearSearch" class="text-blue-600 font-semibold hover:underline">Reset Search</button>
        </div>
      </div>

    </div>

    <!-- Toast Notification -->
    <Transition name="slide-fade">
      <div v-if="showSuccessToast" class="fixed bottom-6 right-6 z-50">
        <div class="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-slate-700">
          <div class="bg-green-500 rounded-full p-1">
            <i class="bi bi-check-lg text-sm"></i>
          </div>
          <div>
            <p class="font-bold">Added to Cart</p>
            <p class="text-sm text-slate-400">Your car has been booked!</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const searchParams = ref({
  pickupLocation: '',
  pickupDate: '',
  returnDate: '',
  carType: '',
  transmission: ''
})

const cars = ref([])
const loading = ref(false)
const hasSearched = ref(false)
const showSuccessToast = ref(false)

// Mock Data
const mockCars = [
  {
    id: 1, model: 'Toyota Camry', company: 'Hertz', type: 'economy', seats: 5, bags: 2, transmission: 'Automatic', fuel: 'Petrol', price: 45, originalPrice: 60, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', unlimitedMiles: true, freeCancellation: true, discount: 25
  },
  {
    id: 2, model: 'BMW X5', company: 'Enterprise', type: 'suv', seats: 7, bags: 4, transmission: 'Automatic', fuel: 'Diesel', price: 89, originalPrice: 100, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', unlimitedMiles: true, freeCancellation: false, discount: 11
  },
  {
    id: 3, model: 'Ford Mustang', company: 'Avis', type: 'convertible', seats: 4, bags: 2, transmission: 'Manual', fuel: 'Petrol', price: 120, originalPrice: null, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', unlimitedMiles: false, freeCancellation: true, discount: 0
  },
  {
    id: 4, model: 'Mercedes E-Class', company: 'Budget', type: 'luxury', seats: 5, bags: 3, transmission: 'Automatic', fuel: 'Petrol', price: 99, originalPrice: 120, image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', unlimitedMiles: true, freeCancellation: true, discount: 17
  }
]

onMounted(() => {
  // Set default dates
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const later = new Date(today)
  later.setDate(later.getDate() + 4)

  searchParams.value.pickupDate = tomorrow.toISOString().split('T')[0]
  searchParams.value.returnDate = later.toISOString().split('T')[0]
})

const handleSearch = async () => {
  if (!searchParams.value.pickupLocation.trim()) return
  
  loading.value = true
  hasSearched.value = true
  
  // Simulate API
  await new Promise(r => setTimeout(r, 1200))
  
  cars.value = mockCars
  loading.value = false
}

const sortByPrice = () => {
  cars.value.sort((a, b) => a.price - b.price)
}

const rentCar = (car) => {
  console.log('Renting car:', car.model)
  showSuccessToast.value = true
  setTimeout(() => {
    showSuccessToast.value = false
  }, 3000)
}

const clearSearch = () => {
  cars.value = []
  hasSearched.value = false
}
</script>