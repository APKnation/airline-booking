<template>
  <v-form @submit.prevent="searchFlights">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="search.from"
          label="From"
          placeholder="New York (JFK)"
          prepend-inner-icon="mdi-airplane-takeoff"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      
      <v-col cols="12" md="3">
        <v-text-field
          v-model="search.to"
          label="To"
          placeholder="London (LHR)"
          prepend-inner-icon="mdi-airplane-landing"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-text-field
          v-model="search.departDate"
          label="Depart"
          type="date"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-text-field
          v-model="search.returnDate"
          label="Return"
          type="date"
          variant="outlined"
        ></v-text-field>
      </v-col>
      
      <v-col cols="12" md="2">
        <v-select
          v-model="search.passengers"
          label="Passengers"
          :items="[1, 2, 3, 4, 5, 6]"
          variant="outlined"
        ></v-select>
      </v-col>
    </v-row>
    
    <v-btn 
      type="submit" 
      color="primary" 
      size="large" 
      block
      :loading="loading"
    >
      <v-icon start>mdi-magnify</v-icon>
      Search Flights
    </v-btn>
  </v-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const search = reactive({
  from: '',
  to: '',
  departDate: '',
  returnDate: '',
  passengers: 1,
  class: 'economy'
})

const searchFlights = async () => {
  loading.value = true
  // Navigate to flight results page with query params
  router.push({
    name: 'Flights',
    query: { ...search }
  })
  loading.value = false
}
</script>