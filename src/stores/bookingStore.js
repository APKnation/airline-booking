import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  // State
  const cart = ref([])
  const currentBooking = ref(null)

  // Getters
  const bookingCount = computed(() => cart.value.length)
  const cartTotal = computed(() => 
    cart.value.reduce((sum, item) => sum + (item.price * (item.passengers || 1)), 0)
  )

  // Actions
  function addToCart(item) {
    cart.value.push({
      ...item,
      id: Date.now(),
      addedAt: new Date()
    })
  }

  function removeFromCart(itemId) {
    const index = cart.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      cart.value.splice(index, 1)
    }
  }

  function clearCart() {
    cart.value = []
  }

  function setCurrentBooking(booking) {
    currentBooking.value = booking
  }

  return {
    cart,
    currentBooking,
    bookingCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    setCurrentBooking
  }
})