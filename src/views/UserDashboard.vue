<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <!-- Page Header -->
    <h1 class="text-3xl font-bold text-gray-900 mb-6">My Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Left Column (Profile & Stats) -->
      <div class="space-y-6">
        
        <!-- Profile Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="p-6 text-center">
            <div class="mb-4">
              <div class="w-24 h-24 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <i class="bi bi-person-fill text-5xl"></i>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900">John Doe</h3>
            <p class="text-gray-500 text-sm">john.doe@example.com</p>
            <p class="text-gray-400 text-xs mt-1">Member since 2024</p>
          </div>
          <div class="border-t border-gray-100 px-6 py-4 bg-gray-50">
            <button class="w-full text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm">
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Quick Stats Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-lg font-bold text-gray-900">Quick Stats</h3>
          </div>
          <div class="divide-y divide-gray-100">
            <div class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div class="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <i class="bi bi-airplane text-xl"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">12 Flights Booked</p>
              </div>
            </div>
            <div class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div class="bg-green-100 text-green-600 p-2 rounded-lg">
                <i class="bi bi-building text-xl"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">8 Hotel Stays</p>
              </div>
            </div>
            <div class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div class="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                <i class="bi bi-star-fill text-xl"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">2,450 Reward Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (Bookings) -->
      <div class="md:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full">
          
          <!-- Card Header -->
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-lg font-bold text-gray-900">My Bookings</h3>
            <router-link 
              to="/" 
              class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              New Booking
            </router-link>
          </div>

          <!-- Tabs Navigation -->
          <div class="border-b border-gray-200 bg-gray-50 px-6">
            <nav class="flex gap-4 -mb-px" aria-label="Tabs">
              <button
                v-for="tab in ['upcoming', 'past', 'cancelled']"
                :key="tab"
                @click="activeTab = tab"
                class="px-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize"
                :class="activeTab === tab 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                {{ tab }}
              </button>
            </nav>
          </div>

          <!-- Tabs Content -->
          <div class="p-6">
            
            <!-- Upcoming Tab -->
            <div v-if="activeTab === 'upcoming'">
              <div v-if="upcomingBookings.length" class="space-y-4">
                <div 
                  v-for="booking in upcomingBookings" 
                  :key="booking.id" 
                  class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <!-- Icon -->
                  <div class="flex-shrink-0 bg-blue-100 p-3 rounded-lg text-blue-600">
                    <i class="bi text-2xl" :class="getIcon(booking.type)"></i>
                  </div>

                  <!-- Details -->
                  <div class="flex-1 min-w-0">
                    <p class="text-base font-semibold text-gray-900 truncate">{{ booking.name }}</p>
                    <p class="text-sm text-gray-500">{{ booking.date }} | <span class="font-medium text-gray-700">${{ booking.price }}</span></p>
                  </div>

                  <!-- Status Badge -->
                  <div class="flex-shrink-0">
                    <span 
                      class="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide"
                      :class="getStatusClass(booking.status)"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-12">
                <i class="bi bi-calendar-x text-4xl text-gray-300 mb-3 block"></i>
                <p class="text-gray-500">No upcoming bookings</p>
              </div>
            </div>

            <!-- Past Tab -->
            <div v-else-if="activeTab === 'past'" class="text-center py-12">
              <i class="bi bi-clock-history text-4xl text-gray-300 mb-3 block"></i>
              <p class="text-gray-500">No past bookings to display</p>
            </div>

            <!-- Cancelled Tab -->
            <div v-else-if="activeTab === 'cancelled'" class="text-center py-12">
               <i class="bi bi-x-octagon text-4xl text-gray-300 mb-3 block"></i>
               <p class="text-gray-500">No cancelled bookings</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('upcoming')

const upcomingBookings = ref([
  {
    id: 1,
    type: 'flight',
    name: 'New York to London',
    date: '2024-03-15',
    price: 650,
    status: 'Confirmed'
  },
  {
    id: 2,
    type: 'hotel',
    name: 'Hilton London',
    date: '2024-03-15 to 2024-03-20',
    price: 1200,
    status: 'Confirmed'
  }
])

// Mapping Vuetify MDI icons to Bootstrap Icons (used in previous Tailwind example)
const getIcon = (type) => {
  const icons = {
    flight: 'bi-airplane',
    hotel: 'bi-building',
    car: 'bi-car-front',
    taxi: 'bi-taxi-front',
    attraction: 'bi-map-marker'
  }
  return icons[type] || 'bi-question-circle'
}

const getStatusClass = (status) => {
  const classes = {
    Confirmed: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700'
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}
</script>