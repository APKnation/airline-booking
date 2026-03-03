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
        <div class="card h-100 shadow-sm border-0 hover-shadow">
          <img 
            :src="attraction.image" 
            class="card-img-top" 
            :alt="attraction.name"
            style="height: 200px; object-fit: cover;"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">{{ attraction.name }}</h5>
            <p class="card-subtitle mb-2 text-muted">
              <i class="bi bi-geo-alt me-1"></i> {{ attraction.location }}
            </p>
            
            <div class="mb-3">
              <span class="badge bg-primary mb-2">{{ attraction.category }}</span>
              <p class="card-text text-secondary mb-3">{{ attraction.description }}</p>
              
              <div class="d-flex align-items-center mb-2">
                <div class="rating me-2">
                  <i 
                    v-for="star in 5" 
                    :key="star"
                    class="bi me-1"
                    :class="star <= attraction.rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'"
                  ></i>
                </div>
                <small class="text-muted">({{ attraction.reviews }} reviews)</small>
              </div>
              
              <p class="card-text mb-0">
                <i class="bi bi-clock me-1"></i> {{ attraction.duration }}
              </p>
            </div>
            
            <div class="mt-auto pt-3 border-top">
              <div class="d-flex justify-content-between align-items-center">
                <span class="h4 text-primary mb-0 fw-bold">${{ attraction.price }}</span>
                <button 
                  class="btn btn-primary px-4" 
                  @click="bookAttraction(attraction)"
                >
                  <i class="bi bi-calendar-plus me-2"></i>Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
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