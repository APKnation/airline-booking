<template>
  <v-container>
    <h1 class="text-h3 mb-6">My Dashboard</h1>
    
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="mb-4">
          <v-card-title>Profile</v-card-title>
          <v-card-text class="text-center">
            <v-avatar size="100" color="primary" class="mb-4">
              <v-icon size="64">mdi-account</v-icon>
            </v-avatar>
            <h3 class="text-h5">John Doe</h3>
            <p class="text-body-1 text-grey">john.doe@example.com</p>
            <p class="text-body-2">Member since 2024</p>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary" block>Edit Profile</v-btn>
          </v-card-actions>
        </v-card>

        <v-card>
          <v-card-title>Quick Stats</v-card-title>
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-airplane</v-icon>
              </template>
              <v-list-item-title>12 Flights Booked</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-bed</v-icon>
              </template>
              <v-list-item-title>8 Hotel Stays</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary">mdi-star</v-icon>
              </template>
              <v-list-item-title>2,450 Reward Points</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            My Bookings
            <v-btn color="primary" size="small" to="/">New Booking</v-btn>
          </v-card-title>
          <v-card-text>
            <v-tabs v-model="activeTab">
              <v-tab value="upcoming">Upcoming</v-tab>
              <v-tab value="past">Past</v-tab>
              <v-tab value="cancelled">Cancelled</v-tab>
            </v-tabs>

            <v-window v-model="activeTab" class="mt-4">
              <v-window-item value="upcoming">
                <v-list v-if="upcomingBookings.length">
                  <v-list-item v-for="booking in upcomingBookings" :key="booking.id">
                    <template v-slot:prepend>
                      <v-icon large color="primary">{{ getIcon(booking.type) }}</v-icon>
                    </template>
                    <v-list-item-title>{{ booking.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ booking.date }} | ${{ booking.price }}
                    </v-list-item-subtitle>
                    <template v-slot:append>
                      <v-chip :color="getStatusColor(booking.status)" small>
                        {{ booking.status }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
                <v-alert v-else type="info">No upcoming bookings</v-alert>
              </v-window-item>

              <v-window-item value="past">
                <v-alert type="info">No past bookings to display</v-alert>
              </v-window-item>

              <v-window-item value="cancelled">
                <v-alert type="info">No cancelled bookings</v-alert>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

const getIcon = (type) => {
  const icons = {
    flight: 'mdi-airplane',
    hotel: 'mdi-bed',
    car: 'mdi-car',
    taxi: 'mdi-taxi',
    attraction: 'mdi-map-marker'
  }
  return icons[type] || 'mdi-help'
}

const getStatusColor = (status) => {
  const colors = {
    Confirmed: 'success',
    Pending: 'warning',
    Cancelled: 'error'
  }
  return colors[status] || 'grey'
}
</script>