<template>
  <v-container>
    <h1 class="text-h3 mb-6">Complete Your Booking</h1>
    
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">Review</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">Traveler Details</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">Payment</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="4">Confirmation</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Step 1: Review -->
        <v-stepper-content step="1">
          <BookingReview :items="cart" />
          <v-btn color="primary" @click="step = 2">Continue</v-btn>
        </v-stepper-content>

        <!-- Step 2: Traveler Info -->
        <v-stepper-content step="2">
          <TravelerForm 
            v-model="travelerInfo"
            :passengers="totalPassengers"
          />
          <v-btn text @click="step = 1">Back</v-btn>
          <v-btn color="primary" @click="step = 3">Continue</v-btn>
        </v-stepper-content>

        <!-- Step 3: Payment -->
        <v-stepper-content step="3">
          <PaymentForm @submit="processPayment" />
          <v-btn text @click="step = 2">Back</v-btn>
        </v-stepper-content>

        <!-- Step 4: Confirmation -->
        <v-stepper-content step="4">
          <BookingConfirmation :booking="confirmedBooking" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
// ✅ FIXED: Import the services
import { flightService } from '@/services/flightService'
import { hotelService } from '@/services/hotelService'
import BookingReview from '@/components/checkout/BookingReview.vue'
import TravelerForm from '@/components/checkout/TravelerForm.vue'
import PaymentForm from '@/components/checkout/PaymentForm.vue'
import BookingConfirmation from '@/components/checkout/BookingConfirmation.vue'

const step = ref(1)
const bookingStore = useBookingStore()
const travelerInfo = ref({})
const confirmedBooking = ref(null)

const cart = computed(() => bookingStore.cart)
const totalPassengers = computed(() => 
  cart.value.reduce((sum, item) => sum + (item.passengers || 1), 0)
)

const processPayment = async (paymentData) => {
  try {
    // Process different booking types
    const bookings = []
    
    for (const item of cart.value) {
      let result
      switch(item.type) {
        case 'flight':
          result = await flightService.bookFlight({
            ...item,
            travelerInfo: travelerInfo.value,
            payment: paymentData
          })
          break
        case 'hotel':
          result = await hotelService.bookHotel({
            ...item,
            guestInfo: travelerInfo.value,
            payment: paymentData
          })
          break
        // Handle other types...
        default:
          console.warn('Unknown booking type:', item.type)
      }
      if (result) bookings.push(result)
    }
    
    confirmedBooking.value = bookings
    bookingStore.clearCart()
    step.value = 4
    
  } catch (error) {
    console.error('Booking failed:', error)
    // Show error notification
  }
}
</script>