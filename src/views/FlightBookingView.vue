<template>
  <div class="min-vh-100 bg-light p-3 p-md-4">
    <div class="container-fluid px-0 px-md-3">

      <!-- Header -->
      <div class="mb-5 mb-md-6">
        <div class="bg-primary rounded-4 p-4 p-md-5 shadow-lg mb-4">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle bg-white d-flex align-items-center justify-content-center me-4" style="width: 60px; height: 60px;">
              <img :src="headerImage" alt="Header Icon" class="img-fluid" style="max-height: 30px;" />
            </div>
            <h1 class="display-4 fw-bold text-white mb-0">Book Your Flight</h1>
          </div>
          <div class="d-flex align-items-center text-white-75 fs-5">
            <img :src="formIcon" alt="Form Icon" class="img-fluid me-3" style="max-height: 24px;" />
            <span>Discover perfect journeys with exclusive deals</span>
          </div>
        </div>
      </div>

      <!-- Flight Search Form -->
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
        <div class="card-header bg-primary text-white py-4 px-4 px-md-5">
          <div class="d-flex align-items-center">
            <img :src="formIcon" alt="Form Icon" class="img-fluid me-3" style="max-height: 24px;" />
            <span class="h4 mb-0 fw-semibold">Search Flights</span>
          </div>
        </div>

        <div class="card-body p-4 p-md-5">
          <form @submit.prevent="handleSearch">

            <!-- Trip Type -->
            <div class="mb-5">
              <label class="form-label fw-semibold text-primary mb-3">Trip Type</label>
              <div class="btn-group bg-light rounded-3 p-1" role="group">
                <button
                  type="button"
                  @click="tripType = 'oneway'"
                  class="btn btn-lg px-4 px-md-5 me-2"
                  :class="tripType === 'oneway' ? 'btn-primary shadow-sm' : 'btn-outline-primary'"
                >
                  One Way
                </button>
                <button
                  type="button"
                  @click="tripType = 'round'"
                  class="btn btn-lg px-4 px-md-5 me-2"
                  :class="tripType === 'round' ? 'btn-primary shadow-sm' : 'btn-outline-primary'"
                >
                  Round Trip
                </button>
              </div>
            </div>

            <!-- Main Form Grid -->
            <div class="row g-3 g-md-4 mb-4">
              <!-- From -->
              <div class="col-12 col-md-6 col-lg-3">
                <label class="form-label fw-semibold text-primary">From</label>
                <input
                  v-model="search.from"
                  type="text"
                  placeholder="Departure city"
                  class="form-control form-control-lg border-2"
                  :class="search.from ? 'border-primary' : 'border-primary-subtle'"
                  required
                />
              </div>

              <!-- To -->
              <div class="col-12 col-md-6 col-lg-3">
                <label class="form-label fw-semibold text-primary">To</label>
                <input
                  v-model="search.to"
                  type="text"
                  placeholder="Destination city"
                  class="form-control form-control-lg border-2"
                  :class="search.to ? 'border-primary' : 'border-primary-subtle'"
                  required
                />
              </div>

              <!-- Departure Date -->
              <div class="col-12 col-md-6 col-lg-3">
                <label class="form-label fw-semibold text-primary">Departure</label>
                <input
                  v-model="search.departDate"
                  type="date"
                  :min="today"
                  class="form-control form-control-lg border-2"
                  :class="search.departDate ? 'border-primary' : 'border-primary-subtle'"
                  required
                />
              </div>

              <!-- Return Date -->
              <div class="col-12 col-md-6 col-lg-3" v-if="tripType === 'round'">
                <label class="form-label fw-semibold text-primary">Return</label>
                <input
                  v-model="search.returnDate"
                  type="date"
                  :min="minReturnDate"
                  class="form-control form-control-lg border-2"
                  :class="search.returnDate ? 'border-primary' : 'border-primary-subtle'"
                  required
                />
              </div>
            </div>

            <!-- Second Row: Passengers & Class -->
            <div class="row g-3 g-md-4 mb-5">
              <div class="col-12 col-md-4">
                <label class="form-label fw-semibold text-primary">Travelers</label>
                <select v-model="search.passengers" class="form-select form-select-lg border-2 border-primary-subtle">
                  <option v-for="n in 8" :key="n" :value="n">
                    {{ n }} {{ n === 1 ? 'Traveler' : 'Travelers' }}
                  </option>
                </select>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label fw-semibold text-primary">Cabin Class</label>
                <select v-model="search.class" class="form-select form-select-lg border-2 border-primary-subtle">
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business Class</option>
                  <option value="First">First Class</option>
                </select>
              </div>

              <div class="col-12 col-md-4 d-flex align-items-end">
                <button
                  type="button"
                  @click="showAdvanced = !showAdvanced"
                  class="btn btn-outline-primary btn-lg w-100 border-2 border-dashed"
                >
                  <i class="bi bi-gear-wide-connected me-2"></i>
                  Advanced Options
                </button>
              </div>
            </div>

            <!-- Advanced Options Panel -->
            <div v-if="showAdvanced" class="card bg-light border-2 border-primary-subtle rounded-4 mb-4">
              <div class="card-body p-4">
                <h5 class="fw-semibold text-primary mb-4">Advanced Search Options</h5>
                <div class="row g-3 g-md-4">
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-semibold text-primary">Flexible Dates</label>
                    <select v-model="search.flexibleDates" class="form-select border-2 border-primary-subtle">
                      <option value="">None</option>
                      <option value="1">±1 day</option>
                      <option value="2">±2 days</option>
                      <option value="3">±3 days</option>
                    </select>
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-semibold text-primary">Preferred Airline</label>
                    <input
                      v-model="search.airline"
                      type="text"
                      placeholder="e.g., Delta, Emirates"
                      class="form-control border-2 border-primary-subtle"
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-check">
                      <input
                        id="directFlights"
                        type="checkbox"
                        v-model="search.directOnly"
                        class="form-check-input"
                      />
                      <label for="directFlights" class="form-check-label fw-semibold text-primary">
                        Direct Flights Only
                      </label>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="form-label fw-semibold text-primary">Price Range ($)</label>
                    <div class="row g-2">
                      <div class="col">
                        <input
                          v-model.number="search.priceMin"
                          type="number"
                          placeholder="Min"
                          min="0"
                          class="form-control border-2 border-primary-subtle"
                        />
                      </div>
                      <div class="col">
                        <input
                          v-model.number="search.priceMax"
                          type="number"
                          placeholder="Max"
                          min="0"
                          class="form-control border-2 border-primary-subtle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Search Button -->
            <div class="mt-4">
              <button
                type="submit"
                :disabled="!isFormValid || loading"
                class="btn btn-primary btn-lg w-100 py-3 fw-bold"
                :class="{'btn-primary': isFormValid && !loading, 'btn-secondary': !isFormValid || loading}"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                <i v-else class="bi bi-search me-2"></i>
                {{ loading ? 'Searching...' : 'Search Flights' }}
              </button>
            </div>

          </form>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary mb-3" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h4 class="text-primary fw-semibold">Searching flights...</h4>
        <p class="text-muted">Please wait while we find the best flights for you</p>
      </div>

      <!-- Flight Results -->
      <div v-if="searched && !loading && flights.length > 0" class="mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="display-5 fw-bold text-primary mb-0">
            {{ flights.length }} Flight{{ flights.length > 1 ? 's' : '' }} Found
          </h2>
          <button @click="clearSearch" class="btn btn-outline-primary">
            <i class="bi bi-arrow-clockwise me-2"></i>
            New Search
          </button>
        </div>
        <div class="row g-4">
          <div class="col-12" v-for="flight in validFlights" :key="flight.id">
            <FlightCard
              :flight="flight"
              :passengers="search.passengers"
              @select="bookFlight(flight)"
            />
          </div>
        </div>
      </div>

      <!-- No Flights Found -->
      <div v-else-if="searched && !loading && flights.length === 0" class="text-center py-5">
        <div class="card border-0 bg-light shadow-sm rounded-4 p-5 mb-4">
          <i class="bi bi-airplane-slash display-1 text-primary mb-4"></i>
          <h3 class="text-primary fw-bold mb-3">No flights match your search</h3>
          <p class="text-muted mb-4">Try adjusting your search criteria or dates to find available flights</p>
          <button @click="clearSearch" class="btn btn-primary px-5">
            <i class="bi bi-search me-2"></i>
            Try New Search
          </button>
        </div>
      </div>

      <!-- Welcome State -->
      <div v-else-if="!searched && !loading" class="text-center py-5">
        <div class="card border-0 bg-light shadow-sm rounded-4 p-5">
          <div class="rounded-circle bg-primary bg-opacity-10 mx-auto mb-4 overflow-hidden d-flex align-items-center justify-content-center" style="width: 200px; height: 200px;">
            <img :src="welcomeImage" alt="Welcome Image" class="img-fluid" />
          </div>
          <h3 class="display-5 fw-bold text-primary mb-3">Your Journey Begins Here</h3>
          <p class="lead text-muted mb-4">
            Enter your travel details above to explore amazing flight deals and create unforgettable travel experiences.
          </p>
          <div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
            <div class="d-flex align-items-center">
              <i class="bi bi-check-circle-fill text-success me-2"></i>
              <span>Best Price Guarantee</span>
            </div>
            <div class="d-flex align-items-center">
              <i class="bi bi-check-circle-fill text-success me-2"></i>
              <span>24/7 Customer Support</span>
            </div>
            <div class="d-flex align-items-center">
              <i class="bi bi-check-circle-fill text-success me-2"></i>
              <span>Secure Booking</span>
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

