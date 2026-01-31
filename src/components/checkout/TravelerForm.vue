<template>
  <v-card>
    <v-card-title>Traveler Information</v-card-title>
    <v-card-text>
      <div v-for="n in passengers" :key="n" class="mb-6">
        <h4 class="text-subtitle-1 mb-2">Traveler {{ n }}</h4>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form[n-1].firstName"
              label="First Name"
              variant="outlined"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form[n-1].lastName"
              label="Last Name"
              variant="outlined"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form[n-1].email"
              label="Email"
              type="email"
              variant="outlined"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form[n-1].phone"
              label="Phone"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form[n-1].passport"
              label="Passport Number"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form[n-1].dob"
              label="Date of Birth"
              type="date"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider v-if="n < passengers" class="mt-4"></v-divider>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'  // ✅ Added imports

const props = defineProps({
  passengers: {
    type: Number,
    default: 1
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const form = ref(Array(props.passengers).fill(null).map(() => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  passport: '',
  dob: ''
})))

watch(form, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })
</script>