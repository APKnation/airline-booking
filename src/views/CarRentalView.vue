<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Hero Header -->
    <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20"></div>
        <div class="h-full w-full bg-[url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"></div>
      </div>
      
      <div class="relative container mx-auto px-4 py-16 lg:py-24">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <i class="bi bi-lightning-charge-fill text-yellow-300"></i>
              <span class="text-sm font-semibold">Premium Car Rental Service</span>
            </div>
            
            <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Rent a Car,<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Your Way</span>
            </h1>
            
            <p class="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
              Choose from hundreds of premium cars, from economy to luxury. 
              Pick up anywhere, drop off anywhere. Your journey starts here.
            </p>
            
            <div class="flex flex-wrap gap-3 mb-8">
              <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i class="bi bi-lightning-charge-fill text-yellow-300"></i>
                <span class="font-medium">Instant Booking</span>
              </div>
              <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i class="bi bi-shield-check text-green-300"></i>
                <span class="font-medium">Full Insurance</span>
              </div>
              <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i class="bi bi-coin text-yellow-300"></i>
                <span class="font-medium">Best Price</span>
              </div>
            </div>
            
            <div class="flex gap-4">
              <button @click="scrollToSearch" class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <i class="bi bi-search me-2"></i>
                Find Your Car
              </button>
              <button class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
                <i class="bi bi-play-circle me-2"></i>
                Watch Demo
              </button>
            </div>
          </div>
          
          <div class="relative">
            <div class="relative z-10">
              <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Car Rental" 
                   class="rounded-3xl shadow-2xl w-full">
            </div>
            <div class="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 z-20">
              <div class="flex items-center gap-3">
                <div class="bg-green-100 p-3 rounded-full">
                  <i class="bi bi-check-circle-fill text-green-600 text-xl"></i>
                </div>
                <div>
                  <p class="font-bold text-gray-900">4.8/5 Rating</p>
                  <p class="text-sm text-gray-600">2,500+ Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Form -->
    <div class="container mx-auto px-4 -mt-8 relative z-30">
      <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        <div class="flex items-center gap-3 mb-8">
          <div class="bg-blue-100 p-3 rounded-xl">
            <i class="bi bi-search text-blue-600 text-xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">Find Your Perfect Car</h2>
        </div>
        
        <form @submit.prevent="handleSearch" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Pick-up Location -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="bi bi-geo-alt text-blue-600 me-2"></i>Pick-up Location
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="bi bi-pin-map text-gray-400"></i>
                </div>
                <input 
                  type="text" 
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  v-model="searchParams.pickupLocation"
                  placeholder="City or Airport"
                  required
                >
              </div>
            </div>

            <!-- Drop-off Location -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="bi bi-geo-alt-fill text-blue-600 me-2"></i>Drop-off Location
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="bi bi-pin-map-fill text-gray-400"></i>
                </div>
                <input 
                  type="text" 
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  v-model="searchParams.dropoffLocation"
                  placeholder="Same as pick-up"
                >
              </div>
            </div>

            <!-- Pick-up Date -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="bi bi-calendar-plus text-blue-600 me-2"></i>Pick-up Date
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="bi bi-calendar-check text-gray-400"></i>
                </div>
                <input 
                  type="date" 
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  v-model="searchParams.pickupDate"
                  :min="getTodayDate()"
                  required
                >
              </div>
            </div>

            <!-- Return Date -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="bi bi-calendar-minus text-blue-600 me-2"></i>Return Date
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="bi bi-calendar-x text-gray-400"></i>
                </div>
                <input 
                  type="date" 
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  v-model="searchParams.returnDate"
                  :min="searchParams.pickupDate"
                  required
                >
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Car Type -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="bi bi-car-front text-blue-600 me-2"></i>Car Type
              </label>
              <select class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" v-model="searchParams.carType">
                <option value="">All Types</option>
                <option value="economy">Economy</option>
                <option value="compact">Compact</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
                <option value="van">Van</option>
                <option value="convertible">Convertible</option>
              </select>
            </div>

            <!-- Transmissions -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                <i class="bi bi-gear text-blue-600 me-2"></i>Transmission
              </label>
              <select class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" v-model="searchParams.transmission">
                <option value="">Any</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              :disabled="loading"
            >
              <template v-if="loading">
                <div class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching Cars...
                </div>
              </template>
              <template v-else>
                <i class="bi bi-search me-2"></i>
                Search Available Cars
              </template>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Results Section -->
    <div class="container mx-auto px-4 py-12">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
          <svg class="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Finding the perfect car for you...</h3>
        <p class="text-gray-600">We're searching through our premium fleet</p>
      </div>

      <!-- Cars Grid -->
      <div v-else-if="cars.length" class="space-y-8">
        <!-- Results Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              Available Cars
              <span class="inline-block ml-3 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-semibold">{{ cars.length }}</span>
            </h2>
            <p class="text-gray-600">Showing {{ cars.length }} cars matching your search</p>
          </div>
          <div class="flex gap-3">
            <button @click="sortByPrice" class="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium">
              <i class="bi bi-sort-down me-2"></i>
              Sort by Price
            </button>
            <button @click="toggleFilterModal" class="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium">
              <i class="bi bi-funnel me-2"></i>
              Filter
            </button>
          </div>
        </div>

        <!-- Cars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="car in cars" 
            :key="car.id"
            class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
          >
            <!-- Car Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="car.image" 
                :alt="car.model"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >
              <div class="absolute top-4 right-4">
                <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {{ car.type.charAt(0).toUpperCase() + car.type.slice(1) }}
                </span>
              </div>
              <div v-if="car.discount" class="absolute top-4 left-4">
                <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save {{ car.discount }}%
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <!-- Car Info -->
              <div class="mb-4">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold text-gray-900">{{ car.model }}</h3>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-blue-600">${{ car.price }}</div>
                    <div class="text-sm text-gray-500">/day</div>
                  </div>
                </div>
                <p class="text-gray-600 mb-3">{{ car.company }}</p>
                
                <!-- Car Features -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div class="flex items-center text-gray-600 text-sm">
                    <i class="bi bi-people text-blue-600 me-2"></i>
                    {{ car.seats }} Seats
                  </div>
                  <div class="flex items-center text-gray-600 text-sm">
                    <i class="bi bi-briefcase text-blue-600 me-2"></i>
                    {{ car.bags }} Bags
                  </div>
                  <div class="flex items-center text-gray-600 text-sm">
                    <i class="bi bi-gear text-blue-600 me-2"></i>
                    {{ car.transmission }}
                  </div>
                  <div class="flex items-center text-gray-600 text-sm">
                    <i class="bi bi-fuel-pump text-blue-600 me-2"></i>
                    {{ car.fuel }}
                  </div>
                </div>
                
                <!-- Additional Features -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-if="car.ac" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    <i class="bi bi-snow me-1"></i>A/C
                  </span>
                  <span v-if="car.unlimitedMiles" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <i class="bi bi-speedometer me-1"></i>Unlimited Miles
                  </span>
                  <span v-if="car.freeCancellation" class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    <i class="bi bi-x-circle me-1"></i>Free Cancellation
                  </span>
                </div>
              </div>

              <!-- Footer -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <small v-if="car.estimatedTotal" class="text-green-600 text-sm font-medium">
                    <i class="bi bi-check-circle me-1"></i>
                    Est. Total: ${{ car.estimatedTotal }}
                  </small>
                </div>
                
                <button 
                  @click="rentCar(car)"
                  class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Rent Now
                  <i class="bi bi-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="hasSearched" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="bi bi-car-front text-4xl text-gray-400"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">No cars available</h3>
          <p class="text-gray-600 mb-6">
            Try adjusting your search criteria or dates to find available cars
          </p>
          <button @click="clearSearch" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
            <i class="bi bi-arrow-clockwise me-2"></i>
            Clear Search
          </button>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-16">
        <div class="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div class="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <i class="bi bi-car-front-fill text-5xl text-blue-600"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Ready to hit the road?</h3>
          <p class="text-xl text-gray-600 mb-8">
            Use the search form above to find cars that match your travel plans. 
            We'll show you the best available options with photos, features, and prices.
          </p>
          <button @click="scrollToSearch" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200 text-lg">
            <i class="bi bi-search me-2"></i>
            Start Searching
          </button>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="showSuccessToast" class="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div class="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
        <div class="bg-green-600 p-2 rounded-full">
          <i class="bi bi-check-circle-fill text-xl"></i>
        </div>
        <div>
          <p class="font-bold">Success!</p>
          <p class="text-sm">Car added to your cart!</p>
        </div>
        <button @click="showSuccessToast = false" class="ml-4 text-white hover:text-gray-200">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarRentalView',
  
  data() {
    return {
      searchParams: {
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: this.getTomorrowDate(),
        returnDate: this.getThreeDaysLaterDate(),
        carType: '',
        transmission: ''
      },
      cars: [],
      loading: false,
      hasSearched: false,
      showSuccessToast: false,
      
      // Mock data
      mockCars: [
        {
          id: 1,
          model: 'Toyota Camry',
          company: 'Hertz',
          type: 'economy',
          seats: 5,
          bags: 2,
          transmission: 'Automatic',
          fuel: 'Petrol',
          price: 45,
          image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          ac: true,
          unlimitedMiles: true,
          freeCancellation: true,
          discount: 10,
          estimatedTotal: 180
        },
        {
          id: 2,
          model: 'BMW X5',
          company: 'Enterprise',
          type: 'suv',
          seats: 7,
          bags: 4,
          transmission: 'Automatic',
          fuel: 'Diesel',
          price: 89,
          image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          ac: true,
          unlimitedMiles: true,
          freeCancellation: true,
          discount: 15,
          estimatedTotal: 356
        },
        {
          id: 3,
          model: 'Ford Mustang',
          company: 'Avis',
          type: 'convertible',
          seats: 4,
          bags: 2,
          transmission: 'Manual',
          fuel: 'Petrol',
          price: 120,
          image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          ac: true,
          unlimitedMiles: false,
          freeCancellation: false,
          discount: 5,
          estimatedTotal: 480
        },
        {
          id: 4,
          model: 'Mercedes E-Class',
          company: 'Budget',
          type: 'luxury',
          seats: 5,
          bags: 3,
          transmission: 'Automatic',
          fuel: 'Petrol',
          price: 99,
          image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          ac: true,
          unlimitedMiles: true,
          freeCancellation: true,
          discount: 20,
          estimatedTotal: 396
        },
        {
          id: 5,
          model: 'Honda Civic',
          company: 'National',
          type: 'compact',
          seats: 5,
          bags: 2,
          transmission: 'Automatic',
          fuel: 'Hybrid',
          price: 38,
          image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          ac: true,
          unlimitedMiles: true,
          freeCancellation: true,
          discount: 0,
          estimatedTotal: 152
        },
        {
          id: 6,
          model: 'Toyota Sienna',
          company: 'Alamo',
          type: 'van',
          seats: 8,
          bags: 6,
          transmission: 'Automatic',
          fuel: 'Petrol',
          price: 75,
          image: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
          ac: true,
          unlimitedMiles: true,
          freeCancellation: false,
          discount: 12,
          estimatedTotal: 300
        }
      ]
    }
  },
  
  methods: {
    getTodayDate() {
      return new Date().toISOString().split('T')[0]
    },
    
    getTomorrowDate() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    },
    
    getThreeDaysLaterDate() {
      const threeDaysLater = new Date()
      threeDaysLater.setDate(threeDaysLater.getDate() + 3)
      return threeDaysLater.toISOString().split('T')[0]
    },
    
    async handleSearch() {
      if (!this.searchParams.pickupLocation.trim()) {
        alert('Please enter a pickup location')
        return
      }
      
      this.loading = true
      this.hasSearched = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Filter mock cars based on search
      this.cars = this.mockCars.filter(car => {
        if (this.searchParams.carType && car.type !== this.searchParams.carType) {
          return false
        }
        if (this.searchParams.transmission && car.transmission.toLowerCase() !== this.searchParams.transmission.toLowerCase()) {
          return false
        }
        return true
      })
      
      this.loading = false
    },
    
    rentCar(car) {
      // Add to cart store
      const bookingStore = this.$pinia?.stores?.booking || {
        addToCart: (item) => {
          console.log('Adding to cart:', item)
          const cart = JSON.parse(localStorage.getItem('cart') || '[]')
          cart.push(item)
          localStorage.setItem('cart', JSON.stringify(cart))
        }
      }
      
      bookingStore.addToCart({
        type: 'car',
        name: `${car.company} ${car.model}`,
        price: car.price,
        carDetails: car,
        days: 4, // Based on search dates
        total: car.estimatedTotal || car.price * 4,
        id: Date.now().toString()
      })
      
      // Show success message
      this.showSuccessToast = true
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        this.showSuccessToast = false
      }, 3000)
    },
    
    clearSearch() {
      this.searchParams = {
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: this.getTomorrowDate(),
        returnDate: this.getThreeDaysLaterDate(),
        carType: '',
        transmission: ''
      }
      this.cars = []
      this.hasSearched = false
    },
    
    sortByPrice() {
      this.cars.sort((a, b) => a.price - b.price)
    },
    
    toggleFilterModal() {
      alert('Filter modal would open here')
    },
    
    scrollToSearch() {
      const searchForm = document.querySelector('.bg-white.rounded-3xl.shadow-2xl')
      if (searchForm) {
        searchForm.scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
  
  mounted() {
    console.log('CarRentalView mounted')
    
    // Set default dates
    this.searchParams.pickupDate = this.getTomorrowDate()
    this.searchParams.returnDate = this.getThreeDaysLaterDate()
  }
}
</script>

<style scoped>
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}
</style>