// Images
import welcomeImage from '@/assets/images/image.png'
import headerImage from '@/assets/images/image.png'
import formIcon from '@/assets/images/image.png'

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
const minReturnDate = computed(() => {
  return search.departDate || today.value
})
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

<style scoped>
/* Custom styles to enhance Bootstrap */
.min-vh-100 {
  min-height: 100vh;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.rounded-4 {
  border-radius: 1rem !important;
}

.border-2 {
  border-width: 2px !important;
}

.border-primary-subtle {
  border-color: rgba(17, 44, 83, 0.25) !important;
}

.btn-group .btn {
  border-radius: 0.5rem !important;
}

.form-control:focus, .form-select:focus {
  border-color: hsl(213, 7%, 73%) !important;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
}

.btn-lg {
  padding: 0.75rem 1.5rem !important;
  font-size: 1.1rem !important;
}

.btn-outline-primary {
  border-width: 2px !important;
}

.btn-outline-primary:hover {
  background-color: rgba(13, 110, 253, 0.1) !important;
}

.text-primary {
  color: #78c514 !important;
}

.bg-primary {
  background-color: #70b9e9 !important;
}

.text-white-75 {
  color: rgba(244, 244, 247, 0.75) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

.display-4 {
  font-size: calc(1.475rem + 2.7vw) !important;
}

.display-5 {
  font-size: calc(1.375rem + 1.5vw) !important;
}

.lead {
  font-size: 1.25rem !important;
  font-weight: 300 !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem !important;
  }
  
  .display-5 {
    font-size: 1.75rem !important;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
  
  .btn-lg {
    padding: 0.5rem 1rem !important;
    font-size: 1rem !important;
  }
}

/* Form input states */
.form-control.border-primary {
  border-color: #6f7783 !important;
}

/* Spinner animation */
.spinner-border {
  vertical-align: middle;
}

/* Check circles */
.bi-check-circle-fill {
  font-size: 1.25rem;
}

/* Custom form select styles */
.form-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%230d6efd' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
}

/* Form check custom */
.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.form-check-input:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

/* Card hover effects */
.card:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

/* Flight card spacing */
.row.g-4 > .col-12:not(:last-child) {
  margin-bottom: 1rem;
}
</style>