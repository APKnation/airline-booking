<template>
  <v-container>
    <h1 class="text-h3 mb-6">Local Attractions & Tours</h1>
    
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Search attractions"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedCategory"
          label="Category"
          :items="categories"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedCity"
          label="City"
          :items="cities"
          variant="outlined"
        ></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="attraction in filteredAttractions" :key="attraction.id" cols="12" md="6" lg="4">
        <v-card hover height="100%">
          <v-img :src="attraction.image" height="200" cover></v-img>
          <v-card-title>{{ attraction.name }}</v-card-title>
          <v-card-subtitle>
            <v-icon small>mdi-map-marker</v-icon> {{ attraction.location }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip small class="mr-2 mb-2" color="primary">{{ attraction.category }}</v-chip>
            <p class="text-body-2 mb-2">{{ attraction.description }}</p>
            <div class="d-flex align-center mb-2">
              <v-rating :model-value="attraction.rating" readonly dense size="small"></v-rating>
              <span class="text-caption ml-2">({{ attraction.reviews }} reviews)</span>
            </div>
            <div class="text-body-2">
              <v-icon small>mdi-clock</v-icon> {{ attraction.duration }}
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <div class="text-h6 text-primary">${{ attraction.price }}</div>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="elevated" @click="bookAttraction(attraction)">
              Book Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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