<template>
  <div class="hotel-booking-page">
    <!-- Header Section -->
    <div class="container-fluid py-5 bg-primary bg-gradient text-center text-white">
      <i class="bi bi-buildings-fill display-1 mb-3"></i>
      <h1 class="display-4 fw-bold mb-2">Find Your Perfect Stay</h1>
      <p class="lead opacity-75">Discover amazing hotels, resorts, and accommodations for your next journey</p>
    </div>

    <!-- Search Form Section -->
    <div class="container mt-n5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <div class="card shadow-lg rounded-4 border-0">
            <div class="card-body p-4 p-md-5">
              <div class="d-flex align-items-center mb-4">
                <i class="bi bi-search fs-3 text-primary me-3"></i>
                <h2 class="h4 mb-0 fw-bold">Search Hotels</h2>
              </div>

              <!-- Hotel Search Form -->
              <form @submit.prevent="handleSearch" class="row g-3">
                <div class="col-12 col-md-6 col-lg-3">
                  <label for="location" class="form-label fw-semibold">
                    <i class="bi bi-geo-alt me-1"></i> Location
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="location"
                    v-model="searchParams.location"
                    placeholder="Enter a city or hotel"
                    required
                  >
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                  <label for="checkIn" class="form-label fw-semibold">
                    <i class="bi bi-calendar-plus me-1"></i> Check-in
                  </label>
                  <input
                    type="date"
                    class="form-control form-control-lg"
                    id="checkIn"
                    v-model="searchParams.checkIn"
                    required
                  >
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                  <label for="checkOut" class="form-label fw-semibold">
                    <i class="bi bi-calendar-minus me-1"></i> Check-out
                  </label>
                  <input
                    type="date"
                    class="form-control form-control-lg"
                    id="checkOut"
                    v-model="searchParams.checkOut"
                    required
                  >
                </div>

                <div class="col-12 col-md-6 col-lg-3">
                  <label for="guests" class="form-label fw-semibold">
                    <i class="bi bi-people me-1"></i> Guests
                  </label>
                  <select class="form-select form-select-lg" id="guests" v-model="searchParams.guests">
                    <option value="1">1 Guest</option>
                    <option value="2" selected>2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>

                <div class="col-12 mt-3">
                  <button
                    type="submit"
                    class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                    :disabled="loading"
                  >
                    <template v-if="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                      Searching...
                    </template>
                    <template v-else>
                      <i class="bi bi-search me-2"></i> Search Hotels
                    </template>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="container my-5">
      <div class="row justify-content-center">
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary mb-4" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h3 class="h4 text-primary">Finding the best stays for you...</h3>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div v-else-if="hotels.length" class="container my-5">
      <div class="row mb-4">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h2 class="display-6 fw-bold mb-0">
              Available Stays
              <span class="badge bg-primary fs-6 ms-2">{{ hotels.length }}</span>
            </h2>
            <p class="text-muted mb-0 mt-2">
              Showing results for {{ searchParams.location || 'your search' }}
            </p>
          </div>
          <button class="btn btn-outline-primary" @click="toggleFilters">
            <i class="bi bi-funnel me-2"></i>
            Filter
          </button>
        </div>
      </div>

      <!-- Hotels Grid -->
      <div class="row g-4">
        <div 
          class="col-12 col-md-6 col-lg-4 col-xl-3" 
          v-for="hotel in hotels" 
          :key="hotel.id"
        >
          <div class="card h-100 border-0 shadow-sm hotel-card">
            <!-- Hotel Image -->
            <div class="position-relative">
              <img 
                :src="hotel.image" 
                class="card-img-top"
                :alt="hotel.name"
                style="height: 200px; object-fit: cover;"
              >
              
              <!-- Rating Badge -->
              <div v-if="hotel.rating" class="position-absolute top-0 start-0 m-3">
                <span class="badge bg-warning text-dark px-3 py-2">
                  <i class="bi bi-star-fill me-1"></i>
                  {{ hotel.rating }}
                </span>
              </div>
              
              <!-- Discount Badge -->
              <div v-if="hotel.discount" class="position-absolute top-0 end-0 m-3">
                <span class="badge bg-danger px-3 py-2">
                  -{{ hotel.discount }}%
                </span>
              </div>
            </div>

            <!-- Hotel Content -->
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold mb-2">{{ hotel.name }}</h5>
              
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-geo-alt text-primary me-2"></i>
                <small class="text-muted">{{ hotel.location }}</small>
              </div>

              <!-- Amenities -->
              <div v-if="hotel.amenities?.length" class="mb-4">
                <p class="text-muted small mb-2">Amenities</p>
                <div class="d-flex flex-wrap gap-2">
                  <span 
                    v-for="(amenity, index) in hotel.amenities.slice(0, 3)" 
                    :key="index"
                    class="badge bg-light text-primary border"
                  >
                    {{ amenity }}
                  </span>
                  <span 
                    v-if="hotel.amenities.length > 3"
                    class="badge bg-light text-primary border"
                  >
                    +{{ hotel.amenities.length - 3 }}
                  </span>
                </div>
              </div>

              <!-- Price and Book Button -->
              <div class="mt-auto">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <p class="text-muted small mb-1">Starting from</p>
                    <div class="d-flex align-items-center">
                      <span class="h3 fw-bold text-primary mb-0">${{ hotel.price }}</span>
                      <span class="text-muted ms-1">/night</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  class="btn btn-primary w-100 py-3 fw-semibold"
                  @click="bookHotel(hotel)"
                >
                  <i class="bi bi-calendar-check me-2"></i>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results / Empty State -->
    <div v-else-if="hasSearched" class="container my-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 text-center py-5">
          <div class="mb-4">
            <i class="bi bi-buildings-slash display-1 text-muted opacity-25"></i>
          </div>
          <h3 class="h2 mb-3">No hotels found</h3>
          <p class="lead text-muted mb-4">
            Try adjusting your search criteria or dates to find available stays
          </p>
          <button class="btn btn-primary btn-lg px-5" @click="clearSearch">
            <i class="bi bi-arrow-clockwise me-2"></i>
            Clear Search
          </button>
        </div>
      </div>
    </div>

    <!-- Initial State -->
    <div v-else class="container my-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 text-center">
          <div class="bg-light rounded-4 p-5 p-md-6">
            <div class="mb-4">
              <i class="bi bi-buildings display-1 text-primary"></i>
            </div>
            <h3 class="h2 mb-4">Ready to book your stay?</h3>
            <p class="lead text-muted mb-5">
              Use the search form above to find hotels that match your travel plans. 
              We'll show you the best available options with photos, amenities, and prices.
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
          Hotel added to your cart!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotelBookingView',
  
  data() {
    return {
      searchParams: {
        location: '',
        checkIn: this.getTomorrowDate(),
        checkOut: this.getTwoDaysLaterDate(),
        guests: '2'
      },
      hotels: [],
      loading: false,
      hasSearched: false,
      showFilters: false,
      showSuccessToast: false,
      
      // Mock data
      mockHotels: [
        {
          id: 1,
          name: 'Grand Luxury Hotel',
          location: 'New York, NY',
          rating: 4.8,
          price: 299,
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          amenities: ['Pool', 'Spa', 'Restaurant', 'Gym', 'Free WiFi'],
          discount: 15
        },
        {
          id: 2,
          name: 'Seaside Resort',
          location: 'Miami Beach, FL',
          rating: 4.6,
          price: 189,
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          amenities: ['Beach Access', 'Pool', 'Bar', 'Free WiFi'],
          discount: 0
        },
        {
          id: 3,
          name: 'Mountain View Lodge',
          location: 'Aspen, CO',
          rating: 4.9,
          price: 349,
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          amenities: ['Fireplace', 'Hot Tub', 'Ski-in/Ski-out', 'Restaurant'],
          discount: 10
        },
        {
          id: 4,
          name: 'Urban Boutique Hotel',
          location: 'San Francisco, CA',
          rating: 4.5,
          price: 159,
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          amenities: ['Coffee Bar', 'Concierge', 'Free WiFi', 'Breakfast'],
          discount: 20
        }
      ]
    }
  },
  
  methods: {
    getTomorrowDate() {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow.toISOString().split('T')[0]
    },
    
    getTwoDaysLaterDate() {
      const twoDaysLater = new Date()
      twoDaysLater.setDate(twoDaysLater.getDate() + 3)
      return twoDaysLater.toISOString().split('T')[0]
    },
    
    async handleSearch() {
      if (!this.searchParams.location.trim()) {
        alert('Please enter a location')
        return
      }
      
      this.loading = true
      this.hasSearched = true
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Filter mock hotels based on search
      this.hotels = this.mockHotels.filter(hotel => 
        hotel.location.toLowerCase().includes(this.searchParams.location.toLowerCase())
      )
      
      this.loading = false
    },
    
    bookHotel(hotel) {
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
        type: 'hotel',
        name: hotel.name,
        price: hotel.price,
        hotelDetails: hotel,
        nights: 1,
        total: hotel.price,
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
        location: '',
        checkIn: this.getTomorrowDate(),
        checkOut: this.getTwoDaysLaterDate(),
        guests: '2'
      }
      this.hotels = []
      this.hasSearched = false
    },
    
    toggleFilters() {
      this.showFilters = !this.showFilters
      alert('Filter functionality would be implemented here')
    },
    
    scrollToSearch() {
      const searchForm = document.querySelector('.card.border-0.shadow-lg')
      if (searchForm) {
        searchForm.scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
  
  mounted() {
    console.log('HotelBookingView mounted')
    
    // Set default dates
    this.searchParams.checkIn = this.getTomorrowDate()
    this.searchParams.checkOut = this.getTwoDaysLaterDate()
  }
}
</script>

<style scoped>
.hotel-booking-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.mt-n5 {
  margin-top: -3rem !important;
}

.hotel-card {
  border-radius: 1rem !important;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hotel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
}

.card-img-top {
  border-radius: 1rem 1rem 0 0 !important;
}

/* Toast Animation */
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem !important;
  }
  
  .bg-gradient {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  
  .mt-n5 {
    margin-top: -2rem !important;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
  
  .form-control-lg {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
  }
}
</style>