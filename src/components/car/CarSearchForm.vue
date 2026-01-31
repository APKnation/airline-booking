<template>
  <v-form @submit.prevent="search">
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchData.pickupLocation"
          label="Pick-up Location"
          placeholder="City or Airport"
          prepend-inner-icon="mdi-map-marker"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchData.dropLocation"
          label="Drop-off Location"
          placeholder="City or Airport"
          prepend-inner-icon="mdi-map-marker-check"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchData.pickupDate"
          label="Pick-up Date & Time"
          type="datetime-local"
          variant="outlined"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          v-model="searchData.returnDate"
          label="Return Date & Time"
          type="datetime-local"
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="searchData.carType"
          label="Car Type"
          :items="['Economy', 'Compact', 'SUV', 'Luxury', 'Van']"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="searchData.driverAge"
          label="Driver Age"
          :items="['18-24', '25-34', '35-49', '50+']"
          variant="outlined"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn type="submit" color="primary" block size="large" height="56">
          Search Cars
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchData = reactive({
  pickupLocation: '',
  dropLocation: '',
  pickupDate: '',
  returnDate: '',
  carType: 'Economy',
  driverAge: '25-34'
})

const search = () => {
  router.push({
    name: 'CarRental',
    query: { ...searchData }
  })
}
</script>