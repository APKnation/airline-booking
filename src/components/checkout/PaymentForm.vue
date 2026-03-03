<template>
  <div class="card max-w-2xl mx-auto">
    <div class="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 rounded-t-2xl">
      <h2 class="text-2xl font-bold flex items-center">
        <span class="text-3xl mr-3">💳</span>
        Payment Details
      </h2>
    </div>
    <div class="p-8">
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Card Number -->
        <div class="space-y-2">
          <label class="block text-lg font-semibold text-secondary-700">Card Number</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 text-xl">💳</span>
            <input
              v-model="payment.cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              class="input-field pl-14 pr-4 py-4 text-lg"
              @input="formatCardNumber"
              required
            />
          </div>
        </div>
        
        <!-- Expiry and CVV -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-lg font-semibold text-secondary-700">Expiry Date</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 text-xl">📅</span>
              <input
                v-model="payment.expiry"
                type="text"
                placeholder="MM/YY"
                maxlength="5"
                class="input-field pl-14 pr-4 py-4 text-lg"
                @input="formatExpiry"
                required
              />
            </div>
          </div>
          <div class="space-y-2">
            <label class="block text-lg font-semibold text-secondary-700">CVV</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 text-xl">🔒</span>
              <input
                v-model="payment.cvv"
                type="password"
                placeholder="123"
                maxlength="4"
                class="input-field pl-14 pr-4 py-4 text-lg"
                required
              />
            </div>
          </div>
        </div>
        
        <!-- Card Holder Name -->
        <div class="space-y-2">
          <label class="block text-lg font-semibold text-secondary-700">Card Holder Name</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400 text-xl">👤</span>
            <input
              v-model="payment.cardHolder"
              type="text"
              placeholder="John Doe"
              class="input-field pl-14 pr-4 py-4 text-lg"
              required
            />
          </div>
        </div>
        
        <!-- Security Badge -->
        <div class="bg-secondary-50 rounded-xl p-4 flex items-center space-x-4">
          <span class="text-2xl">🛡️</span>
          <div>
            <div class="font-semibold text-secondary-700">Secure Payment</div>
            <div class="text-sm text-secondary-500">Your payment information is encrypted and secure</div>
          </div>
        </div>
        
        <!-- Submit Button -->
        <button
          type="submit"
          class="btn-primary text-lg px-8 py-4 w-full flex items-center justify-center space-x-3"
        >
          <span class="text-2xl">💰</span>
          <span>Complete Payment</span>
          <i class="bi bi-lock-fill text-xl"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['submit'])

const payment = ref({
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardHolder: ''
})

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '')
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  payment.value.cardNumber = formattedValue
}

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4)
  }
  payment.value.expiry = value
}

const submit = () => {
  emit('submit', payment.value)
}
</script>