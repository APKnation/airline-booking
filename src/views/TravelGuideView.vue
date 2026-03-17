<template>
  <div class="container py-5">
    <!-- Page Header -->
    <div class="row mb-5">
      <div class="col-12 text-center">
        <h1 class="display-4 fw-bold text-primary mb-3">
          <i class="bi bi-compass me-3"></i>
          Travel Guide
        </h1>
        <p class="lead text-muted mb-0">
          Discover amazing destinations, attractions, and travel tips from around the world
        </p>
      </div>
    </div>

    <div class="row">
      <!-- Left Sidebar - Destinations List -->
      <div class="col-12 col-lg-4 mb-4 mb-lg-0">
        <div class="card border-0 shadow-lg rounded-4 h-100">
          <div class="card-header bg-success text-white py-4 rounded-top-4">
            <h2 class="h4 mb-0 fw-bold">
              <i class="bi bi-globe-americas me-2"></i>
              Popular Destinations
            </h2>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush rounded-bottom-4">
              <button
                v-for="dest in destinations"
                :key="dest.id"
                @click="selectDestination(dest)"
                class="list-group-item list-group-item-action border-0 py-4 px-4"
                :class="{ 'active': selectedDestination?.id === dest.id, 'bg-light': selectedDestination?.id !== dest.id }"
              >
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-3">
                    <img 
                      :src="dest.thumbnail" 
                      :alt="dest.name" 
                      class="rounded-circle border border-2"
                      :class="selectedDestination?.id === dest.id ? 'border-white' : 'border-primary'"
                      style="width: 60px; height: 60px; object-fit: cover;"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold mb-1" :class="selectedDestination?.id === dest.id ? 'text-white' : 'text-dark'">
                      {{ dest.name }}
                    </h5>
                    <p class="mb-0 small" :class="selectedDestination?.id === dest.id ? 'text-white-75' : 'text-muted'">
                      <i class="bi bi-geo-alt me-1"></i>
                      {{ dest.country }}
                    </p>
                  </div>
                  <div v-if="selectedDestination?.id === dest.id" class="flex-shrink-0">
                    <i class="bi bi-chevron-right text-white"></i>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content - Destination Details -->
      <div class="col-12 col-lg-8" v-if="selectedDestination">
        <div class="card border-0 shadow-lg rounded-4">
          <!-- Destination Hero Image -->
          <div class="position-relative overflow-hidden rounded-top-4" style="height: 300px;">
            <img 
              :src="selectedDestination.image" 
              :alt="selectedDestination.name" 
              class="card-img-top w-100 h-100"
              style="object-fit: cover;"
            />
            <div class="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-to-top">
              <h2 class="display-5 fw-bold text-white mb-2">{{ selectedDestination.name }}</h2>
              <div class="d-flex align-items-center text-white-75">
                <i class="bi bi-geo-alt me-2"></i>
                <span class="fs-5">{{ selectedDestination.country }}</span>
              </div>
            </div>
          </div>

          <div class="card-body p-4 p-md-5">
            <!-- Destination Description -->
            <div class="mb-5">
              <p class="lead text-muted">{{ selectedDestination.description }}</p>
            </div>

            <!-- Top Attractions -->
            <div class="mb-5">
              <h3 class="h3 fw-bold text-primary mb-4">
                <i class="bi bi-star-fill me-2"></i>
                Top Attractions
              </h3>
              <div class="row g-4">
                <div class="col-12 col-md-6" v-for="attraction in selectedDestination.attractions" :key="attraction.id">
                  <a href="#" class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl md:flex-row md:max-w-xl attraction-card">
                    <!-- Attraction Image -->
                    <div class="relative w-full md:w-48 mb-4 md:mb-0">
                      <img 
                        :src="attraction.image" 
                        :alt="attraction.name" 
                        class="object-cover w-full rounded-base h-48 md:h-auto"
                      />
                      <div class="absolute top-0 end-0 m-3">
                        <span class="px-3 py-1 bg-neutral-secondary-medium text-body rounded-full text-sm font-semibold">
                          <i class="bi bi-star-fill me-1"></i>
                          {{ attraction.rating }}
                        </span>
                      </div>
                    </div>
                    
                    <div class="flex flex-col justify-between md:p-4 leading-normal flex-1">
                      <!-- Header Section -->
                      <div class="mb-4">
                        <h5 class="text-2xl font-bold tracking-tight text-heading mb-2">
                          {{ attraction.name }}
                        </h5>
                        <p class="text-body mb-3">{{ attraction.description }}</p>
                      </div>

                      <!-- Footer with Rating and Button -->
                      <div class="flex items-center justify-between">
                        <div class="text-yellow-500">
                          <i class="bi bi-star-fill" v-for="n in Math.round(attraction.rating)" :key="n"></i>
                          <i class="bi bi-star text-gray-300" v-for="n in (5 - Math.round(attraction.rating))" :key="'empty' + n"></i>
                        </div>
                        
                        <router-link to="/attractions" class="inline-flex items-center w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                          Book Now
                          <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
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
              <h3 class="h3 fw-bold text-primary mb-4">
                <i class="bi bi-lightbulb-fill me-2"></i>
                Travel Tips
              </h3>
              <div class="row g-3">
                <div class="col-12" v-for="(tip, index) in selectedDestination.tips" :key="index">
                  <div class="flex flex-col items-center bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs md:flex-row md:max-w-xl md:flex-row md:max-w-xl tip-card">
                    <!-- Tip Icon -->
                    <div class="w-full md:w-16 mb-4 md:mb-0 flex items-center justify-center">
                      <div class="rounded-full bg-neutral-secondary-medium p-3">
                        <i class="bi bi-lightbulb text-heading text-xl"></i>
                      </div>
                    </div>
                    
                    <div class="flex flex-col justify-between md:p-4 leading-normal flex-1">
                      <!-- Tip Content -->
                      <div class="flex items-center justify-between">
                        <p class="text-body mb-0 flex-1">{{ tip }}</p>
                        <span class="px-3 py-1 bg-neutral-secondary-medium text-body rounded-full text-sm font-semibold ms-4">
                          Tip {{ index + 1 }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Info -->
            <div class="mt-5 pt-4 border-top">
              <div class="row g-4">
                <div class="col-12 col-md-4">
                  <div class="text-center p-3">
                    <div class="mb-3">
                      <i class="bi bi-calendar-check display-6 text-primary"></i>
                    </div>
                    <h6 class="fw-bold mb-2">Best Time to Visit</h6>
                    <p class="text-muted small mb-0">Check seasonal info for optimal travel</p>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="text-center p-3">
                    <div class="mb-3">
                      <i class="bi bi-currency-exchange display-6 text-primary"></i>
                    </div>
                    <h6 class="fw-bold mb-2">Local Currency</h6>
                    <p class="text-muted small mb-0">Currency info and exchange tips</p>
                  </div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="text-center p-3">
                    <div class="mb-3">
                      <i class="bi bi-translate display-6 text-primary"></i>
                    </div>
                    <h6 class="fw-bold mb-2">Language</h6>
                    <p class="text-muted small mb-0">Local language and useful phrases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="col-12 col-lg-8" v-else>
        <div class="card border-0 shadow-lg rounded-4">
          <div class="card-body text-center p-5">
            <div class="mb-4">
              <i class="bi bi-compass display-1 text-primary opacity-25"></i>
            </div>
            <h3 class="h3 fw-bold text-primary mb-3">Select a Destination</h3>
            <p class="text-muted mb-4">
              Choose a destination from the list to explore attractions, tips, and travel information
            </p>
            <div class="d-flex flex-wrap gap-3 justify-content-center">
              <button 
                v-for="dest in destinations" 
                :key="dest.id"
                @click="selectDestination(dest)"
                class="btn btn-outline-primary"
              >
                <i class="bi bi-geo-alt me-2"></i>
                {{ dest.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- More Destinations Section -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="card border-0 bg-light rounded-4 p-4">
          <div class="row align-items-center">
            <div class="col-12 col-md-8">
              <h3 class="h3 fw-bold text-primary mb-2">Explore More Destinations</h3>
              <p class="text-muted mb-0">Discover other amazing places around the world</p>
            </div>
            <div class="col-12 col-md-4 text-md-end mt-3 mt-md-0">
              <router-link to="/destinations" class=" btn btn-info px-4">
                <i class="bi bi-arrow-right me-2"></i>
                View All
              </router-link>
            </div>
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

