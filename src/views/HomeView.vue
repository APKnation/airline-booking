<template>
  <div class="home-page">
    <!-- MODERN HERO SECTION -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute inset-0">
          <div class="absolute top-20 left-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-pulse"></div>
          <div class="absolute top-40 right-20 w-48 h-48 bg-primary-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div class="absolute bottom-20 left-1/4 w-40 h-40 bg-accent-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          <div class="absolute bottom-40 right-1/3 w-36 h-36 bg-primary-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-secondary-900/20 to-transparent"></div>
      </div>

      <!-- Main Content -->
      <div class="relative container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Column - Text Content -->
          <div class="space-y-8 animate-slide-up">
            <div class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <span class="text-yellow-300">🌟 Featured</span>
              <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span class="text-white">Worldwide Travel</span>
            </div>
            
            <h1 class="text-5xl lg:text-7xl font-bold text-white leading-tight">
              <span class="text-gradient">Dream</span>, Discover,
              <span class="text-gradient">Explore</span>
            </h1>
            
            <p class="text-xl lg:text-2xl text-secondary-200 leading-relaxed max-w-2xl">
              Your passport to unforgettable experiences. Book flights, hotels, and adventures 
              across 1000+ destinations with our AI-powered travel assistant.
            </p>

            <!-- Interactive Search Bar -->
            <div class="space-y-4">
              <div class="flex flex-wrap gap-2 justify-center lg:justify-start">
                <button 
                  v-for="tab in searchTabs" 
                  :key="tab.id"
                  :class="[
                    'px-6 py-3 rounded-lg font-medium transition-all duration-200',
                    activeTab === tab.id 
                      ? 'bg-white text-primary-700 shadow-medium' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  ]"
                  @click="activeTab = tab.id"
                >
                  <i :class="tab.icon + ' mr-2'"></i>
                  {{ tab.label }}
                </button>
              </div>
              
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-strong">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div class="relative">
                    <i class="bi bi-geo-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
                    <input 
                      type="text" 
                      placeholder="Where do you want to go?"
                      v-model="searchQuery"
                      class="w-full pl-12 pr-4 py-3 rounded-lg bg-white/90 border border-white/20 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                  </div>
                  <div class="relative">
                    <i class="bi bi-calendar absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
                    <input 
                      type="text" 
                      placeholder="Check-in — Check-out"
                      @focus="showDatePicker = true"
                      class="w-full pl-12 pr-4 py-3 rounded-lg bg-white/90 border border-white/20 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                  </div>
                  <div class="relative">
                    <i class="bi bi-people absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
                    <input 
                      type="text" 
                      placeholder="2 adults, 0 children"
                      class="w-full pl-12 pr-4 py-3 rounded-lg bg-white/90 border border-white/20 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                  </div>
                  <button class="btn-primary flex items-center justify-center space-x-2">
                    <i class="bi bi-search"></i>
                    <span>Explore</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-white">500K+</div>
                <div class="text-secondary-300">Happy Travelers</div>
              </div>
              <div class="hidden lg:block w-px h-12 bg-white/20"></div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">1000+</div>
                <div class="text-secondary-300">Destinations</div>
              </div>
              <div class="hidden lg:block w-px h-12 bg-white/20"></div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">24/7</div>
                <div class="text-secondary-300">Support</div>
              </div>
              <div class="hidden lg:block w-px h-12 bg-white/20"></div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">4.9</div>
                <div class="text-secondary-300">Rating</div>
              </div>
            </div>
          </div>

          <!-- Right Column - Hero Image -->
          <div class="relative animate-fade-in">
            <div class="relative">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Travel Adventure"
                class="w-full h-auto rounded-3xl shadow-2xl"
              >
              
              <!-- Floating Testimonial Cards -->
              <div class="absolute -top-8 -left-8 bg-white rounded-2xl p-4 shadow-strong animate-bounce-in">
                <div class="flex items-center space-x-3 mb-3">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="w-10 h-10 rounded-full">
                  <div>
                    <div class="flex text-yellow-400">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                    <p class="text-sm text-secondary-600 italic">"Best travel experience ever!"</p>
                    <span class="text-xs text-secondary-500">— Sarah M.</span>
                  </div>
                </div>
              </div>
              
              <div class="absolute -bottom-6 -right-6 bg-accent-500 text-white rounded-2xl p-4 shadow-strong animate-bounce-in delay-500">
                <div class="flex items-center space-x-3">
                  <i class="bi bi-tag text-2xl"></i>
                  <div>
                    <div class="text-2xl font-bold">$299</div>
                    <div class="text-sm">Bali Special</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
        <span class="text-white/80 text-sm mb-2 block">Scroll to explore</span>
        <div class="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- FEATURED CATEGORIES SECTION -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">Find Your Perfect Getaway</h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">Browse curated travel experiences tailored to your style</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="group card card-hover p-8 text-center cursor-pointer transition-all duration-300"
            @mouseenter="hoveredCategory = category.id"
            @mouseleave="hoveredCategory = null"
          >
            <div 
              class="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110"
              :style="{ backgroundColor: category.color + '20' }"
            >
              <i :class="category.icon" :style="{ color: category.color }"></i>
            </div>
            <h3 class="text-xl font-semibold text-secondary-900 mb-3">{{ category.title }}</h3>
            <p class="text-secondary-600 mb-6">{{ category.description }}</p>
            <div class="flex justify-center space-x-6 text-sm text-secondary-500 mb-6">
              <span class="flex items-center">
                <i class="bi bi-clock mr-2"></i>
                {{ category.duration }}
              </span>
              <span class="flex items-center">
                <i class="bi bi-people mr-2"></i>
                {{ category.groupSize }}
              </span>
            </div>
            <button 
              class="inline-flex items-center space-x-2 font-semibold transition-all duration-200 group-hover:translate-x-1"
              :style="{ color: category.color }"
            >
              Explore
              <i class="bi bi-arrow-right transition-transform duration-200 group-hover:translate-x-1"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS SECTION -->
    <section class="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">Travel Made Simple</h2>
          <p class="text-xl text-secondary-600 max-w-3xl mx-auto">Your journey from dream to reality in three easy steps</p>
        </div>

        <div class="relative">
          <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent transform -translate-y-1/2"></div>
          
          <div class="grid md:grid-cols-3 gap-8 relative">
            <div class="group text-center">
              <div class="relative mb-8">
                <div class="w-20 h-20 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-medium group-hover:scale-110 transition-transform duration-300">
                  01
                </div>
                <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300">
                  <i class="bi bi-search text-primary-600 text-xl"></i>
                </div>
              </div>
              <h3 class="text-2xl font-semibold text-secondary-900 mb-4 mt-8">Discover & Plan</h3>
              <p class="text-secondary-600 leading-relaxed">Use our AI-powered search to find perfect destinations based on your preferences, budget, and travel style.</p>
            </div>
            
            <div class="group text-center">
              <div class="relative mb-8">
                <div class="w-20 h-20 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-medium group-hover:scale-110 transition-transform duration-300">
                  02
                </div>
                <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300">
                  <i class="bi bi-calendar-check text-primary-600 text-xl"></i>
                </div>
              </div>
              <h3 class="text-2xl font-semibold text-secondary-900 mb-4 mt-8">Book & Customize</h3>
              <p class="text-secondary-600 leading-relaxed">Secure your bookings with flexible options. Add experiences, transportation, and special requests.</p>
            </div>
            
            <div class="group text-center">
              <div class="relative mb-8">
                <div class="w-20 h-20 mx-auto bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-medium group-hover:scale-110 transition-transform duration-300">
                  03
                </div>
                <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300">
                  <i class="bi bi-airplane text-primary-600 text-xl"></i>
                </div>
              </div>
              <h3 class="text-2xl font-semibold text-secondary-900 mb-4 mt-8">Travel & Enjoy</h3>
              <p class="text-secondary-600 leading-relaxed">Receive real-time updates, local tips, and 24/7 support throughout your journey. Just enjoy the experience!</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED DESTINATIONS CARDS -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <div class="mb-6 lg:mb-0">
            <h2 class="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">Trending Destinations</h2>
            <p class="text-xl text-secondary-600 max-w-2xl">Inspired by thousands of traveler experiences</p>
          </div>
          <button class="btn-primary">
            View All
            <i class="bi bi-arrow-right ml-2"></i>
          </button>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="destination in destinations" 
            :key="destination.id"
            class="group card card-hover overflow-hidden cursor-pointer"
            @mouseenter="hoveredDestination = destination.id"
            @mouseleave="hoveredDestination = null"
          >
            <div class="relative h-64 overflow-hidden">
              <img 
                :src="destination.image" 
                :alt="destination.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute top-4 right-4 flex space-x-2">
                <div class="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-1">
                  <i class="bi bi-thermometer-half text-primary-600"></i>
                  <span class="text-sm font-medium">{{ destination.temperature }}</span>
                </div>
                <button class="bg-white/90 backdrop-blur-sm rounded-lg p-2 hover:bg-white transition-colors duration-200">
                  <i class="bi bi-heart text-secondary-600 hover:text-red-500 transition-colors duration-200"></i>
                </button>
              </div>
              <div 
                class="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold"
                :style="{ backgroundColor: destination.badgeColor }"
              >
                {{ destination.badge }}
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-semibold text-secondary-900">{{ destination.name }}</h3>
                <div class="flex items-center space-x-1 text-yellow-500">
                  <i class="bi bi-star-fill"></i>
                  <span class="text-sm font-medium text-secondary-700">{{ destination.rating }}</span>
                </div>
              </div>
              
              <p class="text-secondary-600 mb-6 line-clamp-2">{{ destination.description }}</p>
              
              <div class="flex justify-between items-center">
                <div class="flex items-baseline space-x-1">
                  <span class="text-sm text-secondary-500">From</span>
                  <span class="text-2xl font-bold text-primary-600">${{ destination.price }}</span>
                  <span class="text-sm text-secondary-500">/person</span>
                </div>
                <button class="btn-accent text-sm px-4 py-2">
                  Book Now
                  <i class="bi bi-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS SECTION -->
    <section class="benefits-section">
      <div class="container">
        <div class="benefits-grid">
          <div class="benefits-text">
            <h2>Why Choose Us?</h2>
            <p class="benefits-description">
              We're not just another booking platform. We're your personal travel companion, 
              dedicated to making every journey unforgettable.
            </p>
            
            <div class="benefits-list">
              <div class="benefit-item">
                <div class="benefit-icon">
                  <i class="bi bi-shield-check"></i>
                </div>
                <div>
                  <h4>Best Price Guarantee</h4>
                  <p>Find a better price? We'll match it and give you 10% extra credit.</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">
                  <i class="bi bi-headset"></i>
                </div>
                <div>
                  <h4>24/7 Support</h4>
                  <p>Round-the-clock assistance in 15 languages from real travel experts.</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">
                  <i class="bi bi-arrow-repeat"></i>
                </div>
                <div>
                  <h4>Flexible Cancellation</h4>
                  <p>Most bookings can be cancelled or changed for free up to 24 hours before.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="benefits-visual">
            <div class="benefits-card glass-card">
              <div class="benefits-card-content">
                <h3>Travel Smart with Our App</h3>
                <p>Get instant notifications, digital itineraries, and exclusive mobile-only deals.</p>
                
                <div class="app-download">
                  <button class="app-store-btn">
                    <i class="bi bi-apple"></i>
                    <div>
                      <span>Download on the</span>
                      <span>App Store</span>
                    </div>
                  </button>
                  
                  <button class="play-store-btn">
                    <i class="bi bi-google-play"></i>
                    <div>
                      <span>Get it on</span>
                      <span>Google Play</span>
                    </div>
                  </button>
                </div>
                
                <div class="qr-code">
                  <div class="qr-placeholder">
                    Scan to download
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      activeTab: 'flights',
      searchQuery: '',
      hoveredCategory: null,
      hoveredDestination: null,
      showDatePicker: false,
      searchTabs: [
        { id: 'flights', label: 'Flights', icon: 'bi bi-airplane' },
        { id: 'hotels', label: 'Hotels', icon: 'bi bi-building' },
        { id: 'packages', label: 'Packages', icon: 'bi bi-suitcase' },
        { id: 'cars', label: 'Cars', icon: 'bi bi-car-front' }
      ],
      categories: [
        {
          id: 1,
          title: 'Beach Escapes',
          description: 'Relax on pristine shores with crystal clear waters',
          icon: 'bi bi-umbrella',
          color: '#00b4d8',
          duration: '3-7 days',
          groupSize: '2-4 people'
        },
        {
          id: 2,
          title: 'City Breaks',
          description: 'Explore vibrant cities and urban culture',
          icon: 'bi bi-buildings',
          color: '#ff6b6b',
          duration: '2-5 days',
          groupSize: '1-2 people'
        },
        {
          id: 3,
          title: 'Mountain Adventures',
          description: 'Hike through breathtaking alpine landscapes',
          icon: 'bi bi-mountain',
          color: '#06d6a0',
          duration: '5-10 days',
          groupSize: '2-6 people'
        },
        {
          id: 4,
          title: 'Cultural Journeys',
          description: 'Immerse yourself in rich history and traditions',
          icon: 'bi bi-geo-alt',
          color: '#7209b7',
          duration: '7-14 days',
          groupSize: '4-8 people'
        }
      ],
      destinations: [
        {
          id: 1,
          name: 'Bali, Indonesia',
          image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
          temperature: '28°C',
          badge: 'Popular',
          badgeColor: '#4361ee',
          rating: 4.8,
          description: 'Tropical paradise with lush landscapes and vibrant culture',
          price: 499
        },
        {
          id: 2,
          name: 'Santorini, Greece',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
          temperature: '25°C',
          badge: 'Romantic',
          badgeColor: '#ff6b6b',
          rating: 4.9,
          description: 'Stunning white-washed buildings with breathtaking sea views',
          price: 699
        },
        {
          id: 3,
          name: 'Kyoto, Japan',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
          temperature: '22°C',
          badge: 'Cultural',
          badgeColor: '#06d6a0',
          rating: 4.7,
          description: 'Ancient temples, traditional gardens, and rich heritage',
          price: 599
        },
        {
          id: 4,
          name: 'Swiss Alps',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          temperature: '18°C',
          badge: 'Adventure',
          badgeColor: '#7209b7',
          rating: 4.9,
          description: 'Majestic mountains and pristine alpine scenery',
          price: 799
        }
      ]
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery) {
        console.log('Searching for:', this.searchQuery, 'Tab:', this.activeTab);
        // Implement search logic here
      }
    }
  }
}
</script>