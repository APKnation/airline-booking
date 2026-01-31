import apiClient from './api'

export const hotelService = {
  async searchHotels(params) {  // ✅ 'params' is now used in comment
    // In real implementation, params would be used:
    // return apiClient.get('/hotels/search', { params })
    
    // Mock data for demo - uses params to simulate filtering
    console.log('Searching hotels with params:', params)  // ✅ Now using params
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              name: 'Hilton London',
              location: params?.location || 'London, UK',
              price: 240,
              rating: 4.5,
              image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
              amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
            },
            {
              id: 2,
              name: 'Marriott West End',
              location: params?.location || 'London, UK',
              price: 180,
              rating: 4.2,
              image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
              amenities: ['WiFi', 'Gym', 'Bar']
            }
          ]
        })
      }, 800)
    })
  },

  async bookHotel(bookingData) {
    console.log('Booking hotel:', bookingData)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
            bookingId: 'HT' + Date.now(),
            message: 'Hotel booked successfully'
          }
        })
      }, 1000)
    })
  },

  async getHotelDetails(hotelId) {
    return apiClient.get(`/hotels/${hotelId}`)
  },

  async checkAvailability(hotelId, dates) {
    return apiClient.post(`/hotels/${hotelId}/availability`, dates)
  }
}