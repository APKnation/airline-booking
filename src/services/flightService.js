import apiClient from './api'

export const flightService = {
  searchFlights(params) {
    return apiClient.get('/flights/search', { params })
  },
  getFlightDetails(flightId) {
    return apiClient.get(`/flights/${flightId}`)
  },
  bookFlight(bookingData) {
    return apiClient.post('/flights/book', bookingData)
  },
  getUserBookings() {
    return apiClient.get('/flights/bookings')
  }
}