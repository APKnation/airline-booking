<template>
  <div class="container mt-4">
    <h1 class="mb-4 display-5 fw-bold text-primary">Local Attractions & Tours</h1>
    
    <!-- Search and Filter Row -->
    <div class="row mb-4 g-3">
      <div class="col-md-6">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input 
            v-model="searchQuery"
            type="text" 
            class="form-control border-start-0"
            placeholder="Search attractions..."
            aria-label="Search attractions"
          >
          <button 
            v-if="searchQuery" 
            class="btn btn-outline-secondary" 
            type="button"
            @click="searchQuery = ''"
          >
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
      <div class="col-md-3">
        <select 
          v-model="selectedCategory" 
          class="form-select"
          aria-label="Select category"
        >
          <option disabled>Category</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <select 
          v-model="selectedCity" 
          class="form-select"
          aria-label="Select city"
        >
          <option disabled>City</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
    </div>

    <!-- Attractions Grid -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="attraction in filteredAttractions" :key="attraction.id" class="col">
        <a href="#" class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl md:flex-row md:max-w-xl attraction-card">
          <!-- Attraction Image -->
          <img 
            class="object-cover w-full rounded-base h-64 md:h-auto md:w-48 mb-4 md:mb-0" 
            :src="attraction.image" 
            :alt="attraction.name"
          />
          
          <div class="flex flex-col justify-between md:p-4 leading-normal flex-1">
            <!-- Header Section -->
            <div class="mb-4">
              <div class="flex justify-between items-start mb-2">
                <h5 class="text-2xl font-bold tracking-tight text-heading">
                  {{ attraction.name }}
                </h5>
                <span class="px-3 py-1 bg-neutral-secondary-medium text-body rounded-full text-sm font-semibold">
                  {{ attraction.category }}
                </span>
              </div>
              
              <div class="text-body mb-2">
                <i class="bi bi-geo-alt me-1"></i> {{ attraction.location }}
              </div>
              
              <p class="text-body mb-3">{{ attraction.description }}</p>
              
              <!-- Rating -->
              <div class="flex items-center mb-3">
                <div class="flex me-2">
                  <i 
                    v-for="star in 5" 
                    :key="star"
                    class="bi me-1"
                    :class="star <= attraction.rating ? 'bi-star-fill text-yellow-500' : 'bi-star text-gray-300'"
                  ></i>
                </div>
                <small class="text-body">({{ attraction.reviews }} reviews)</small>
              </div>
              
              <div class="text-body mb-4">
                <i class="bi bi-clock me-1"></i> {{ attraction.duration }}
              </div>
            </div>

            <!-- Footer with Price and Button -->
            <div class="flex items-center justify-between">
              <div>
                <div class="text-2xl font-bold text-heading">${{ attraction.price }}</div>
              </div>
              
              <button 
                type="button" 
                class="inline-flex items-center w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                @click="bookAttraction(attraction)"
              >
                Book Now
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'

const bookingStore = useBookingStore()

const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedCity = ref('All')

const categories = ['All', 'Museums', 'Tours', 'Adventure', 'Entertainment', 'Nature']
const cities = ['All', 'Paris', 'London', 'New York', 'Tokyo', 'Dubai']

const attractions = ref([
  {
    id: 1,
    name: 'Louvre Museum Skip-the-Line',
    location: 'Paris, France',
    category: 'Museums',
    description: 'Skip the long lines and explore the world\'s largest art museum at your own pace.',
    rating: 4.8,
    reviews: 12543,
    duration: '3 hours',
    price: 45,
    image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=400'
  },
  {
    id: 2,
    name: 'Eiffel Tower Summit Access',
    location: 'Paris, France',
    category: 'Tours',
    description: 'Enjoy breathtaking views of Paris from the top of the iconic Eiffel Tower.',
    rating: 4.7,
    reviews: 8921,
    duration: '2 hours',
    price: 35,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=400'
  },
  {
    id: 3,
    name: 'Statue of Liberty & Ellis Island',
    location: 'New York, USA',
    category: 'Tours',
    description: 'Visit two of America\'s most famous landmarks with ferry tickets included.',
    rating: 4.6,
    reviews: 15234,
    duration: '4 hours',
    price: 55,
    image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=400'
  },
  {
    id: 4,
    name: 'Tokyo Food Tour',
    location: 'Tokyo, Japan',
    category: 'Adventure',
    description: 'Explore the vibrant food scene of Tokyo with a local guide.',
    rating: 4.9,
    reviews: 3421,
    duration: '3.5 hours',
    price: 89,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400'
  }
])

const filteredAttractions = computed(() => {
  return attractions.value.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         a.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || a.category === selectedCategory.value
    const matchesCity = selectedCity.value === 'All' || a.location.includes(selectedCity.value)
    return matchesSearch && matchesCategory && matchesCity
  })
})

const bookAttraction = (attraction) => {
  bookingStore.addToCart({
    type: 'attraction',
    name: attraction.name,
    price: attraction.price,
    attractionDetails: attraction
  })
}
</script>

<style scoped>
.attraction-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.attraction-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.hover-shadow {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-shadow:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.rating {
  display: inline-flex;
  align-items: center;
}

.badge {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
}

.input-group-text {
  border-right: none;
}

.form-control:focus {
  box-shadow: none;
  border-color: #dee2e6;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.card {
  border-radius: 12px;
  overflow: hidden;
}
</style>