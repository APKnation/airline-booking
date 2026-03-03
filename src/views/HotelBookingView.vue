<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 py-16 px-4 text-center text-white">
      <div class="max-w-4xl mx-auto">
        <svg class="w-20 h-20 mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Find Your Perfect Stay</h1>
        <p class="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Discover amazing hotels, resorts, and accommodations for your next journey
        </p>
      </div>
    </div>

    <!-- Search Form Section - Overlapping Card -->
    <div class="relative -mt-16 px-4 pb-8">
      <div class="max-w-5xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
          <div class="p-6 md:p-8">
            <div class="flex items-center mb-6">
              <svg class="w-8 h-8 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Search Hotels</h2>
            </div>

            <!-- Hotel Search Form -->
            <form @submit.prevent="handleSearch" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Location -->
              <div class="lg:col-span-1">
                <label for="location" class="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  id="location"
                  v-model="searchParams.location"
                  placeholder="Enter a city or hotel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all duration-150 placeholder:text-gray-400 text-gray-900"
                >
              </div>

              <!-- Check-in -->
              <div class="lg:col-span-1">
                <label for="checkIn" class="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Check-in
                  </span>
                </label>
                <input
                  type="date"
                  id="checkIn"
                  v-model="searchParams.checkIn"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all duration-150 text-gray-900"
                >
              </div>

              <!-- Check-out -->
              <div class="lg:col-span-1">
                <label for="checkOut" class="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    Check-out
                  </span>
                </label>
                <input
                  type="date"
                  id="checkOut"
                  v-model="searchParams.checkOut"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all duration-150 text-gray-900"
                >
              </div>

              <!-- Guests -->
              <div class="lg:col-span-1">
                <label for="guests" class="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                    Guests
                  </span>
                </label>
                <select 
                  id="guests" 
                  v-model="searchParams.guests"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition-all duration-150 bg-white text-gray-900"
                >
                  <option value="1">1 Guest</option>
                  <option value="2" selected>2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
              </div>

              <!-- Search Button -->
              <div class="lg:col-span-4 mt-2">
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center items-center py-3.5 px-6 border border-transparent 
                         rounded-xl shadow-sm text-base font-semibold text-white 
                         bg-indigo-600 hover:bg-indigo-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all duration-200 ease-in-out"
                >
                  <svg 
                    v-if="loading" 
                    class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  {{ loading ? 'Searching...' : 'Search Hotels' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto text-center py-12">
        <svg class="animate-spin mx-auto h-16 w-16 text-indigo-600 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 class="text-xl font-semibold text-gray-900">Finding the best stays for you...</h3>
        <p class="text-gray-500 mt-2">This may take a moment</p>
      </div>
    </div>

    <!-- Results Section -->
    <div v-else-if="hotels.length" class="container mx-auto px-4 py-12">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">
            Available Stays
            <span class="inline-flex items-center px-3 py-1 ml-3 text-sm font-semibold bg-indigo-100 text-indigo-800 rounded-full">
              {{ hotels.length }}
            </span>
          </h2>
          <p class="text-gray-500 mt-2">
            Showing results for <span class="font-medium text-gray-900">{{ searchParams.location || 'your search' }}</span>
          </p>
        </div>
        <button 
          class="inline-flex items-center px-4 py-2.5 border border-indigo-600 text-indigo-600 font-medium rounded-lg 
                 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                 transition-colors duration-150"
          @click="toggleFilters"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Filter
        </button>
      </div>

      <!-- Hotels Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="hotel in hotels" 
          :key="hotel.id"
          class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden 
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <!-- Hotel Image -->
          <div class="relative">
            <img 
              :src="hotel.image" 
              :alt="hotel.name"
              class="w-full h-48 object-cover"
              loading="lazy"
            >
            
            <!-- Rating Badge -->
            <div v-if="hotel.rating" class="absolute top-3 left-3">
              <span class="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-amber-400 text-amber-900 text-sm font-semibold shadow-sm">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                {{ hotel.rating }}
              </span>
            </div>
            
            <!-- Discount Badge -->
            <div v-if="hotel.discount" class="absolute top-3 right-3">
              <span class="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-red-500 text-white text-sm font-semibold shadow-sm">
                -{{ hotel.discount }}%
              </span>
            </div>
          </div>

          <!-- Hotel Content -->
          <div class="p-5 flex flex-col h-full">
            <h5 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {{ hotel.name }}
            </h5>
            
            <div class="flex items-center text-gray-500 text-sm mb-4">
              <svg class="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              {{ hotel.location }}
            </div>

            <!-- Amenities -->
            <div v-if="hotel.amenities?.length" class="mb-4">
              <p class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">Amenities</p>
              <div class="flex flex-wrap gap-1.5">
                <span 
                  v-for="(amenity, index) in hotel.amenities.slice(0, 3)" 
                  :key="index"
                  class="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-indigo-700 text-xs font-medium"
                >
                  {{ amenity }}
                </span>
                <span 
                  v-if="hotel.amenities.length > 3"
                  class="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                >
                  +{{ hotel.amenities.length - 3 }}
                </span>
              </div>
            </div>

            <!-- Price and Book Button -->
            <div class="mt-auto pt-4 border-t border-gray-100">
              <div class="flex justify-between items-end mb-4">
                <div>
                  <p class="text-gray-500 text-xs mb-0.5">Starting from</p>
                  <div class="flex items-baseline">
                    <span class="text-2xl font-bold text-indigo-600">${{ hotel.price }}</span>
                    <span class="text-gray-500 text-sm ml-1">/night</span>
                  </div>
                </div>
              </div>
              
              <button 
                class="w-full inline-flex justify-center items-center py-3 px-4 border border-transparent 
                       rounded-xl shadow-sm text-sm font-semibold text-white 
                       bg-indigo-600 hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       transition-all duration-200"
                @click="bookHotel(hotel)"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results / Empty State -->
    <div v-else-if="hasSearched" class="container mx-auto px-4 py-16">
      <div class="max-w-2xl mx-auto text-center">
        <div class="mb-6">
          <svg class="mx-auto h-20 w-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">No hotels found</h3>
        <p class="text-lg text-gray-500 mb-8">
          Try adjusting your search criteria or dates to find available stays
        </p>
        <button 
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold 
                 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                 transition-all duration-200"
          @click="clearSearch"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Clear Search
        </button>
      </div>
    </div>

    <!-- Initial State -->
    <div v-else class="container mx-auto px-4 py-16">
      <div class="max-w-3xl mx-auto text-center">
        <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="mb-6">
            <svg class="mx-auto h-16 w-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to book your stay?</h3>
          <p class="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Use the search form above to find hotels that match your travel plans. 
            We'll show you the best available options with photos, amenities, and prices.
          </p>
          <button 
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold 
                   rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   transition-all duration-200"
            @click="scrollToSearch"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Start Searching
          </button>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <transition 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-full opacity-0"
    >
      <div v-if="showSuccessToast" class="fixed top-4 right-4 z-50">
        <div class="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden max-w-sm">
          <div class="flex items-start p-4">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-semibold text-gray-900">Success!</p>
              <p class="text-sm text-gray-600 mt-0.5">Hotel added to your cart!</p>
            </div>
            <div class="ml-4 flex-shrink-0">
              <button 
                @click="showSuccessToast = false"
                class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="h-1 bg-green-500 animate-pulse"></div>
        </div>
      </div>
    </transition>
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
      
      // Mock data with cleaned image URLs
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
      const searchForm = document.querySelector('.bg-white.rounded-2xl.shadow-2xl')
      if (searchForm) {
        searchForm.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
/* Optional: Enhanced animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.group:hover .card-img-top {
  transform: scale(1.03);
  transition: transform 0.3s ease;
}

/* Smooth focus transitions */
input, select {
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>