<template>
  <v-container class="pa-4 pa-md-8" fluid>
    <!-- Header Section -->
    <v-row justify="center" class="mb-6 mb-md-10">
      <v-col cols="12" class="text-center">
        <v-icon color="primary" size="x-large" class="mb-4">mdi-bed</v-icon>
        <h1 class="text-h3 text-md-h2 font-weight-bold text-primary mb-3">
          Find Your Perfect Stay
        </h1>
        <p class="text-body-1 text-medium-emphasis max-width-600 mx-auto">
          Discover amazing hotels, resorts, and accommodations for your next journey
        </p>
      </v-col>
    </v-row>

    <!-- Search Form Section -->
    <v-row justify="center" class="mb-8 mb-md-12">
      <v-col cols="12" lg="10" xl="8">
        <v-card class="pa-4 pa-sm-6" elevation="1" rounded="xl" border>
          <div class="d-flex align-center mb-4">
            <v-icon color="primary" class="mr-3">mdi-magnify</v-icon>
            <h2 class="text-h5 text-md-h4 font-weight-semibold">
              Search Hotels
            </h2>
          </div>
          <HotelSearchForm @search="handleSearch" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Results Section -->
    <v-row v-if="loading" justify="center" class="my-12">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="6"
          class="mb-4"
        ></v-progress-circular>
        <h3 class="text-h6 text-primary">Finding the best stays for you...</h3>
      </v-col>
    </v-row>

    <!-- Hotels Grid -->
    <v-row v-else-if="hotels.length" class="mb-6">
      <v-col cols="12" class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h4 text-md-h3 font-weight-bold">
          Available Stays
          <v-chip color="primary" variant="flat" class="ml-3">
            {{ hotels.length }}
          </v-chip>
        </h2>
        <v-btn variant="tonal" color="primary" prepend-icon="mdi-filter">
          Filter
        </v-btn>
      </v-col>
      
      <v-col
        v-for="hotel in hotels"
        :key="hotel.id"
        cols="12"
        sm="6"
        lg="4"
        xl="3"
      >
        <v-card
          class="h-100 d-flex flex-column"
          elevation="2"
          hover
          rounded="lg"
          border
        >
          <!-- Hotel Image -->
          <div class="position-relative">
            <v-img
              :src="hotel.image || 'https://via.placeholder.com/400x250/3f51b5/ffffff?text=Hotel'"
              height="200"
              cover
              gradient="to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
              
              <!-- Rating Badge -->
              <v-chip
                v-if="hotel.rating"
                class="ma-2"
                color="orange"
                variant="flat"
                size="small"
                prepend-icon="mdi-star"
              >
                {{ hotel.rating }}
              </v-chip>
            </v-img>
          </div>

          <!-- Hotel Content -->
          <v-card-title class="text-h6 font-weight-semibold pt-4 pb-1 px-4">
            {{ hotel.name }}
          </v-card-title>

          <v-card-subtitle class="px-4 pb-2 d-flex align-center">
            <v-icon size="small" color="primary" class="mr-1">mdi-map-marker</v-icon>
            <span class="text-body-2">{{ hotel.location }}</span>
          </v-card-subtitle>

          <v-card-text class="px-4 pt-2 pb-3 flex-grow-1">
            <!-- Amenities -->
            <div v-if="hotel.amenities?.length" class="mb-3">
              <div class="text-caption text-medium-emphasis mb-1">Amenities</div>
              <div class="d-flex flex-wrap gap-1">
                <v-chip
                  v-for="(amenity, index) in hotel.amenities.slice(0, 3)"
                  :key="index"
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  {{ amenity }}
                </v-chip>
                <v-chip
                  v-if="hotel.amenities.length > 3"
                  size="small"
                  variant="text"
                  color="primary"
                >
                  +{{ hotel.amenities.length - 3 }} more
                </v-chip>
              </div>
            </div>

            <!-- Price -->
            <div class="d-flex align-center justify-space-between mt-auto">
              <div>
                <div class="text-caption text-medium-emphasis">Starting from</div>
                <div class="text-h5 font-weight-bold text-primary">
                  ${{ hotel.price }}
                  <span class="text-body-2 text-medium-emphasis">/night</span>
                </div>
              </div>
              <v-chip
                v-if="hotel.discount"
                color="error"
                variant="flat"
                size="small"
                class="font-weight-bold"
              >
                -{{ hotel.discount }}%
              </v-chip>
            </div>
          </v-card-text>

          <!-- Action Button -->
          <v-card-actions class="px-4 pb-4 pt-0">
            <v-btn
              color="primary"
              variant="flat"
              block
              size="large"
              @click="bookHotel(hotel)"
              prepend-icon="mdi-calendar-check"
              rounded="lg"
            >
              Book Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- No Results / Empty State -->
    <v-row v-else-if="hasSearched" justify="center" class="my-12">
      <v-col cols="12" md="8" lg="6" class="text-center">
        <v-icon size="96" color="grey-lighten-1" class="mb-6">mdi-bed-empty</v-icon>
        <h3 class="text-h4 mb-4">No hotels found</h3>
        <p class="text-body-1 text-medium-emphasis mb-6">
          Try adjusting your search criteria or dates to find available stays
        </p>
        <v-btn color="primary" size="large" rounded="lg" @click="handleSearch({ reset: true })">
          Clear Search
        </v-btn>
      </v-col>
    </v-row>

    <!-- Initial State -->
    <v-row v-else justify="center" class="my-12">
      <v-col cols="12" md="10" lg="8" class="text-center">
        <div class="pa-8 pa-md-12 rounded-xl bg-surface-lighten-1">
          <v-icon size="96" color="primary" class="mb-6">mdi-bed-king</v-icon>
          <h3 class="text-h4 mb-4">Ready to book your stay?</h3>
          <p class="text-body-1 text-medium-emphasis mb-6 max-width-600 mx-auto">
            Use the search form above to find hotels that match your travel plans. 
            We'll show you the best available options with photos, amenities, and prices.
          </p>
          <v-btn color="primary" size="large" rounded="lg" prepend-icon="mdi-magnify">
            Start Searching
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import HotelSearchForm from '@/components/hotel/HotelSearchForm.vue'
import { useBookingStore } from '@/stores/bookingStore'

