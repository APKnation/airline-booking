import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import API from '@/api'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cart')) || [])
  const loading = ref(false)
  const coupon = ref(localStorage.getItem('coupon') || null)
  const discount = ref(0)

  const totalItems = computed(() => items.value.length)
  
  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })
  
  const total = computed(() => {
    return subtotal.value - discount.value
  })

  function addToCart(item) {
    const existingItem = items.value.find(i => 
      i.type === item.type && i.id === item.id
    )
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1
    } else {
      items.value.push({
        ...item,
        quantity: item.quantity || 1,
        addedAt: new Date().toISOString()
      })
    }
    
    saveCart()
  }

  function removeFromCart(itemId) {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      items.value.splice(index, 1)
      saveCart()
    }
  }

  function updateQuantity(itemId, quantity) {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveCart()
    }
  }

  function clearCart() {
    items.value = []
    coupon.value = null
    discount.value = 0
    localStorage.removeItem('cart')
    localStorage.removeItem('coupon')
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(items.value))
    if (coupon.value) {
      localStorage.setItem('coupon', coupon.value)
    }
  }

  async function applyCoupon(code) {
    loading.value = true
    try {
      const response = await API.cart.applyCoupon(code)
      coupon.value = code
      discount.value = response.data.discount || 0
      saveCart()
      return true
    } catch (err) {
      coupon.value = null
      discount.value = 0
      throw err
    } finally {
      loading.value = false
    }
  }

  function getCartSummary() {
    return {
      items: items.value,
      subtotal: subtotal.value,
      discount: discount.value,
      total: total.value,
      coupon: coupon.value,
      itemCount: totalItems.value
    }
  }

  return {
    items,
    loading,
    coupon,
    discount,
    totalItems,
    subtotal,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    getCartSummary
  }
})