<template>
  <v-card class="mb-4">
    <v-card-title>Review Your Booking</v-card-title>
    <v-card-text>
      <v-list v-if="items.length">
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.type?.toUpperCase() }} - {{ item.name || 'Unnamed Item' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              ${{ item.price }} x {{ item.passengers || 1 }} traveler(s)
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip color="primary">${{ item.price * (item.passengers || 1) }}</v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-alert v-else type="warning">Your cart is empty</v-alert>
      
      <v-divider class="my-4"></v-divider>
      <div class="d-flex justify-space-between text-h6">
        <span>Total:</span>
        <span>${{ total }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'  // ✅ Added import

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const total = computed(() => 
  props.items.reduce((sum, item) => sum + (item.price * (item.passengers || 1)), 0)
)
</script>