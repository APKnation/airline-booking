// Normalize different hotel API responses to consistent format
export const hotelAdapter = {
  transformSearchResponse(provider, data) {
    switch(provider) {
      case 'booking.com':
        return data.result.map(hotel => ({
          id: hotel.hotel_id,
          name: hotel.hotel_name,
          location: {
            lat: hotel.latitude,
            lng: hotel.longitude,
            address: hotel.address
          },
          price: hotel.min_rate,
          rating: hotel.review_score,
          images: hotel.photos,
          amenities: hotel.facilities
        }))
      
      case 'expedia':
        return data.hotelList.map(hotel => ({
          id: hotel.hotelId,
          name: hotel.name,
          // ... normalize fields
        }))
      
      default:
        return data
    }
  }
}