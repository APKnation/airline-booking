<template>
  <v-card hover class="flight-card">
    <v-card-title class="d-flex justify-space-between">
      <span>{{ flight.airline }}</span>
      <v-chip color="primary">${{ flight.price }}</v-chip>
    </v-card-title>
    
    <v-card-text>
      <div class="d-flex align-center justify-space-between my-4">
        <div class="text-center">
          <div class="text-h5">{{ flight.departureTime }}</div>
          <div class="text-caption">{{ flight.from }}</div>
        </div>
        
        <div class="flight-line flex-grow-1 mx-4">
          <div class="text-center text-caption">{{ flight.duration }}</div>
          <v-divider></v-divider>
          <div class="text-center">
            <v-icon small>mdi-airplane</v-icon>
          </div>
        </div>
        
        <div class="text-center">
          <div class="text-h5">{{ flight.arrivalTime }}</div>
          <div class="text-caption">{{ flight.to }}</div>
        </div>
      </div>
      
      <div class="d-flex justify-space-between align-center">
        <div>
          <v-chip small class="mr-2">{{ flight.class }}</v-chip>
          <v-chip small color="success" v-if="flight.seatsAvailable < 10">
            Only {{ flight.seatsAvailable }} left!
          </v-chip>
        </div>
        <v-btn color="primary" @click="$emit('select')">
          Select
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  flight: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>