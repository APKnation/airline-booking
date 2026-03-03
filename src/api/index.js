import axios from './axiosConfig'

const API = {
  // Authentication
  auth: {
    login: (credentials) => axios.post('/auth/login/', credentials),
    register: (userData) => axios.post('/auth/register/', userData),
    logout: () => axios.post('/auth/logout/'),
    refresh: (refreshToken) => axios.post('/auth/refresh/', { refresh: refreshToken }),
    profile: () => axios.get('/auth/profile/'),
    updateProfile: (data) => axios.put('/auth/profile/', data)
  },
  
  // Flights
  flights: {
    search: (params) => axios.get('/flights/search/', { params }),
    getAll: () => axios.get('/flights/'),
    getById: (id) => axios.get(`/flights/${id}/`),
    getAirlines: () => axios.get('/flights/airlines/'),
    getAirports: (search) => axios.get('/flights/airports/', { params: { search } }),
    book: (data) => axios.post('/flights/book/', data)
  },
  
  // Hotels
  hotels: {
    search: (params) => axios.get('/hotels/search/', { params }),
    getById: (id) => axios.get(`/hotels/${id}/`),
    getCities: () => axios.get('/hotels/cities/'),
    getRoomTypes: () => axios.get('/hotels/room-types/'),
    book: (data) => axios.post('/hotels/book/', data),
    getReviews: (hotelId) => axios.get(`/hotels/${hotelId}/reviews/`)
  },
  
  // Car Rentals
  cars: {
    search: (params) => axios.get('/cars/search/', { params }),
    getById: (id) => axios.get(`/cars/${id}/`),
    getCarTypes: () => axios.get('/cars/types/'),
    getRentalCompanies: () => axios.get('/cars/companies/'),
    book: (data) => axios.post('/cars/book/', data)
  },
  
  // Taxi Services
  taxi: {
    estimate: (data) => axios.post('/taxi/estimate/', data),
    book: (data) => axios.post('/taxi/book/', data),
    cancel: (bookingId) => axios.delete(`/taxi/bookings/${bookingId}/`),
    track: (bookingId) => axios.get(`/taxi/bookings/${bookingId}/track/`)
  },
  
  // Travel Guide & Attractions
  travel: {
    getGuides: (location) => axios.get('/guides/', { params: { location } }),
    bookGuide: (data) => axios.post('/guides/book/', data),
    getAttractions: (location) => axios.get('/attractions/', { params: { location } }),
    getAttractionDetails: (id) => axios.get(`/attractions/${id}/`),
    bookAttraction: (data) => axios.post('/attractions/book/', data)
  },
  
  // Cart & Booking Management
  cart: {
    add: (item) => axios.post('/cart/items/', item),
    remove: (itemId) => axios.delete(`/cart/items/${itemId}/`),
    get: () => axios.get('/cart/'),
    clear: () => axios.delete('/cart/clear/'),
    applyCoupon: (code) => axios.post('/cart/coupon/', { code })
  },
  
  // Payments
  payments: {
    create: (data) => axios.post('/payments/create/', data),
    verify: (paymentId) => axios.get(`/payments/verify/${paymentId}/`),
    getMethods: () => axios.get('/payments/methods/'),
    getHistory: () => axios.get('/payments/history/')
  },
  
  // User Bookings
  bookings: {
    getAll: () => axios.get('/bookings/'),
    getById: (id) => axios.get(`/bookings/${id}/`),
    cancel: (id) => axios.delete(`/bookings/${id}/cancel/`),
    downloadTicket: (id) => axios.get(`/bookings/${id}/ticket/`, { responseType: 'blob' })
  }
}

export default API