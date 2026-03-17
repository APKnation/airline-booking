<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Page Header -->
    <div class="text-center mb-10">
      <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-3 flex items-center justify-center gap-3">
        <i class="bi bi-compass text-blue-600"></i>
        Travel Guide
      </h1>
      <p class="text-gray-500 text-lg">Discover your next adventure</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      
      <!-- Left Sidebar - Destinations List -->
      <div class="w-full lg:w-1/4 flex-shrink-0">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8 border border-gray-100">
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-5">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              <i class="bi bi-globe-americas text-2xl"></i>
              Destinations
            </h2>
          </div>
          <div class="p-3 space-y-2">
            <button
              v-for="dest in destinations"
              :key="dest.id"
              @click="selectDestination(dest)"
              class="w-full text-left p-3 rounded-xl transition-all duration-300 group"
              :class="selectedDestination?.id === dest.id 
                ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' 
                : 'hover:bg-gray-100 text-gray-700'"
            >
              <div class="flex items-center gap-3">
                <img 
                  :src="dest.thumbnail" 
                  :alt="dest.name" 
                  class="w-12 h-12 rounded-lg object-cover shadow-sm transition-transform duration-300"
                  :class="selectedDestination?.id === dest.id ? 'ring-2 ring-white' : 'group-hover:scale-105'"
                />
                <div class="flex-1">
                  <h5 class="font-bold text-base">
                    {{ dest.name }}
                  </h5>
                  <p class="text-sm opacity-80">
                    {{ dest.country }}
                  </p>
                </div>
                <i class="bi bi-chevron-right transition-transform duration-300" :class="selectedDestination?.id === dest.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'"></i>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Content Area -->
      <div class="w-full lg:w-3/4">
        
        <!-- Destination Details (Active State) -->
        <div v-if="selectedDestination" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in">
          
          <!-- Hero Image -->
          <div class="relative h-72 md:h-96 overflow-hidden">
            <img 
              :src="selectedDestination.image" 
              :alt="selectedDestination.name" 
              class="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full p-6">
              <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-2">
                {{ selectedDestination.country }}
              </span>
              <h2 class="text-4xl font-bold text-white mb-2 drop-shadow-lg">{{ selectedDestination.name }}</h2>
            </div>
          </div>

          <div class="p-6 md:p-8">
            
            <!-- Description -->
            <div class="mb-8 text-gray-600 leading-relaxed text-lg border-l-4 border-blue-200 pl-4 italic">
              "{{ selectedDestination.description }}"
            </div>

            <!-- Top Attractions -->
            <div class="mb-10">
              <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span class="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <i class="bi bi-camera-fill"></i>
                </span>
                Top Attractions
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="attraction in selectedDestination.attractions" 
                  :key="attraction.id" 
                  class="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div class="relative h-48 overflow-hidden">
                    <img 
                      :src="attraction.image" 
                      :alt="attraction.name" 
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div class="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded-full shadow text-sm font-bold text-yellow-500">
                      <i class="bi bi-star-fill"></i> {{ attraction.rating }}
                    </div>
                  </div>
                  
                  <div class="p-5">
                    <h5 class="text-lg font-bold text-gray-900 mb-2">{{ attraction.name }}</h5>
                    <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ attraction.description }}</p>
                    
                    <div class="flex items-center justify-between">
                       <!-- Rating Stars -->
                       <div class="flex text-yellow-400 text-sm">
                          <i class="bi bi-star-fill" v-for="n in Math.round(attraction.rating)" :key="n"></i>
                          <i class="bi bi-star text-gray-200" v-for="n in (5 - Math.round(attraction.rating))" :key="'empty' + n"></i>
                        </div>

                        <router-link 
                          to="/attractions" 
                          class="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors group-hover:underline"
                        >
                          View Details
                          <i class="bi bi-arrow-right"></i>
                        </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Travel Tips -->
            <div class="mb-10">
              <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span class="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                  <i class="bi bi-lightbulb-fill"></i>
                </span>
                Travel Tips
              </h3>
              <div class="space-y-4">
                <div 
                  v-for="(tip, index) in selectedDestination.tips" 
                  :key="index" 
                  class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors duration-200"
                >
                  <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {{ index + 1 }}
                  </div>
                  <p class="text-gray-700 pt-1">{{ tip }}</p>
                </div>
              </div>
            </div>

            <!-- Quick Info Grid -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="flex items-center gap-4">
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <i class="bi bi-calendar-check text-2xl text-blue-600"></i>
                  </div>
                  <div>
                    <h6 class="font-bold text-gray-900">Best Time</h6>
                    <p class="text-sm text-gray-500">Seasonal Info</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <i class="bi bi-currency-exchange text-2xl text-green-600"></i>
                  </div>
                  <div>
                    <h6 class="font-bold text-gray-900">Currency</h6>
                    <p class="text-sm text-gray-500">Exchange Tips</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="bg-white p-3 rounded-lg shadow-sm">
                    <i class="bi bi-translate text-2xl text-purple-600"></i>
                  </div>
                  <div>
                    <h6 class="font-bold text-gray-900">Language</h6>
                    <p class="text-sm text-gray-500">Local Phrases</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100 min-h-[400px] flex flex-col items-center justify-center">
          <div class="mb-6 p-4 bg-blue-50 rounded-full inline-block">
            <i class="bi bi-compass text-6xl text-blue-200"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-3">Select a Destination</h3>
          <p class="text-gray-500 mb-8 max-w-md mx-auto">
            Choose a destination from the sidebar to explore detailed attractions, tips, and travel information.
          </p>
          <div class="flex flex-wrap gap-3 justify-center">
            <button 
              v-for="dest in destinations" 
              :key="dest.id"
              @click="selectDestination(dest)"
              class="px-5 py-2.5 border-2 border-gray-200 text-gray-600 rounded-full hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              <i class="bi bi-geo-alt mr-2"></i>
              {{ dest.name }}
            </button>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-1">Explore More Destinations</h3>
            <p class="text-gray-500">Discover other amazing places around the world</p>
          </div>
          <router-link 
            to="/destinations" 
            class="flex-shrink-0 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
          >
            View All Destinations
            <i class="bi bi-arrow-right ml-2"></i>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const selectedDestination = ref(null)

