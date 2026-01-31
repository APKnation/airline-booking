<template>
  <v-form @submit.prevent="search">
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="searchData.serviceType"
          label="Service Type"
          :items="['Airport Pickup', 'Airport Drop-off', 'City Ride', 'Hourly Rental']"
          variant="outlined"
          required
        ></v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="searchData.vehicleType"
          label="Vehicle Type"
          :items="['Sedan', 'SUV', 'Luxury', 'Van', 'Shared Shuttle']"
          variant="outlined"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchData.from"
          label="From"
          placeholder="Pick-up address"
          prepend-inner-icon="mdi-map-marker"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchData.to"
          label="To"
          placeholder="Drop-off address"
          prepend-inner-icon="mdi-flag-checkered"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchData.date"
          label="Date"
          type="date"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchData.time"
          label="Time"
          type="time"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchData.passengers"
          label="Passengers"
          type="number"
          min="1"
          max="8"
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn type="submit" color="primary" block size="large">
      Book Taxi
    </v-btn>
  </v-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchData = reactive({
  serviceType: 'Airport Pickup',
  vehicleType: 'Sedan',
  from: '',
  to: '',
  date: '',
  time: '',
  passengers: 1
})

const search = () => {
  router.push({
    name: 'Taxi',
    query: { ...searchData }
  })
}
</script>