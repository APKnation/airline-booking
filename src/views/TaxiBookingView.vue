<template>
  <div class="taxi-page bg-light min-vh-100">
    <!-- Hero Section -->
    <div class="hero-section bg-primary text-white py-6">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-3">Book a Taxi</h1>
            <p class="lead mb-4">Get a ride in minutes. Enter your details for instant fare estimates.</p>
            <div class="d-flex align-items-center">
              <div class="me-4">
                <i class="bi bi-clock-fill fs-4"></i>
                <div class="small">Quick Pickup</div>
              </div>
              <div class="me-4">
                <i class="bi bi-shield-check fs-4"></i>
                <div class="small">Safe Rides</div>
              </div>
              <div>
                <i class="bi bi-cash-coin fs-4"></i>
                <div class="small">Best Prices</div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop" 
                 alt="Taxi" 
                 class="img-fluid rounded-3 shadow">
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container py-5">
      <!-- Booking Form -->
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-body p-4 p-lg-5">
              <h2 class="h4 fw-bold mb-4">
                <i class="bi bi-pin-map text-primary me-2"></i>
                Where would you like to go?
              </h2>

              <form @submit.prevent="handleSearch">
                <!-- Locations -->
                <div class="row g-4 mb-4">
                  <div class="col-12">
                    <div class="location-input-group">
                      <div class="location-input mb-3">
                        <label class="form-label text-muted small mb-2">Pickup Location</label>
                        <div class="input-group">
                          <span class="input-group-text bg-white border-end-0">
                            <i class="bi bi-geo-alt text-primary"></i>
                          </span>
                          <input
                            type="text"
                            class="form-control border-start-0 ps-0"
                            v-model="searchParams.pickup"
                            placeholder="Enter pickup address"
                            required
                          >
                        </div>
                      </div>
                      
                      <div class="location-swap text-center my-2">
                        <button type="button" class="btn btn-outline-secondary btn-sm rounded-circle" @click="swapLocations">
                          <i class="bi bi-arrow-down-up"></i>
                        </button>
                      </div>
                      
                      <div class="location-input">
                        <label class="form-label text-muted small mb-2">Destination</label>
                        <div class="input-group">
                          <span class="input-group-text bg-white border-end-0">
                            <i class="bi bi-geo-alt-fill text-primary"></i>
                          </span>
                          <input
                            type="text"
                            class="form-control border-start-0 ps-0"
                            v-model="searchParams.dropoff"
                            placeholder="Where to?"
                            required
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Quick Locations -->
                <div class="mb-4">
                  <div class="text-muted small mb-2">Popular routes:</div>
                  <div class="d-flex flex-wrap gap-2">
                    <button
                      type="button"
                      v-for="route in quickRoutes"
                      :key="route.id"
                      class="btn btn-outline-primary btn-sm"
                      @click="setQuickRoute(route)"
                    >
                      <i class="bi" :class="route.icon"></i>
                      {{ route.label }}
                    </button>
                  </div>
                </div>

                <!-- Date & Time -->
                <div class="row g-4 mb-4">
                  <div class="col-md-6">
                    <label class="form-label text-muted small mb-2">Pickup Date</label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="searchParams.date"
                      :min="getTodayDate()"
                      required
                    >
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-muted small mb-2">Pickup Time</label>
                    <input
                      type="time"
                      class="form-control"
                      v-model="searchParams.time"
                      required
                    >
                  </div>
                </div>

                <!-- Ride Type Selection -->
                <div class="mb-4">
                  <div class="text-muted small mb-2">Choose your ride:</div>
                  <div class="ride-types">
                    <div class="row g-2">
                      <div class="col-6 col-md-3" v-for="type in rideTypes" :key="type.id">
                        <div
                          class="ride-type-card text-center p-3 rounded-3"
                          :class="{ 'selected': searchParams.type === type.id }"
                          @click="selectRideType(type.id)"
                        >
                          <i :class="[type.icon, 'fs-3 mb-2', type.color]"></i>
                          <div class="fw-semibold mb-1">{{ type.name }}</div>
                          <div class="text-muted small">From ${{ type.price }}/km</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Passengers & Luggage -->
                <div class="row g-4 mb-4">
                  <div class="col-md-6">
                    <div class="counter-group">
                      <div class="text-muted small mb-2">Passengers</div>
                      <div class="d-flex align-items-center">
                        <button
                          type="button"
                          class="btn btn-outline-secondary rounded-start"
                          @click="adjustPassengers(-1)"
                          :disabled="searchParams.passengers <= 1"
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                        <div class="px-4 py-2 bg-white border-top border-bottom">
                          <span class="fw-bold fs-5">{{ searchParams.passengers }}</span>
                        </div>
                        <button
                          type="button"
                          class="btn btn-outline-secondary rounded-end"
                          @click="adjustPassengers(1)"
                          :disabled="searchParams.passengers >= 6"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="counter-group">
                      <div class="text-muted small mb-2">Luggage</div>
                      <div class="d-flex align-items-center">
                        <button
                          type="button"
                          class="btn btn-outline-secondary rounded-start"
                          @click="adjustLuggage(-1)"
                          :disabled="searchParams.luggage <= 0"
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                        <div class="px-4 py-2 bg-white border-top border-bottom">
                          <span class="fw-bold fs-5">{{ searchParams.luggage }}</span>
                        </div>
                        <button
                          type="button"
                          class="btn btn-outline-secondary rounded-end"
                          @click="adjustLuggage(1)"
                          :disabled="searchParams.luggage >= 4"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="mt-4">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg w-100 py-3"
                    :disabled="loading || !isFormValid"
                  >
                    <template v-if="loading">
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Finding rides...
                    </template>
                    <template v-else>
                      <i class="bi bi-search me-2"></i>
                      Find Rides
                    </template>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;"></div>
        <h4 class="text-primary">Finding available rides...</h4>
      </div>

      <div v-else-if="rides.length" class="mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="h5 fw-bold mb-0">
            Available Rides ({{ rides.length }})
          </h3>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-primary" @click="sortRides('price')">
              <i class="bi bi-sort-down"></i> Price
            </button>
            <button class="btn btn-sm btn-outline-primary" @click="sortRides('time')">
              <i class="bi bi-clock"></i> ETA
            </button>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-12 col-md-6 col-lg-4" v-for="ride in rides" :key="ride.id">
            <a href="#" class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl md:flex-row md:max-w-xl ride-card">
              <!-- Ride Icon/Image -->
              <div class="w-full h-32 md:h-auto md:w-32 mb-4 md:mb-0 flex items-center justify-center bg-neutral-secondary-medium rounded-base">
                <i :class="[getRideIcon(ride.type), 'text-4xl text-heading']"></i>
              </div>
              
              <div class="flex flex-col justify-between md:p-4 leading-normal flex-1">
                <!-- Header Section -->
                <div class="mb-4">
                  <div class="flex justify-between items-start mb-2">
                    <h5 class="text-2xl font-bold tracking-tight text-heading">
                      {{ ride.type }}
                    </h5>
                    <span class="px-3 py-1 bg-neutral-secondary-medium text-body rounded-full text-sm font-semibold">
                      <i class="bi bi-clock me-1"></i>
                      {{ ride.eta }} min
                    </span>
                  </div>
                  
                  <div class="text-body mb-3">{{ ride.provider }}</div>
                  
                  <!-- Ride Details -->
                  <div class="mb-3">
                    <div class="flex items-center text-body text-sm mb-1">
                      <i class="bi bi-geo-alt me-2"></i>
                      <span>{{ ride.pickup }}</span>
                    </div>
                    <div class="flex items-center text-body text-sm">
                      <i class="bi bi-geo-alt-fill me-2"></i>
                      <span>{{ ride.dropoff }}</span>
                    </div>
                  </div>

                  <div class="flex justify-between text-body text-sm mb-3">
                    <span><i class="bi bi-speedometer2 me-1"></i> {{ ride.distance }} km</span>
                    <span><i class="bi bi-clock-history me-1"></i> {{ ride.duration }} min</span>
                    <span><i class="bi bi-people me-1"></i> {{ ride.capacity }}</span>
                  </div>

                  <!-- Features -->
                  <div class="mb-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="feature in ride.features" :key="feature" class="px-2 py-1 bg-neutral-secondary-medium text-body rounded-full text-xs font-semibold">
                        {{ feature }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Footer with Price and Button -->
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-body text-sm">Estimated Fare</div>
                    <div class="flex items-center">
                      <span class="text-2xl font-bold text-heading">${{ ride.price }}</span>
                      <span v-if="ride.discount" class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold ms-2">
                        -${{ ride.discount }}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    class="inline-flex items-center w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                    @click="bookRide(ride)"
                  >
                    Book
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

      <div v-else-if="hasSearched" class="text-center py-5">
        <div class="mb-4">
          <i class="bi bi-taxi-front display-1 text-muted opacity-25"></i>
        </div>
        <h4 class="mb-3">No rides available</h4>
        <p class="text-muted mb-4">Try different locations or time</p>
        <button class="btn btn-primary" @click="clearSearch">
          <i class="bi bi-arrow-clockwise me-2"></i>
          Clear Search
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaxiBookingView',
  
  data() {
    return {
      searchParams: {
        pickup: '',
        dropoff: '',
        date: this.getTodayDate(),
        time: this.getNextHour(),
        type: 'sedan',
        passengers: 1,
        luggage: 0
      },
      rides: [],
      loading: false,
      hasSearched: false,
      
      quickRoutes: [
        { id: 1, label: 'Airport → City', pickup: 'Airport', dropoff: 'Downtown', icon: 'bi-airplane' },
        { id: 2, label: 'Hotel → Airport', pickup: 'Hotel', dropoff: 'Airport', icon: 'bi-building' },
        { id: 3, label: 'Station → Mall', pickup: 'Train Station', dropoff: 'Shopping Mall', icon: 'bi-train' }
      ],
      
      rideTypes: [
        { id: 'economy', name: 'Economy', icon: 'bi-car-front', color: 'text-success', price: 1.5 },
        { id: 'sedan', name: 'Sedan', icon: 'bi-car-front-fill', color: 'text-primary', price: 2.0 },
        { id: 'suv', name: 'SUV', icon: 'bi-truck', color: 'text-warning', price: 2.5 },
        { id: 'luxury', name: 'Luxury', icon: 'bi-stars', color: 'text-purple', price: 3.5 }
      ],
      
      mockRides: [
        {
          id: 1,
          type: 'Economy',
          provider: 'UberX',
          eta: 5,
          pickup: 'City Center',
          dropoff: 'Airport',
          distance: 15,
          duration: 25,
          capacity: 4,
          price: 22.50,
          features: ['AC', 'WiFi'],
          discount: 2.50
        },
        {
          id: 2,
          type: 'Sedan',
          provider: 'Lyft',
          eta: 7,
          pickup: 'Hotel Grand',
          dropoff: 'Mall',
          distance: 8,
          duration: 15,
          capacity: 4,
          price: 18.75,
          features: ['Premium', 'AC'],
          discount: 0
        },
        {
          id: 3,
          type: 'SUV',
          provider: 'UberXL',
          eta: 10,
          pickup: 'Station',
          dropoff: 'Resort',
          distance: 20,
          duration: 30,
          capacity: 6,
          price: 32.90,
          features: ['Spacious', 'WiFi'],
          discount: 3.10
        }
      ]
    }
  },
  
  computed: {
    isFormValid() {
      return this.searchParams.pickup.trim() && 
             this.searchParams.dropoff.trim() &&
             this.searchParams.date &&
             this.searchParams.time
    }
  },
  
  methods: {
    getTodayDate() {
      return new Date().toISOString().split('T')[0]
    },
    
    getNextHour() {
      const now = new Date()
      now.setHours(now.getHours() + 1)
      return now.toTimeString().slice(0, 5)
    },
    
    adjustPassengers(change) {
      const newValue = this.searchParams.passengers + change
      if (newValue >= 1 && newValue <= 6) {
        this.searchParams.passengers = newValue
      }
    },
    
    adjustLuggage(change) {
      const newValue = this.searchParams.luggage + change
      if (newValue >= 0 && newValue <= 4) {
        this.searchParams.luggage = newValue
      }
    },
    
    selectRideType(type) {
      this.searchParams.type = type
    },
    
    swapLocations() {
      [this.searchParams.pickup, this.searchParams.dropoff] = 
      [this.searchParams.dropoff, this.searchParams.pickup]
    },
    
    setQuickRoute(route) {
      this.searchParams.pickup = route.pickup
      this.searchParams.dropoff = route.dropoff
    },
    
    async handleSearch() {
      if (!this.isFormValid) {
        alert('Please enter both pickup and destination locations')
        return
      }
      
      this.loading = true
      this.hasSearched = true
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Filter by selected ride type
      this.rides = this.mockRides.filter(ride => 
        ride.type.toLowerCase() === this.searchParams.type
      )
      
      this.loading = false
    },
    
    getRideIcon(type) {
      const icons = {
        'Economy': 'bi-car-front text-success',
        'Sedan': 'bi-car-front-fill text-primary',
        'SUV': 'bi-truck text-warning',
        'Luxury': 'bi-stars text-purple'
      }
      return icons[type] || 'bi-taxi-front text-secondary'
    },
    
    sortRides(criteria) {
      if (criteria === 'price') {
        this.rides.sort((a, b) => a.price - b.price)
      } else {
        this.rides.sort((a, b) => a.eta - b.eta)
      }
    },
    
    bookRide(ride) {
      // Add to booking store
      const store = this.$pinia?.stores?.booking || {
        addToCart: (item) => {
          const cart = JSON.parse(localStorage.getItem('cart') || '[]')
          cart.push(item)
          localStorage.setItem('cart', JSON.stringify(cart))
        }
      }
      
      store.addToCart({
        type: 'taxi',
        name: `${ride.provider} - ${ride.type}`,
        price: ride.price,
        rideDetails: ride,
        pickup: this.searchParams.pickup,
        dropoff: this.searchParams.dropoff,
        date: this.searchParams.date,
        time: this.searchParams.time
      })
      
      // Show success feedback
      alert(`${ride.type} ride booked successfully!`)
    },
    
    clearSearch() {
      this.searchParams = {
        pickup: '',
        dropoff: '',
        date: this.getTodayDate(),
        time: this.getNextHour(),
        type: 'sedan',
        passengers: 1,
        luggage: 0
      }
      this.rides = []
      this.hasSearched = false
    }
  },
  
  mounted() {
    console.log('Taxi page loaded')
  }
}
</script>

<style scoped>
.taxi-page {
  padding-bottom: 3rem;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Form Styling */
.card {
  border-radius: 1rem;
  border: 1px solid rgba(0,0,0,0.05);
}

.location-input-group {
  position: relative;
}

.location-swap {
  position: relative;
  z-index: 1;
}

.location-swap .btn {
  width: 40px;
  height: 40px;
  padding: 0;
}

/* Ride Type Cards */
.ride-type-card {
  cursor: pointer;
  border: 2px solid #e9ecef;
  transition: all 0.2s ease;
  background: white;
}

.ride-type-card:hover {
  border-color: #4dabf7;
  transform: translateY(-2px);
}

.ride-type-card.selected {
  border-color: #0d6efd;
  background: rgba(13, 110, 253, 0.05);
}

/* Ride Cards */
.ride-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.ride-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Counter Buttons */
.counter-group .btn {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom Colors */
.text-purple {
  color: #6f42c1;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
  
  .ride-types .col-md-3 {
    margin-bottom: 0.5rem;
  }
}
</style>