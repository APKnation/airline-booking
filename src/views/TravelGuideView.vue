<template>
  <div class="container py-5">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-5">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
          <i class="bi bi-compass me-3"></i>
          Travel Guide
        </h1>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Sidebar - Destinations List -->
      <div class="w-full lg:w-1/4 mb-4 lg:mb-0">
        <div class="bg-white rounded-lg shadow-lg p-4 h-full">
          <div class="bg-green-600 text-white p-4 rounded-t-lg">
            <h2 class="text-2xl font-bold">
              <i class="bi bi-globe-americas me-2"></i>
              Popular Destinations
            </h2>
          </div>
          <div class="p-0">
            <div class="space-y-2">
              <button
                v-for="dest in destinations"
                :key="dest.id"
                @click="selectDestination(dest)"
                class="w-full text-left p-4 border-0 hover:bg-gray-50 transition-colors duration-200"
                :class="{ 'bg-blue-50 text-blue-600 border-l-2 border-l-blue-600': selectedDestination?.id === dest.id, 'bg-white text-gray-900': selectedDestination?.id !== dest.id }"
              >
                <div class="flex items-center">
                  <img 
                    :src="dest.thumbnail" 
                    :alt="dest.name" 
                    class="w-12 h-12 rounded-lg object-cover mr-3"
                  />
                  <div class="flex-1">
                    <h5 class="font-bold" :class="selectedDestination?.id === dest.id ? 'text-white' : 'text-gray-900'">
                      {{ dest.name }}
                    </h5>
                    <p class="text-sm" :class="selectedDestination?.id === dest.id ? 'text-blue-100' : 'text-gray-600'">
                      {{ dest.country }}
                    </p>
                  </div>
                  <div v-if="selectedDestination?.id === dest.id" class="text-white">
                    <i class="bi bi-chevron-right"></i>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content - Destination Details -->
      <div class="w-full lg:w-3/4" v-if="selectedDestination">
        <div class="bg-white rounded-lg shadow-lg">
          <!-- Destination Hero Image -->
          <div class="relative overflow-hidden rounded-t-lg h-64">
            <img 
              :src="selectedDestination.image" 
              :alt="selectedDestination.name" 
              class="w-full h-full object-cover"
            />
            <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-transparent to-black/50">
              <h2 class="text-3xl font-bold text-white mb-2">{{ selectedDestination.name }}</h2>
              <div class="flex items-center text-white/75">
                <i class="bi bi-geo-alt mr-2"></i>
                <span class="text-lg">{{ selectedDestination.country }}</span>
              </div>
            </div>
          </div>

          <div class="p-4 md:p-6">
            <!-- Destination Description -->
            <div class="mb-5">
              <p class="text-lg text-gray-600">{{ selectedDestination.description }}</p>
            </div>

            <!-- Top Attractions -->
            <div class="mb-5">
              <h3 class="text-2xl font-bold text-blue-600 mb-4">
                <i class="bi bi-star-fill me-2"></i>
                Top Attractions
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="attraction in selectedDestination.attractions" :key="attraction.id" class="w-full">
                  <a href="#" class="flex flex-col items-center bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:shadow-md transition-shadow duration-200 attraction-card">
                    <!-- Attraction Image -->
                    <div class="relative w-full md:w-48 mb-4 md:mb-0">
                      <img 
                        :src="attraction.image" 
                        :alt="attraction.name" 
                        class="object-cover w-full rounded-lg h-48 md:h-auto"
                      />
                      <div class="absolute top-0 right-0 m-3">
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          <i class="bi bi-star-fill me-1"></i>
                          {{ attraction.rating }}
                        </span>
                      </div>
                    </div>
                    
                    <div class="flex flex-col justify-between md:p-4 flex-1">
                      <!-- Header Section -->
                      <div class="mb-4">
                        <h5 class="text-2xl font-bold text-gray-900 mb-2">
                          {{ attraction.name }}
                        </h5>
                        <p class="text-gray-600 mb-3">{{ attraction.description }}</p>
                      </div>

                      <!-- Footer with Rating and Button -->
                      <div class="flex items-center justify-between">
                        <div class="text-yellow-500">
                          <i class="bi bi-star-fill" v-for="n in Math.round(attraction.rating)" :key="n"></i>
                          <i class="bi bi-star text-gray-300" v-for="n in (5 - Math.round(attraction.rating))" :key="'empty' + n"></i>
                        </div>
                        
                        <router-link to="/attractions" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Book Now
                          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </router-link>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- Travel Tips -->
            <div>
              <h3 class="text-2xl font-bold text-blue-600 mb-4">
                <i class="bi bi-lightbulb me-2"></i>
                Travel Tips
              </h3>
              <div class="grid grid-cols-1 gap-3">
                <div v-for="(tip, index) in selectedDestination.tips" :key="index" class="w-full">
                  <div class="flex flex-col items-center bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:shadow-md transition-shadow duration-200 tip-card">
                    <!-- Tip Icon -->
                    <div class="w-full md:w-16 mb-4 md:mb-0 flex items-center justify-center">
                      <div class="rounded-full bg-blue-100 p-3">
                        <i class="bi bi-lightbulb text-blue-600 text-xl"></i>
                      </div>
                    </div>
                    
                    <div class="flex flex-col justify-between md:p-4 flex-1">
                      <!-- Tip Content -->
                      <div class="flex items-center justify-between">
                        <p class="text-gray-600 mb-0 flex-1">{{ tip }}</p>
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold ml-4">
                          Tip {{ index + 1 }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="mt-5 pt-4 border-t border-gray-200">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center p-3">
                  <div class="mb-3">
                    <i class="bi bi-calendar-check text-3xl text-blue-600"></i>
                  </div>
                  <h6 class="font-bold mb-2 text-lg">Best Time to Visit</h6>
                  <p class="text-gray-600 text-sm mb-0">Check seasonal info for optimal travel</p>
                </div>
                <div class="text-center p-3">
                  <div class="mb-3">
                    <i class="bi bi-currency-exchange text-3xl text-blue-600"></i>
                  </div>
                  <h6 class="font-bold mb-2 text-lg">Local Currency</h6>
                  <p class="text-gray-600 text-sm mb-0">Currency info and exchange tips</p>
                </div>
                <div class="text-center p-3">
                  <div class="mb-3">
                    <i class="bi bi-translate text-3xl text-blue-600"></i>
                  </div>
                  <h6 class="font-bold mb-2 text-lg">Language</h6>
                  <p class="text-gray-600 text-sm mb-0">Local language and useful phrases</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg shadow-lg p-8">
      <div class="text-center">
        <div class="mb-4">
          <i class="bi bi-compass text-6xl text-blue-200"></i>
        </div>
        <h3 class="text-2xl font-bold text-blue-600 mb-3">Select a Destination</h3>
        <p class="text-gray-600 mb-4">
          Choose a destination from the list to explore attractions, tips, and travel information
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <button 
            v-for="dest in destinations" 
            :key="dest.id"
            @click="selectDestination(dest)"
            class="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            <i class="bi bi-geo-alt mr-2"></i>
            {{ dest.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- More Destinations Section -->
    <div class="mt-5">
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="mb-2 md:mb-0">
            <h3 class="text-2xl font-bold text-blue-600 mb-2">Explore More Destinations</h3>
            <p class="text-gray-600">Discover other amazing places around the world</p>
          </div>
          <div class="text-right">
            <router-link to="/destinations" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <i class="bi bi-arrow-right mr-2"></i>
              View All
            </router-link>
          </div>
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
    description: 'The City of Light draws millions of visitors every year with its unforgettable ambiance. Of course, the divine cuisine and vast art collections deserve some of the credit as well. The Seine River bisects the city, dividing it into the Rive Gauche (Left Bank) and Rive Droite (Right Bank).',
    attractions: [
      { 
        id: 1, 
        name: 'Eiffel Tower', 
        description: 'Iconic iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.', 
        rating: 4.8, 
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?w=400' 
      },
      { 
        id: 2, 
        name: 'Louvre Museum', 
        description: 'The world\'s largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine.', 
        rating: 4.7, 
        image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=400' 
      },
      { 
        id: 3, 
        name: 'Notre-Dame Cathedral', 
        description: 'A medieval Catholic cathedral on the Île de la Cité in the 4th arrondissement of Paris. The cathedral is consecrated to the Virgin Mary.', 
        rating: 4.6, 
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400' 
      },
      { 
        id: 4, 
        name: 'Arc de Triomphe', 
        description: 'One of the most famous monuments in Paris, standing at the western end of the Champs-Élysées at the center of Place Charles de Gaulle.', 
        rating: 4.5, 
        image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400' 
      }
    ],
    tips: [
      'Best time to visit: April to June and October to early November',
      'Get a Paris Museum Pass for skip-the-line access to major attractions',
      'Learn basic French phrases - locals appreciate the effort',
      'Use the Metro for convenient and affordable transportation',
      'Visit museums on free admission days (first Sunday of each month)',
      'Try local bakeries for authentic croissants and baguettes'
    ]
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'Tokyo offers a seemingly unlimited choice of shopping, entertainment, culture and dining to its visitors. The city\'s history can be appreciated in districts such as Asakusa and in many excellent museums, historic temples and gardens.',
    attractions: [
      { 
        id: 5, 
        name: 'Senso-ji Temple', 
        description: 'An ancient Buddhist temple located in Asakusa, Tokyo, Japan. It is Tokyo\'s oldest temple, and one of its most significant.', 
        rating: 4.6, 
        image: 'https://images.unsplash.com/photo-1583995080768-42657321314e?w=400' 
      },
      { 
        id: 6, 
        name: 'Tokyo Tower', 
        description: 'A communications and observation tower in the Shiba-koen district of Minato, Tokyo, Japan. At 332.9 meters, it is the second-tallest structure in Japan.', 
        rating: 4.3, 
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400' 
      },
      { 
        id: 7, 
        name: 'Shibuya Crossing', 
        description: 'The world\'s busiest pedestrian crossing, located in front of Shibuya Station Hachikō exit in Shibuya, Tokyo, Japan.', 
        rating: 4.4, 
        image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=400' 
      },
      { 
        id: 8, 
        name: 'Meiji Shrine', 
        description: 'A Shinto shrine in Shibuya, Tokyo, that is dedicated to the deified spirits of Emperor Meiji and his wife, Empress Shōken.', 
        rating: 4.5, 
        image: 'https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?w=400' 
      }
    ],
    tips: [
      'Get a JR Pass for unlimited train travel across Japan (must purchase before arrival)',
      'Visit during cherry blossom season (late March to early April) for breathtaking views',
      'Cash is still king - carry yen with you as many places don\'t accept credit cards',
      'Bow when greeting people as a sign of respect',
      'Remove your shoes when entering traditional restaurants or homes',
      'Purchase a Suica or Pasmo card for convenient public transportation'
    ]
  },
  {
    id: 3,
    name: 'New York',
    country: 'USA',
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that\'s among the world\'s major commercial, financial and cultural centers.',
    attractions: [
      { 
        id: 9, 
        name: 'Statue of Liberty', 
        description: 'A colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States.', 
        rating: 4.7, 
        image: 'https://images.unsplash.com/photo-1542397284385-6010376c5337?w=400' 
      },
      { 
        id: 10, 
        name: 'Central Park', 
        description: 'An urban park in New York City located between the Upper West and Upper East Sides of Manhattan. It is the fifth-largest park in the city.', 
        rating: 4.8, 
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400' 
      }
    ],
    tips: [
      'Get a MetroCard for unlimited subway and bus rides',
      'Visit museums on pay-what-you-wish days',
      'Walk as much as possible - it\'s the best way to experience the city',
      'Try pizza from local pizzerias in Brooklyn',
      'Book Broadway tickets in advance for best prices'
    ]
  }
])

const selectDestination = (dest) => {
  selectedDestination.value = dest
  // Scroll to top when selecting new destination
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Select first destination by default on mount
onMounted(() => {
  if (destinations.value.length > 0) {
    selectedDestination.value = destinations.value[0]
  }
})
</script>

