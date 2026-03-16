<!-- components/AppFooter.vue -->
<template>
  <footer class="bg-midnight-900 text-midnight-200 mt-auto relative">
    <!-- Newsletter Section -->
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-ocean-600 to-aurora-600 opacity-10"></div>
      <div class="relative container mx-auto px-4">
        <div class="bg-gradient-to-r from-midnight-800 to-midnight-700 rounded-2xl p-8 shadow-strong -mt-16 mb-8 border border-midnight-600">
          <div class="grid lg:grid-cols-2 gap-8 items-center">
            <div class="space-y-3">
              <h3 class="text-2xl lg:text-3xl font-bold text-white">Stay Updated</h3>
              <p class="text-midnight-300 text-lg">Get exclusive travel deals and offers delivered to your inbox</p>
            </div>
            <div class="w-full">
              <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  v-model="newsletterEmail"
                  placeholder="Enter your email address"
                  class="flex-1 px-4 py-3 rounded-lg bg-midnight-900/50 border border-midnight-600 text-white placeholder-midnight-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent transition-all duration-200"
                  required
                >
                <button 
                  type="submit" 
                  class="btn-primary px-6 py-3 font-semibold whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid lg:grid-cols-3 gap-12 mb-12">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <span class="text-4xl">✈️</span>
            <span class="text-2xl font-bold text-gradient">SkyBooker</span>
          </div>
          <p class="text-midnight-300 leading-relaxed text-lg">
            Your gateway to unforgettable travel experiences. Discover the world with confidence and ease.
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links Section -->
        <div class="lg:col-span-2 grid md:grid-cols-3 gap-8">
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-lg mb-4">Explore</h4>
            <div class="space-y-3">
              <a href="#" class="footer-link">Flights</a>
              <a href="#" class="footer-link">Hotels</a>
              <a href="#" class="footer-link">Car Rentals</a>
              <a href="#" class="footer-link">Activities</a>
              <a href="#" class="footer-link">Travel Insurance</a>
            </div>
          </div>
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-lg mb-4">Support</h4>
            <div class="space-y-3">
              <a href="#" class="footer-link">Help Center</a>
              <a href="#" class="footer-link">Contact Us</a>
              <a href="#" class="footer-link">FAQ</a>
              <a href="#" class="footer-link">Cancellation Policy</a>
              <a href="#" class="footer-link">Refund Policy</a>
            </div>
          </div>
          <div class="space-y-4">
            <h4 class="text-white font-semibold text-lg mb-4">Company</h4>
            <div class="space-y-3">
              <a href="#" class="footer-link">About Us</a>
              <a href="#" class="footer-link">Careers</a>
              <a href="#" class="footer-link">Blog</a>
              <a href="#" class="footer-link">Press Room</a>
              <a href="#" class="footer-link">Partners</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-midnight-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-midnight-400 text-sm">
            &copy; {{ new Date().getFullYear() }} SkyBooker. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="footer-link text-sm">Privacy Policy</a>
            <a href="#" class="footer-link text-sm">Terms of Service</a>
            <a href="#" class="footer-link text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      newsletterEmail: ''
    }
  },
  methods: {
    subscribeNewsletter() {
      // Handle newsletter subscription
      console.log('Subscribing:', this.newsletterEmail)
      this.newsletterEmail = ''
      // You can add toast notification here
    }
  }
}
</script>

<style scoped>
.social-link {
  @apply w-10 h-10 bg-midnight-800 hover:bg-ocean-600 text-midnight-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-medium;
}

.footer-link {
  @apply block text-midnight-400 hover:text-ocean-400 transition-colors duration-200 text-sm;
}

.footer-link:hover {
  @apply transform translate-x-1;
}
</style>