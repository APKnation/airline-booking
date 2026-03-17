<template>
  <div class="car-rental-page">
    <!-- Hero Header -->
    <div class="container-fluid bg-primary bg-gradient py-5 mb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-3 fw-bold text-white mb-4">
              Rent a Car,<br>
              <span class="text-warning">Your Way</span>
            </h1>
            <p class="lead text-white opacity-75 mb-4">
              Choose from hundreds of cars, from economy to luxury. Pick up anywhere, drop off anywhere.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <span class="badge bg-white text-primary px-3 py-2 fw-medium">
                <i class="bi bi-lightning-charge-fill me-2"></i>Instant Booking
              </span>
              <span class="badge bg-white text-primary px-3 py-2 fw-medium">
                <i class="bi bi-shield-check me-2"></i>Full Insurance
              </span>
              <span class="badge bg-white text-primary px-3 py-2 fw-medium">
                <i class="bi bi-coin me-2"></i>Best Price Guarantee
              </span>
            </div>
          </div>
          <div class="col-lg-6 mt-5 mt-lg-0">
            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                 alt="Car Rental" 
                 class="img-fluid rounded-4 shadow-lg">
          </div>
        </div>
      </div>
    </div>

    <!-- Search Form -->
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="card border-0 shadow-lg rounded-4">
            <div class="card-body p-4 p-md-5">
              <div class="d-flex align-items-center mb-4">
                <i class="bi bi-search text-primary fs-4 me-3"></i>
                <h2 class="h3 mb-0 fw-bold">Find Your Perfect Car</h2>
              </div>
              
              <form @submit.prevent="handleSearch" class="row g-3">
                <!-- Pick-up Location -->
                <div class="col-12 col-md-6 col-lg-3">
                  <label for="pickupLocation" class="form-label fw-medium">
                    <i class="bi bi-geo-alt me-2"></i>Pick-up Location
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="bi bi-pin-map text-primary"></i>
                    </span>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="pickupLocation"
                      v-model="searchParams.pickupLocation"
                      placeholder="City or Airport"
                      required
                    >
                  </div>
                </div>

                <!-- Drop-off Location -->
                <div class="col-12 col-md-6 col-lg-3">
                  <label for="dropoffLocation" class="form-label fw-medium">
                    <i class="bi bi-geo-alt-fill me-2"></i>Drop-off Location
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="bi bi-pin-map-fill text-primary"></i>
                    </span>
                    <input 
                      type="text" 
                      class="form-control" 
                      id="dropoffLocation"
                      v-model="searchParams.dropoffLocation"
                      placeholder="Same as pick-up"
                    >
                  </div>
                </div>

                <!-- Pick-up Date -->
                <div class="col-12 col-md-6 col-lg-3">
                  <label for="pickupDate" class="form-label fw-medium">
                    <i class="bi bi-calendar-plus me-2"></i>Pick-up Date
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="bi bi-calendar-check text-primary"></i>
                    </span>
                    <input 
                      type="date" 
                      class="form-control" 
                      id="pickupDate"
                      v-model="searchParams.pickupDate"
                      :min="getTodayDate()"
                      required
                    >
                  </div>
                </div>

                <!-- Return Date -->
                <div class="col-12 col-md-6 col-lg-3">
                  <label for="returnDate" class="form-label fw-medium">
                    <i class="bi bi-calendar-minus me-2"></i>Return Date
                  </label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="bi bi-calendar-x text-primary"></i>
                    </span>
                    <input 
                      type="date" 
                      class="form-control" 
                      id="returnDate"
                      v-model="searchParams.returnDate"
                      :min="searchParams.pickupDate"
                      required
                    >
                  </div>
                </div>

                <!-- Car Type -->
                <div class="col-12 col-md-6">
                  <label for="carType" class="form-label fw-medium">
                    <i class="bi bi-car-front me-2"></i>Car Type
                  </label>
                  <select class="form-select" id="carType" v-model="searchParams.carType">
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
                <div class="col-12 col-md-6">
                  <label for="transmission" class="form-label fw-medium">
                    <i class="bi bi-gear me-2"></i>Transmission
                  </label>
                  <select class="form-select" id="transmission" v-model="searchParams.transmission">
                    <option value="">Any</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>

                <!-- Submit Button -->
                <div class="col-12 mt-4">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg w-100 py-3 fw-bold"
                    :disabled="loading"
                  >
                    <template v-if="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                      Searching Cars...
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
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="row justify-content-center py-5">
        <div class="col-12 text-center">
          <div class="spinner-border text-primary mb-4" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h3 class="h4 text-primary">Finding the perfect car for you...</h3>
        </div>
      </div>

      <!-- Cars Grid -->
      <div v-else-if="cars.length" class="row mb-5">
        <div class="col-12 mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h2 class="display-6 fw-bold mb-0">
                Available Cars
                <span class="badge bg-primary fs-6 ms-2">{{ cars.length }}</span>
              </h2>
              <p class="text-muted mb-0 mt-2">
                Showing {{ cars.length }} cars matching your search
              </p>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-primary" @click="sortByPrice">
                <i class="bi bi-sort-down me-2"></i>
                Sort by Price
              </button>
              <button class="btn btn-outline-primary" @click="toggleFilterModal">
                <i class="bi bi-funnel me-2"></i>
                Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Cars List -->
        <div class="col-12">
          <div class="row g-4">
            <div 
              class="col-12 col-md-6 col-lg-4 col-xl-3" 
              v-for="car in cars" 
              :key="car.id"
            >
              <a href="#" class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl md:flex-row md:max-w-xl car-card">
                <!-- Car Image -->
                <img 
                  class="object-cover w-full rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0" 
                  :src="car.image" 
                  :alt="car.model"
                />
                
                <div class="flex flex-col justify-between md:p-4 leading-normal flex-1">
                  <!-- Header Section -->
                  <div class="mb-4">
                    <div class="flex justify-between items-start mb-2">
                      <h5 class="text-2xl font-bold tracking-tight text-heading">
                        {{ car.model }}
                      </h5>
                      <span class="px-3 py-1 bg-neutral-secondary-medium text-body rounded-full text-sm font-semibold">
                        {{ car.type.charAt(0).toUpperCase() + car.type.slice(1) }}
                      </span>
                    </div>
                    
                    <div class="text-body mb-3">{{ car.company }}</div>
                    
                    <!-- Car Features -->
                    <div class="grid grid-cols-2 gap-2 mb-3">
                      <div class="flex items-center text-body text-sm">
                        <i class="bi bi-people text-primary me-2"></i>
                        {{ car.seats }} Seats
                      </div>
                      <div class="flex items-center text-body text-sm">
                        <i class="bi bi-briefcase text-primary me-2"></i>
                        {{ car.bags }} Bags
                      </div>
                      <div class="flex items-center text-body text-sm">
                        <i class="bi bi-gear text-primary me-2"></i>
                        {{ car.transmission }}
                      </div>
                      <div class="flex items-center text-body text-sm">
                        <i class="bi bi-fuel-pump text-primary me-2"></i>
                        {{ car.fuel }}
                      </div>
                    </div>
                    
                    <!-- Additional Features -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span v-if="car.ac" class="px-2 py-1 bg-neutral-secondary-medium text-body rounded-full text-xs font-semibold">
                        <i class="bi bi-snow me-1"></i>A/C
                      </span>
                      <span v-if="car.unlimitedMiles" class="px-2 py-1 bg-neutral-secondary-medium text-body rounded-full text-xs font-semibold">
                        <i class="bi bi-speedometer me-1"></i>Unlimited Miles
                      </span>
                      <span v-if="car.freeCancellation" class="px-2 py-1 bg-neutral-secondary-medium text-body rounded-full text-xs font-semibold">
                        <i class="bi bi-x-circle me-1"></i>Free Cancellation
                      </span>
                    </div>
                  </div>

                  <!-- Footer with Price and Button -->
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-body text-sm">Daily Rate</div>
                      <div class="flex items-center">
                        <span class="text-2xl font-bold text-heading">${{ car.price }}</span>
                        <span class="text-body ms-1">/day</span>
                      </div>
                      <small v-if="car.estimatedTotal" class="text-green-600 text-xs">
                        <i class="bi bi-check-circle me-1"></i>
                        Est. Total: ${{ car.estimatedTotal }}
                      </small>
                    </div>
                    
                    <div v-if="car.discount" class="text-end me-4">
                      <span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                        Save {{ car.discount }}%
                      </span>
                    </div>
                    
                    <button 
                      type="button" 
                      class="inline-flex items-center w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                      @click="rentCar(car)"
                    >
                      Rent Now
                      <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results / Empty State -->
      <div v-else-if="hasSearched" class="row justify-content-center py-5">
        <div class="col-12 col-md-8 col-lg-6 text-center">
          <div class="mb-4">
            <i class="bi bi-car-front display-1 text-muted opacity-25"></i>
          </div>
          <h3 class="h2 mb-3">No cars available</h3>
          <p class="lead text-muted mb-4">
            Try adjusting your search criteria or dates to find available cars
          </p>
          <button class="btn btn-primary btn-lg px-5" @click="clearSearch">
            <i class="bi bi-arrow-clockwise me-2"></i>
            Clear Search
          </button>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="row justify-content-center py-5">
        <div class="col-12 col-lg-10 text-center">
          <div class="bg-light rounded-4 p-5 p-md-6">
            <div class="mb-4">
              <i class="bi bi-car-front-fill display-1 text-primary"></i>
            </div>
            <h3 class="h2 mb-4">Ready to hit the road?</h3>
            <p class="lead text-muted mb-5">
              Use the search form above to find cars that match your travel plans. 
              We'll show you the best available options with photos, features, and prices.
            </p>
            <button class="btn btn-primary btn-lg px-5" @click="scrollToSearch">
              <i class="bi bi-search me-2"></i>
              Start Searching
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="showSuccessToast" class="position-fixed top-0 end-0 p-3" style="z-index: 11">
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-success text-white">
          <i class="bi bi-check-circle-fill me-2"></i>
          <strong class="me-auto">Success!</strong>
          <button type="button" class="btn-close btn-close-white" @click="showSuccessToast = false"></button>
        </div>
        <div class="toast-body">
          Car added to your cart!
        </div>
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
      const searchForm = document.querySelector('.card.border-0.shadow-lg')
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
.car-rental-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.bg-gradient {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%) !important;
}

.car-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.car-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  border-radius: 1rem 1rem 0 0 !important;
  background-color: #f8f9fa;
}

/* Success Toast Animation */
.toast {
  min-width: 250px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Features badges */
.badge.bg-light {
  transition: all 0.2s ease;
}

.badge.bg-light:hover {
  background-color: #e9ecef !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-3 {
    font-size: 2.5rem !important;
  }
  
  .bg-gradient {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
  
  .input-group-text {
    padding: 0.375rem 0.75rem;
  }
}

/* Form focus effects */
.form-control:focus, .form-select:focus {
  border-color: #4dabf7;
  box-shadow: 0 0 0 0.25rem rgba(77, 171, 247, 0.25);
}

/* Button hover effects */
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

/* Loading spinner animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.spinner-border {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>