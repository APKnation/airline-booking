import { ref } from 'vue'
import { flightService } from '@/services/flightService'

export function useFlights() {
  const flights = ref([])
  const loading = ref(false)
  const error = ref(null)

  const searchFlights = async (params) => {
    loading.value = true
    error.value = null
    try {
      const response = await flightService.searchFlights(params)
      flights.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message || 'Failed to search flights'
      throw err
    } finally {
      loading.value = false
    }
  }

  const bookFlight = async (bookingData) => {
    try {
      const response = await flightService.bookFlight(bookingData)
      return response.data
    } catch (err) {
      error.value = err.message || 'Failed to book flight'
      throw err
    }
  }

  return {
    flights,
    loading,
    error,
    searchFlights,
    bookFlight
  }
}