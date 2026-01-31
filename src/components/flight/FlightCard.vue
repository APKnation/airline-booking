<template>
  <div class="card border-0 shadow-sm mb-4 p-4 flight-card">
    <!-- Airline Info -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <img 
          :src="airlineLogo" 
          alt="Airline Logo" 
          class="rounded-circle me-3" 
          style="width: 50px; height: 50px; object-fit: cover;" 
        />
        <div>
          <div class="fw-bold text-primary">{{ flight.airline }}</div>
          <div class="text-muted small">{{ flight.flightNumber }}</div>
        </div>
      </div>
      <span
        :class="['badge', 'px-3', 'py-2', getStatusClass(flight.status)]"
      >
        {{ flight.status || 'On Time' }}
      </span>
    </div>

    <!-- Flight Route -->
    <div class="border-top border-bottom border-light py-4">
      <div class="row align-items-center text-center">
        <!-- Departure -->
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <div class="h4 fw-bold mb-1">{{ flight.departureTime }}</div>
          <div class="text-body">{{ flight.from }}</div>
          <div class="small text-muted">{{ flight.departureDate }}</div>
        </div>

        <!-- Duration & Stops -->
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <div class="small text-muted mb-2">{{ flight.duration }}</div>
          <div class="position-relative my-2">
            <div class="flight-line bg-light w-100" style="height: 2px;"></div>
            <div class="position-absolute top-50 start-50 translate-middle">
              <i class="bi bi-airplane-fill text-primary fs-5"></i>
            </div>
          </div>
          <div class="small text-muted">
            {{ flight.stops === 0 ? 'Non-stop' : flight.stops + ' stop(s)' }}
          </div>
        </div>

        <!-- Arrival -->
        <div class="col-12 col-md-4">
          <div class="h4 fw-bold mb-1">{{ flight.arrivalTime }}</div>
          <div class="text-body">{{ flight.to }}</div>
          <div class="small text-muted">{{ flight.arrivalDate }}</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
      <div class="mb-3 mb-md-0">
        <div class="d-flex flex-wrap gap-2">
          <span class="badge bg-light text-primary border border-primary-subtle px-3 py-2">
            {{ flight.class || 'Economy' }}
          </span>
          <span
            v-if="flight.seatsAvailable < 10"
            class="badge bg-danger-subtle text-danger-emphasis px-3 py-2"
          >
            Only {{ flight.seatsAvailable }} seats left!
          </span>
        </div>
      </div>
      
      <div class="d-flex align-items-center">
        <div class="me-4">
          <div class="h4 fw-bold text-primary mb-0">${{ flight.price }}</div>
          <div class="small text-muted">per passenger</div>
        </div>
        <button
          class="btn btn-primary px-4 py-2 fw-semibold"
          @click="selectFlight"
          :disabled="flight.seatsAvailable === 0"
          :class="{'btn-primary': flight.seatsAvailable > 0, 'btn-secondary': flight.seatsAvailable === 0}"
        >
          <i class="bi bi-check-circle me-2"></i>
          Select Flight
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  flight: { type: Object, required: true },
  passengers: { type: Number, default: 1 }
})

const emit = defineEmits(['select'])

// Airline logo placeholder
const airlineLogo = computed(() => props.flight.airlineLogo || require('@/assets/images/image.png'))

const getStatusClass = (status) => {
  const map = {
    'On Time': 'bg-success-subtle text-success-emphasis',
    'Delayed': 'bg-warning-subtle text-warning-emphasis',
    'Cancelled': 'bg-danger-subtle text-danger-emphasis',
    'Boarding': 'bg-info-subtle text-info-emphasis'
  }
  return map[status] || 'bg-light text-body'
}

const selectFlight = () => emit('select', props.flight)
</script>

<style scoped>
.flight-card {
  transition: all 0.3s ease;
  border-radius: 12px;
}

.flight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
}

.flight-line {
  position: relative;
  background-color: #e9ecef;
  height: 2px;
}

.flight-line::before {
  content: '●';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #0d6efd;
  font-size: 12px;
}

.flight-line::after {
  content: '●';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #0d6efd;
  font-size: 12px;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flight-card {
    padding: 1rem;
  }
  
  .h4 {
    font-size: 1.25rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
  }
}

/* Custom badge styles */
.badge {
  border-radius: 50px;
  font-weight: 500;
}

.bg-success-subtle {
  background-color: rgba(25, 135, 84, 0.1);
  border: 1px solid rgba(25, 135, 84, 0.2);
}

.bg-warning-subtle {
  background-color: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.2);
}

.bg-danger-subtle {
  background-color: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.2);
}

.bg-info-subtle {
  background-color: rgba(13, 202, 240, 0.1);
  border: 1px solid rgba(13, 202, 240, 0.2);
}

.bg-light {
  background-color: #f8f9fa !important;
  border: 1px solid #dee2e6;
}

/* Text colors */
.text-success-emphasis {
  color: #198754;
}

.text-warning-emphasis {
  color: #ffc107;
}

.text-danger-emphasis {
  color: #dc3545;
}

.text-info-emphasis {
  color: #0dcaf0;
}

.text-body {
  color: #212529 !important;
}

.border-primary-subtle {
  border-color: rgba(13, 110, 253, 0.2) !important;
}
</style>