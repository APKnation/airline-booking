<template>
  <v-card>
    <v-card-title>Payment Details</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field
          v-model="payment.cardNumber"
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          variant="outlined"
          class="mb-4"
        ></v-text-field>
        
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="payment.expiry"
              label="Expiry Date"
              placeholder="MM/YY"
              maxlength="5"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="payment.cvv"
              label="CVV"
              type="password"
              maxlength="4"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        
        <v-text-field
          v-model="payment.cardHolder"
          label="Card Holder Name"
          variant="outlined"
          class="mb-4"
        ></v-text-field>
        
        <v-btn type="submit" color="success" size="large" block>
          Pay Now
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'  // ✅ Added import

const emit = defineEmits(['submit'])

const payment = ref({
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardHolder: ''
})

const submit = () => {
  emit('submit', payment.value)
}
</script>