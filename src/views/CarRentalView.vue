I suggest a **"Modern Tile Dashboard"** design.

**Design Concept:**
Instead of the traditional long-form search bar, this design treats search inputs as distinct, interactive "tiles" or "widgets." This creates a dashboard-like feel where the user feels they are configuring their trip step-by-step.

**Key Features:**
1.  **The "Tile" Interface:** The search inputs are separated into square-ish, compact cards with icons at the top, labels in the middle, and values at the bottom. This makes the form feel less like paperwork and more like an app interface.
2.  **Visual Hierarchy:** The Hero section is cleaner, focusing on a strong headline and a background abstract shape design rather than a competing photo.
3.  **Result Cards:** The car cards use a "Gallery" style—taller images with a floating price tag and a sliding "Book Now" panel that appears on hover.

Here is the complete code:

```vue
<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    
    <!-- Modern Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
            <i class="bi bi-car-front-fill text-white text-xl"></i>
          </div>
          <span class="text-xl font-bold text-slate-800">RideX</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" class="hover:text-blue-600 transition-colors">Fleet</a>
          <a href="#" class="hover:text-blue-600 transition-colors">Locations</a>
          <a href="#" class="hover:text-blue-600 transition-colors">Support</a>
          <button class="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-colors shadow-lg">
            Sign In
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section with Abstract Design -->
    <section class="relative bg-white overflow-hidden">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent -skew-x-12 transform translate-x-20"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full -mb-48 -ml-48 opacity-50 blur-3xl"></div>
      
      <div class="container mx-auto px-4 pt-16 pb-24 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
            Premium Car Rental
          </span>
          <h1 class="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-6">
            Drive Your <span class="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-500">Dreams</span> Today
          </h1>
          <p class="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Choose from our exclusive collection of premium vehicles. Transparent pricing, zero hidden fees.
          </p>
        </div>
      </div>
    </section>

    <!-- Search Configuration Tiles -->
    <section class="relative z-20 -mt-12 px-4 mb-16">
      <div class="max-w-5xl mx-auto">
        <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 md:p-6">
          <form @submit.prevent="handleSearch" class="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            
            <!-- Tile 1: Location -->
            <div class="col-span-2 md:col-span-1 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl p-4 cursor-pointer group relative h-36 flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-blue-300 transition-colors">
                  <i class="bi bi-pin-map-fill text-blue-600"></i>
                </div>
                <button type="button" class="text-slate-300 hover:text-blue-600 transition-colors">
                  <i class="bi bi-crosshair"></i>
                </button>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</label>
                <input 
                  type="text" 
                  v-model="searchParams.pickupLocation"
                  class="w-full bg-transparent border-0 p-0 text-slate-900 font-bold text-lg focus:ring-0 placeholder-slate-300"
                  placeholder="City or Airport"
                  required
                >
              </div>
              <!-- Decoration -->
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-50 rotate-45 md:hidden group-hover:bg-slate-100"></div>
            </div>

            <!-- Tile 2: Pickup Date -->
            <div class="bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl p-4 cursor-pointer group h-36 flex flex-col justify-between border-t md:border-t-0 border-slate-200 md:border-0">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-blue-300 transition-colors">
                <i class="bi bi-calendar-event text-blue-600"></i>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pick-up</label>
                <input 
                  type="date" 
                  v-model="searchParams.pickupDate"
                  class="w-full bg-transparent border-0 p-0 text-slate-900 font-bold text-sm focus:ring-0"
                  required
                >
              </div>
            </div>

            <!-- Tile 3: Return Date -->
            <div class="bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl p-4 cursor-pointer group h-36 flex flex-col justify-between border-t md:border-t-0 border-slate-200 md:border-0">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200 group-hover:border-blue-300 transition-colors">
                <i class="bi bi-calendar-check text-blue-600"></i>
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Return</label>
                <input 
                  type="date" 
                  v-model="searchParams.returnDate"
                  :min="searchParams.pickupDate"
                  class="w-full bg-transparent border-0 p-0 text-slate-900 font-bold text-sm focus:ring-0"
                  required
                >
              </div>
            </div>

            <!-- Tile 4: Search Action -->
            <div class="col-span-2 md:col-span-1 h-36 flex flex-col justify-center items-center">
              <button 
                type="submit" 
                class="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-400/20 hover:shadow-blue-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-1"
                :disabled="loading"
              >
                <i class="bi bi-search text-xl"></i>
                <span v-if="!loading">Find Cars</span>
                <span v-else>Searching...</span>
              </button>
            </div>

          </form>
          
          <!-- Quick Filters -->
          <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
             <span class="text-xs text-slate-400 font-medium px-1">Popular:</span>
             <button type="button" @click="searchParams.carType='suv'" class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">SUV</button>
             <button type="button" @click="searchParams.carType='luxury'" class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Luxury</button>
             <button type="button" @click="searchParams.transmission='automatic'" class="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors">Automatic</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="container mx-auto px-4 pb-20">
      
      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div v-for="n in 3" :key="n" class="bg-white rounded-3xl h-[400px] overflow-hidden relative">
           <div class="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 animate-shimmer"></div>
         </div>
      </div>

      <!-- Results Grid -->
      <div v-else-if="cars.length">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">Available Vehicles</h2>
            <p class="text-slate-500 text-sm mt-1">{{ cars.length }} vehicles matching your preferences</p>
          </div>
          <div class="flex items-center gap-2">
             <span class="text-xs text-slate-500 font-medium">Sort by:</span>
             <button @click="sortByPrice" class="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">Price</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="car in cars" 
            :key="car.id"
            class="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 relative"
          >
            <!-- Image Section -->
            <div class="relative h-56 bg-slate-100 overflow-hidden">
              <img 
                :src="car.image" 
                :alt="car.model"
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              >
              
              <!-- Top Badges -->
              <div class="absolute top-4 left-4 flex gap-2">
                 <span class="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-white/20">
                   {{ car.type }}
                 </span>
              </div>

              <!-- Price Tag -->
              <div class="absolute top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg flex flex-col items-end">
                 <span class="text-xs font-medium opacity-75">per day</span>
                 <span class="text-xl font-bold">${{ car.price }}</span>
              </div>
              
              <!-- Overlay Gradient -->
              <div class="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <!-- Content Section -->
            <div class="p-5 relative">
              <div class="absolute -top-5 left-5 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100">
                <i class="bi bi-heart text-slate-300 hover:text-red-500 cursor-pointer transition-colors"></i>
              </div>

              <div class="mb-3">
                <h3 class="text-lg font-bold text-slate-900">{{ car.model }}</h3>
                <p class="text-sm text-slate-500">{{ car.company }}</p>
              </div>

              <!-- Specs -->
              <div class="grid grid-cols-4 gap-2 mb-4">
                 <div class="flex items-center gap-1.5 text-slate-500">
                    <i class="bi bi-people text-sm"></i>
                    <span class="text-xs">{{ car.seats }}</span>
                 </div>
                 <div class="flex items-center gap-1.5 text-slate-500">
                    <i class="bi bi-briefcase text-sm"></i>
                    <span class="text-xs">{{ car.bags }}</span>
                 </div>
                 <div class="flex items-center gap-1.5 text-slate-500">
                    <i class="bi bi-gear text-sm"></i>
                    <span class="text-xs">{{ car.transmission.substring(0,4) }}</span>
                 </div>
                 <div class="flex items-center gap-1.5 text-slate-500">
                    <i class="bi bi-snow text-sm"></i>
                    <span class="text-xs">A/C</span>
                 </div>
              </div>

              <!-- CTA -->
              <button 
                @click="rentCar(car)"
                class="w-full bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                Select Car
                <i class="bi bi-arrow-right transition-transform duration-300 group-hover/btn:translate-x-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
          <i class="bi bi-car-front text-3xl text-slate-300"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-800 mb-1">No cars available</h3>
        <p class="text-slate-500 mb-4 text-sm">Try adjusting your search criteria</p>
        <button @click="clearSearch" class="text-blue-600 font-semibold text-sm hover:underline">Clear Filters</button>
      </div>
    </section>

    <!-- Toast Notification -->
    <Transition name="slide-fade">
      <div v-if="showSuccessToast" class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div class="bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
          <div class="bg-green-400 rounded-full p-1">
             <i class="bi bi-check-lg text-slate-900 font-bold"></i>
          </div>
          <span class="font-bold">Vehicle Added to Itinerary</span>
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
    id: 1, model: 'Toyota Camry', company: 'Hertz', type: 'Economy', seats: 5, bags: 2, transmission: 'Automatic', fuel: 'Petrol', price: 45, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2, model: 'BMW X5', company: 'Enterprise', type: 'SUV', seats: 7, bags: 4, transmission: 'Automatic', fuel: 'Diesel', price: 89, image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3, model: 'Ford Mustang', company: 'Avis', type: 'Sport', seats: 4, bags: 2, transmission: 'Manual', fuel: 'Petrol', price: 120, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4, model: 'Mercedes E-Class', company: 'Budget', type: 'Luxury', seats: 5, bags: 3, transmission: 'Automatic', fuel: 'Petrol', price: 99, image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
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

<style scoped>
/* Shimmer effect for skeleton loading */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

/* Custom Transition for Toast */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from {
  transform: translate(-50%, 100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}

/* Remove native date picker icon for cleaner look on some browsers */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.6;
  cursor: pointer;
}
</style>
```