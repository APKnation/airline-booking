<template>
  <div class="checkout-container">
    <!-- Animated Background -->
    <div class="background-animation">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <!-- Progress Indicator -->
    <div class="progress-tracker">
      <div class="container">
        <div class="progress-steps">
          <div 
            v-for="(step, index) in steps" 
            :key="step.id"
            class="step"
            :class="{ 
              'active': currentStep === step.id,
              'completed': currentStep > step.id
            }"
            @click="goToStep(step.id)"
          >
            <div class="step-icon">
              <span v-if="currentStep > step.id" class="check-icon">
                ✓
              </span>
              <span v-else class="step-number">{{ index + 1 }}</span>
            </div>
            <span class="step-label">{{ step.label }}</span>
          </div>
          <div class="progress-line">
            <div 
              class="progress-fill" 
              :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container main-container">
      <!-- Header -->
      <div class="header-section text-center mb-5">
        <h1 class="main-title gradient-text">Complete Your Booking</h1>
        <p class="subtitle text-muted">
          Review your order, enter traveler details, and complete payment securely.
        </p>
      </div>

      <div class="row justify-content-center">
        <!-- Main Content -->
        <div class="col-lg-8">
          <div class="checkout-card card border-0 shadow-lg">
            <!-- Step Content -->
            <div class="card-body p-4 p-md-5">
              
              <!-- Step 1: Review -->
              <transition name="slide-fade">
                <div v-if="currentStep === 1" class="step-content">
                  <div class="step-header mb-5">
                    <div class="step-icon-circle">
                      <i class="bi bi-cart-check"></i>
                    </div>
                    <div>
                      <h2 class="step-title mb-2">Review Your Selection</h2>
                      <p class="step-subtitle text-muted mb-0">
                        Please verify your booking details before proceeding
                      </p>
                    </div>
                  </div>

                  <BookingReview :items="cart" />

                  <div class="step-actions d-flex justify-content-end mt-5">
                    <button 
                      class="btn btn-primary btn-continue" 
                      @click="currentStep = 2"
                      :disabled="cart.length === 0"
                    >
                      <span>Continue to Traveler Details</span>
                      <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </transition>

              <!-- Step 2: Traveler Info -->
              <transition name="slide-fade">
                <div v-if="currentStep === 2" class="step-content">
                  <div class="step-header mb-5">
                    <div class="step-icon-circle">
                      <i class="bi bi-person-badge"></i>
                    </div>
                    <div>
                      <h2 class="step-title mb-2">Traveler Information</h2>
                      <p class="step-subtitle text-muted mb-0">
                        Enter details for {{ totalPassengers }} traveler{{ totalPassengers > 1 ? 's' : '' }}
                      </p>
                    </div>
                  </div>

                  <TravelerForm 
                    v-model="travelerInfo"
                    :passengers="totalPassengers"
                  />

                  <div class="step-actions d-flex justify-content-between mt-5">
                    <button 
                      class="btn btn-outline-secondary" 
                      @click="currentStep = 1"
                    >
                      <i class="bi bi-arrow-left me-2"></i>
                      Back to Review
                    </button>
                    <button 
                      class="btn btn-primary" 
                      @click="currentStep = 3"
                    >
                      Continue to Payment
                      <i class="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </transition>

              <!-- Step 3: Payment -->
              <transition name="slide-fade">
                <div v-if="currentStep === 3" class="step-content">
                  <div class="step-header mb-5">
                    <div class="step-icon-circle">
                      <i class="bi bi-credit-card"></i>
                    </div>
                    <div>
                      <h2 class="step-title mb-2">Payment Information</h2>
                      <p class="step-subtitle text-muted mb-0">
                        Secure payment powered by Stripe™
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-8">
                      <PaymentForm @submit="processPayment" />
                    </div>
                    <div class="col-lg-4">
                      <div class="order-summary">
                        <h5 class="mb-3">
                          <i class="bi bi-receipt me-2"></i>
                          Order Summary
                        </h5>
                        <div class="summary-items">
                          <div v-for="item in cart" :key="item.id" class="summary-item mb-3">
                            <div class="d-flex justify-content-between mb-1">
                              <span class="fw-medium">
                                {{ getItemType(item.type) }}
                              </span>
                              <span class="fw-bold">${{ item.price }}</span>
                            </div>
                            <small class="text-muted d-block">{{ item.name }}</small>
                          </div>
                        </div>
                        <hr>
                        <div class="summary-totals">
                          <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>${{ subtotal }}</span>
                          </div>
                          <div class="d-flex justify-content-between mb-2">
                            <span>Taxes & Fees</span>
                            <span>${{ taxes }}</span>
                          </div>
                          <div class="d-flex justify-content-between mb-3">
                            <span>Service Fee</span>
                            <span>${{ serviceFee }}</span>
                          </div>
                          <hr>
                          <div class="d-flex justify-content-between fw-bold fs-5">
                            <span>Total</span>
                            <span class="text-primary">${{ totalAmount }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="step-actions d-flex justify-content-between mt-5">
                    <button 
                      class="btn btn-outline-secondary" 
                      @click="currentStep = 2"
                    >
                      <i class="bi bi-arrow-left me-2"></i>
                      Back to Traveler Details
                    </button>
                    <div class="security-badge">
                      <i class="bi bi-shield-check text-success me-1"></i>
                      <small class="text-muted">256-bit SSL secured</small>
                    </div>
                  </div>
                </div>
              </transition>

              <!-- Step 4: Confirmation -->
              <transition name="slide-fade">
                <div v-if="currentStep === 4" class="step-content">
                  <div class="success-animation text-center mb-5">
                    <div class="success-icon">
                      <i class="bi bi-check-circle"></i>
                    </div>
                    <h2 class="step-title mt-4 mb-3">Booking Confirmed! 🎉</h2>
                    <p class="text-muted mb-4">
                      Your booking has been successfully processed. 
                      We've sent a confirmation email with all the details.
                    </p>
                  </div>

                  <BookingConfirmation :booking="confirmedBooking" />

                  <div class="step-actions d-flex justify-content-center mt-5">
                    <button class="btn btn-outline-primary me-3" @click="downloadReceipt">
                      <i class="bi bi-download me-2"></i>
                      Download Receipt
                    </button>
                    <button class="btn btn-primary" @click="viewBookings">
                      <i class="bi bi-journals me-2"></i>
                      View My Bookings
                    </button>
                  </div>

                  <div class="alert alert-info mt-5">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-info-circle me-3 fs-4"></i>
                      <div>
                        <strong>Next Steps:</strong> Check your email for e-tickets and booking details. 
                        Download our mobile app for real-time updates.
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <div class="sidebar-sticky">
            <!-- Summary Card -->
            <div class="bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs summary-card">
              <div class="bg-neutral-secondary-medium text-heading p-4 rounded-base mb-4">
                <h5 class="mb-0 font-semibold">
                  <i class="bi bi-clipboard-data me-2"></i>
                  Booking Summary
                </h5>
              </div>
              <div class="card-body">
                <div class="itinerary-items mb-4">
                  <div v-for="item in cart" :key="item.id" class="itinerary-item mb-3">
                    <div class="d-flex align-items-start">
                      <div class="item-icon me-3">
                        <i :class="getItemIcon(item.type)"></i>
                      </div>
                      <div class="flex-grow-1">
                        <h6 class="mb-1 fw-medium">{{ item.name }}</h6>
                        <div class="d-flex justify-content-between">
                          <small class="text-muted">{{ formatDate(item.date) }}</small>
                          <span class="fw-bold">${{ item.price }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="price-breakdown mb-4">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Subtotal</span>
                    <span>${{ subtotal }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Taxes & Fees</span>
                    <span>${{ taxes }}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Service Fee</span>
                    <span>${{ serviceFee }}</span>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between fw-bold fs-5">
                    <span>Total</span>
                    <span class="text-primary">${{ totalAmount }}</span>
                  </div>
                </div>

                <!-- Promo Code -->
                <div class="promo-section mb-4">
                  <label class="form-label small mb-2">Promo Code</label>
                  <div class="input-group">
                    <input 
                      type="text" 
                      class="form-control" 
                      placeholder="Enter code"
                      v-model="promoCode"
                    >
                    <button class="btn btn-outline-primary">Apply</button>
                  </div>
                </div>

                <!-- Support -->
                <div class="support-section text-center">
                  <div class="support-icon mb-3">
                    <i class="bi bi-headset"></i>
                  </div>
                  <h6 class="mb-2">Need Help?</h6>
                  <p class="text-muted small mb-3">Our travel experts are here 24/7</p>
                  <button class="btn btn-outline-secondary w-100 mb-2">
                    <i class="bi bi-chat-dots me-2"></i>
                    Live Chat
                  </button>
                  <small class="text-muted">
                    <i class="bi bi-telephone me-1"></i>
                    1-800-123-4567
                  </small>
                </div>
              </div>
            </div>

            <!-- Trust Badges -->
            <div class="bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs trust-badges">
              <div class="text-center py-3">
                <div class="grid grid-cols-2 gap-2">
                  <div class="badge-item">
                    <i class="bi bi-shield-check text-success"></i>
                    <small>Secure Booking</small>
                  </div>
                  <div class="badge-item">
                    <i class="bi bi-arrow-clockwise text-primary"></i>
                    <small>Flexible Cancellation</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isProcessing" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Processing...</span>
        </div>
        <p class="mt-3 fw-medium">Processing your payment...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore'
import { flightService } from '@/services/flightService'
import { hotelService } from '@/services/hotelService'
import BookingReview from '@/components/checkout/BookingReview.vue'
import TravelerForm from '@/components/checkout/TravelerForm.vue'
import PaymentForm from '@/components/checkout/PaymentForm.vue'
import BookingConfirmation from '@/components/checkout/BookingConfirmation.vue'

const router = useRouter()
const bookingStore = useBookingStore()
const currentStep = ref(1)
const travelerInfo = ref({})
const confirmedBooking = ref(null)
const isProcessing = ref(false)
const promoCode = ref('')

const steps = [
  { id: 1, label: 'Review' },
  { id: 2, label: 'Travelers' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Confirmation' }
]

const cart = computed(() => bookingStore.cart)
const totalPassengers = computed(() => 
  cart.value.reduce((sum, item) => sum + (item.passengers || 1), 0)
)

const subtotal = computed(() => 
  cart.value.reduce((sum, item) => sum + (item.price || 0), 0)
)

const taxes = computed(() => Math.round(subtotal.value * 0.08))
const serviceFee = computed(() => Math.round(subtotal.value * 0.03))
const totalAmount = computed(() => subtotal.value + taxes.value + serviceFee.value)

const goToStep = (step) => {
  if (step < currentStep.value) {
    currentStep.value = step
  }
}

const processPayment = async (paymentData) => {
  isProcessing.value = true
  try {
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
        default:
          console.warn('Unknown booking type:', item.type)
      }
      if (result) bookings.push(result)
    }
    
    confirmedBooking.value = bookings
    bookingStore.clearCart()
    currentStep.value = 4
    
  } catch (error) {
    console.error('Booking failed:', error)
    alert('Booking failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const downloadReceipt = () => {
  console.log('Downloading receipt...')
}

const viewBookings = () => {
  router.push('/my-bookings')
}

const getItemType = (type) => {
  switch(type) {
    case 'flight': return 'Flight'
    case 'hotel': return 'Hotel'
    case 'car': return 'Car Rental'
    default: return 'Item'
  }
}

const getItemIcon = (type) => {
  switch(type) {
    case 'flight': return 'bi bi-airplane'
    case 'hotel': return 'bi bi-building'
    case 'car': return 'bi bi-car-front'
    default: return 'bi bi-question-circle'
  }
}

const formatDate = (date) => {
  if (!date) return 'TBD'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

const formatDateWithDay = (date) => {
  if (!date) return 'TBD'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