const destinations = ref([
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=100',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'The City of Light draws millions of visitors every year with its unforgettable ambiance. Of course, the divine cuisine and vast art collections deserve some of the credit as well.',
    attractions: [
      { 
        id: 1, 
        name: 'Eiffel Tower', 
        description: 'Iconic iron lattice tower on the Champ de Mars in Paris, France.', 
        rating: 4.8, 
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=400' 
      },
      { 
        id: 2, 
        name: 'Louvre Museum', 
        description: 'The world\'s largest art museum and a historic monument in Paris.', 
        rating: 4.7, 
        image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=400' 
      }
    ],
    tips: [
      'Best time to visit: April to June and October to early November',
      'Get a Paris Museum Pass for skip-the-line access',
      'Learn basic French phrases - locals appreciate the effort'
    ]
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'Tokyo offers a seemingly unlimited choice of shopping, entertainment, culture and dining to its visitors.',
    attractions: [
      { 
        id: 5, 
        name: 'Senso-ji Temple', 
        description: 'An ancient Buddhist temple located in Asakusa, Tokyo.', 
        rating: 4.6, 
        image: 'https://images.unsplash.com/photo-1583995080768-42657321314e?w=400' 
      },
      { 
        id: 6, 
        name: 'Tokyo Tower', 
        description: 'A communications and observation tower in Minato, Tokyo.', 
        rating: 4.3, 
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400' 
      }
    ],
    tips: [
      'Get a JR Pass before arrival for unlimited train travel',
      'Visit during cherry blossom season (late March to early April)',
      'Cash is king - carry yen as many places don\'t accept cards'
    ]
  },
  {
    id: 3,
    name: 'New York',
    country: 'USA',
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean.',
    attractions: [
      { 
        id: 9, 
        name: 'Statue of Liberty', 
        description: 'A colossal neoclassical sculpture on Liberty Island.', 
        rating: 4.7, 
        image: 'https://images.unsplash.com/photo-1542397284385-6010376c5337?w=400' 
      },
      { 
        id: 10, 
        name: 'Central Park', 
        description: 'An urban park in Manhattan, New York City.', 
        rating: 4.8, 
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400' 
      }
    ],
    tips: [
      'Get a MetroCard for unlimited subway and bus rides',
      'Walk as much as possible - it\'s the best way to see the city',
      'Book Broadway tickets in advance for best prices'
    ]
  }
])

const selectDestination = (dest) => {
  selectedDestination.value = dest
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (destinations.value.length > 0) {
    selectedDestination.value = destinations.value[0]
  }
})
</script>

<style>
  /* Optional: Add a simple fade-in animation for the content switch */
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Utility for truncating text */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>