const bookingStore = useBookingStore()
const hotels = ref([])
const loading = ref(false)
const hasSearched = ref(false)

// Mock data for demonstration - replace with actual API call
const mockHotels = [
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

const handleSearch = async (searchParams) => {
  if (searchParams?.reset) {
    hotels.value = []
    hasSearched.value = false
    return
  }

  loading.value = true
  hasSearched.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In a real app, this would be an API call:
  // hotels.value = await fetchHotels(searchParams)
  
  hotels.value = mockHotels
  loading.value = false
}

const bookHotel = (hotel) => {
  bookingStore.addToCart({
    type: 'hotel',
    name: hotel.name,
    price: hotel.price,
    hotelDetails: hotel,
    nights: 1,
    total: hotel.price
  })
  
  // Optional: Show confirmation
  // alert(`Added ${hotel.name} to your cart!`)
}
</script>

<style scoped>
.max-width-600 {
  max-width: 600px;
}

.position-relative {
  position: relative;
}

.h-100 {
  height: 100%;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-grow-1 {
  flex-grow: 1;
}

.mt-auto {
  margin-top: auto;
}

.gap-1 {
  gap: 4px;
}

.bg-surface-lighten-1 {
  background-color: rgba(var(--v-theme-surface), 0.1);
}

.rounded-xl {
  border-radius: 12px;
}

.rounded-lg {
  border-radius: 8px;
}

.text-primary {
  color: rgb(var(--v-theme-primary));
}

.font-weight-semibold {
  font-weight: 600;
}
</style>