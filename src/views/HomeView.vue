<template>
  <div class="home-view">
    <!-- NAVIGATION BAR -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand fw-bold fs-3">
          <i class="bi bi-airplane-engines me-2"></i>
          SkyBook
        </router-link>
        
        <!-- Mobile Toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link active">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/flights" class="nav-link">
                <i class="bi bi-airplane me-2"></i>
                Flights
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/hotels" class="nav-link">
                <i class="bi bi-building me-2"></i>
                Hotels
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cars" class="nav-link">
                <i class="bi bi-car-front me-2"></i>
                Cars
              </router-link>
            </li>
             <li class="nav-item">
              <router-link to="/attractions" class="nav-link">
                <i class="bi bi-car-front me-2"></i>
                Attractions
              </router-link>
            </li>
             <li class="nav-item">
              <router-link to="/dashboard" class="nav-link">
                <i class="bi bi-car-front me-2"></i>
                Dashboard
              </router-link>
            </li>
             <li class="nav-item">
              <router-link to="/checkout" class="nav-link">
                <i class="bi bi-car-front me-2"></i>
                Checkout
              </router-link>
            </li>
             <li class="nav-item">
              <router-link to="/guide" class="nav-link">
                <i class="bi bi-car-front me-2"></i>
                TravelGuider
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/packages" class="nav-link">
                <i class="bi bi-briefcase me-2"></i>
                Packages
              </router-link>
            </li>
             <li class="nav-item">
              <router-link to="/taxi" class="nav-link">
                <i class="bi bi-car-front me-2"></i>
                Tax
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle me-2"></i>
                Account
              </a>
              <ul class="dropdown-menu">
                <li><router-link to="/login" class="dropdown-item">Login</router-link></li>
                <li><router-link to="/register" class="dropdown-item">Sign Up</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link to="/profile" class="dropdown-item">My Profile</router-link></li>
                <li><router-link to="/bookings" class="dropdown-item">My Bookings</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero-section">
      <!-- Background Image with Airplanes -->
      <div class="hero-background position-absolute top-0 start-0 w-100 h-100">
        <!-- Main background image -->
        <div class="background-image position-absolute top-0 start-0 w-100 h-100"></div>
        
        <!-- Overlay gradient -->
        <div class="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>
        
        <!-- Animated Airplanes -->
        <div class="airplane airplane-1 position-absolute">
          <i class="bi bi-airplane"></i>
        </div>
        <div class="airplane airplane-2 position-absolute">
          <i class="bi bi-airplane"></i>
        </div>
        <div class="airplane airplane-3 position-absolute">
          <i class="bi bi-airplane"></i>
        </div>
      </div>
      
      <!-- Hero Content -->
      <div class="container position-relative z-2">
        <div class="row justify-content-center text-center text-white py-6 py-lg-8">
          <div class="col-12 col-lg-10 col-xl-8">
            <!-- Main Title -->
            <h1 class="hero-title display-2 display-lg-1 fw-bold mb-4 animate__animated animate__fadeInDown">
              Explore the World with Confidence
            </h1>
            
            <!-- Subtitle -->
            <p class="hero-subtitle lead fs-4 mb-5 animate__animated animate__fadeInUp">
              Book flights, hotels, cars, and experiences across 500+ destinations worldwide
            </p>
            
            <!-- CTA Buttons -->
            <div class="d-flex flex-column flex-md-row gap-3 justify-content-center mb-5 animate__animated animate__fadeInUp">
              <router-link to="/flights" class="btn btn-primary btn-lg px-5 py-3 fw-bold">
                <i class="bi bi-airplane-engines me-2"></i>
                Book Flights
              </router-link>
              <router-link to="/hotels" class="btn btn-outline-light btn-lg px-5 py-3 fw-bold">
                <i class="bi bi-building me-2"></i>
                Find Hotels
              </router-link>
            </div>
            
            <!-- Stats Bar -->
            <div class="row justify-content-center animate__animated animate__fadeInUp">
              <div class="col-auto px-4">
                <div class="stat-item">
                  <div class="stat-number h1 fw-bold mb-1">500+</div>
                  <div class="stat-label small text-uppercase opacity-75">Destinations</div>
                </div>
              </div>
              <div class="col-auto px-4">
                <div class="stat-item">
                  <div class="stat-number h1 fw-bold mb-1">24/7</div>
                  <div class="stat-label small text-uppercase opacity-75">Support</div>
                </div>
              </div>
              <div class="col-auto px-4">
                <div class="stat-item">
                  <div class="stat-number h1 fw-bold mb-1">1M+</div>
                  <div class="stat-label small text-uppercase opacity-75">Happy Travelers</div>
                </div>
              </div>
              <div class="col-auto px-4">
                <div class="stat-item">
                  <div class="stat-number h1 fw-bold mb-1">50K+</div>
                  <div class="stat-label small text-uppercase opacity-75">Hotels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="scroll-indicator position-absolute start-50 translate-middle-x text-white text-center">
        <p class="mb-2 small text-uppercase opacity-75">Discover More</p>
        <i class="bi bi-chevron-down fs-4"></i>
      </div>
    </section>

    <!-- FEATURED SERVICES SECTION -->
    <section class="services-section py-6">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-12 col-md-10 col-lg-8 text-center">
            <h2 class="display-4 fw-bold mb-3">Everything You Need to Travel</h2>
            <p class="lead text-muted mb-0">
              From flights to hotels, cars to experiences - we've got you covered
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="service-card card border-0 h-100 shadow-sm text-center hover-lift">
              <div class="card-body p-5">
                <div class="service-icon mb-4">
                  <i class="bi bi-airplane-engines fs-1 text-primary"></i>
                </div>
                <h4 class="fw-bold mb-3">Flight Booking</h4>
                <p class="text-muted mb-4">
                  Find and book flights to destinations worldwide with our best price guarantee
                </p>
                <router-link to="/flights" class="btn btn-outline-primary">
                  Book Now <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 col-lg-3">
            <div class="service-card card border-0 h-100 shadow-sm text-center hover-lift">
              <div class="card-body p-5">
                <div class="service-icon mb-4">
                  <i class="bi bi-building fs-1 text-primary"></i>
                </div>
                <h4 class="fw-bold mb-3">Hotel Reservations</h4>
                <p class="text-muted mb-4">
                  Choose from thousands of hotels, resorts, and accommodations worldwide
                </p>
                <router-link to="/hotels" class="btn btn-outline-primary">
                  Find Hotels <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 col-lg-3">
            <div class="service-card card border-0 h-100 shadow-sm text-center hover-lift">
              <div class="card-body p-5">
                <div class="service-icon mb-4">
                  <i class="bi bi-car-front fs-1 text-primary"></i>
                </div>
                <h4 class="fw-bold mb-3">Car Rental</h4>
                <p class="text-muted mb-4">
                  Rent cars at competitive prices with flexible pick-up and drop-off options
                </p>
                <router-link to="/cars" class="btn btn-outline-primary">
                  Rent Cars <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
          
          <div class="col-12 col-md-6 col-lg-3">
            <div class="service-card card border-0 h-100 shadow-sm text-center hover-lift">
              <div class="card-body p-5">
                <div class="service-icon mb-4">
                  <i class="bi bi-briefcase fs-1 text-primary"></i>
                </div>
                <h4 class="fw-bold mb-3">Travel Packages</h4>
                <p class="text-muted mb-4">
                  All-inclusive packages combining flights, hotels, and activities
                </p>
                <router-link to="/packages" class="btn btn-outline-primary">
                  View Packages <i class="bi bi-arrow-right ms-2"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED DESTINATIONS -->
    <section class="destinations-section py-6 bg-light">
      <div class="container">
        <div class="row justify-content-between align-items-center mb-5">
          <div class="col-12 col-lg-8">
            <h2 class="display-4 fw-bold mb-3">Popular Destinations</h2>
            <p class="lead text-muted mb-0">
              Discover the world's most sought-after travel destinations
            </p>
          </div>
          <div class="col-12 col-lg-4 text-lg-end mt-3 mt-lg-0">
            <router-link to="/destinations" class="btn btn-outline-primary px-4">
              View All <i class="bi bi-arrow-right ms-2"></i>
            </router-link>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-12 col-md-6 col-lg-3" v-for="destination in featuredDestinations" :key="destination.name">
            <div class="destination-card position-relative overflow-hidden rounded-3 shadow-sm">
              <img 
                :src="destination.image" 
                :alt="destination.name"
                class="img-fluid w-100"
                style="height: 250px; object-fit: cover;"
              >
              <div class="destination-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4">
                <div class="destination-content text-white">
                  <h5 class="fw-bold mb-2">{{ destination.name }}</h5>
                  <div class="d-flex align-items-center mb-3">
                    <i class="bi bi-geo-alt me-2"></i>
                    <small>{{ destination.country }}</small>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="badge bg-white text-dark p-2">
                      From ${{ destination.price }}
                    </span>
                    <button class="btn btn-light btn-sm px-3" @click="viewDestination(destination)">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="testimonials-section py-6">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-12 text-center">
            <h2 class="display-4 fw-bold mb-3">Travelers Love SkyBook</h2>
            <p class="lead text-muted mb-0">
              Join over 1 million satisfied travelers worldwide
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-12 col-md-4" v-for="testimonial in testimonials" :key="testimonial.name">
            <div class="testimonial-card card border-0 shadow-sm h-100">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-4">
                  <img :src="testimonial.avatar" class="rounded-circle me-3" width="60" height="60" :alt="testimonial.name">
                  <div>
                    <h5 class="fw-bold mb-1">{{ testimonial.name }}</h5>
                    <div class="text-warning">
                      <i class="bi bi-star-fill" v-for="n in testimonial.rating" :key="n"></i>
                    </div>
                  </div>
                </div>
                <p class="text-muted">{{ testimonial.comment }}</p>
                <small class="text-muted">{{ testimonial.destination }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer bg-dark text-white py-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-4 mb-4 mb-lg-0">
            <h5 class="fw-bold mb-4">
              <i class="bi bi-airplane-engines me-2"></i>
              SkyBook
            </h5>
            <p class="text-light opacity-75">
              Your trusted partner for all travel needs. Book flights, hotels, cars, and experiences with confidence.
            </p>
            <div class="social-links mt-4">
              <a href="#" class="text-white me-3"><i class="bi bi-facebook fs-5"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-twitter fs-5"></i></a>
              <a href="#" class="text-white me-3"><i class="bi bi-instagram fs-5"></i></a>
              <a href="#" class="text-white"><i class="bi bi-linkedin fs-5"></i></a>
            </div>
          </div>
          
          <div class="col-6 col-md-3 col-lg-2 mb-4">
            <h6 class="fw-bold mb-4">Services</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><router-link to="/flights" class="text-white opacity-75 text-decoration-none">Flights</router-link></li>
              <li class="mb-2"><router-link to="/hotels" class="text-white opacity-75 text-decoration-none">Hotels</router-link></li>
              <li class="mb-2"><router-link to="/cars" class="text-white opacity-75 text-decoration-none">Car Rental</router-link></li>
              <li class="mb-2"><router-link to="/packages" class="text-white opacity-75 text-decoration-none">Packages</router-link></li>
            </ul>
          </div>
          
          <div class="col-6 col-md-3 col-lg-2 mb-4">
            <h6 class="fw-bold mb-4">Company</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><a href="#" class="text-white opacity-75 text-decoration-none">About Us</a></li>
              <li class="mb-2"><a href="#" class="text-white opacity-75 text-decoration-none">Careers</a></li>
              <li class="mb-2"><a href="#" class="text-white opacity-75 text-decoration-none">Press</a></li>
              <li class="mb-2"><a href="#" class="text-white opacity-75 text-decoration-none">Contact</a></li>
            </ul>
          </div>
          
          <div class="col-12 col-md-6 col-lg-4">
            <h6 class="fw-bold mb-4">Newsletter</h6>
            <p class="text-light opacity-75 mb-4">Subscribe for exclusive deals and travel tips</p>
            <div class="input-group">
              <input type="email" class="form-control" placeholder="Your email address">
              <button class="btn btn-primary" type="button">
                <i class="bi bi-envelope"></i>
              </button>
            </div>
          </div>
        </div>
        
        <hr class="my-5 opacity-25">
        
        <div class="row">
          <div class="col-12 text-center">
            <p class="text-light opacity-75 mb-0">
              © 2024 SkyBook. All rights reserved. | 
              <a href="#" class="text-white opacity-75 text-decoration-none me-3">Privacy Policy</a>
              <a href="#" class="text-white opacity-75 text-decoration-none">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Import local images - you'll need to add these to your assets folder
import parisImage from '@/assets/images/im1.png'
import tokyoImage from '@/assets/images/im1.png'
import newyorkImage from '@/assets/images/im1.png'
import baliImage from '@/assets/images/im1.png'
import avatar1 from '@/assets/images/im1.png'
import avatar2 from '@/assets/images/im1.png'
import avatar3 from '@/assets/images/im1.png'

const router = useRouter()

const featuredDestinations = ref([
  {
    name: 'Paris',
    country: 'France',
    image: parisImage,
    price: 299
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    image: tokyoImage,
    price: 499
  },
  {
    name: 'New York',
    country: 'USA',
    image: newyorkImage,
    price: 399
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    image: baliImage,
    price: 199
  }
])

const testimonials = ref([
  {
    name: 'Sarah Johnson',
    comment: 'Amazing experience! Found the perfect hotel at the best price. Highly recommended!',
    rating: 5,
    destination: 'Paris, France',
    avatar: avatar1
  },
  {
    name: 'Michael Chen',
    comment: 'The flight booking was seamless and the customer support was incredibly helpful.',
    rating: 5,
    destination: 'Tokyo, Japan',
    avatar: avatar2
  },
  {
    name: 'Emma Wilson',
    comment: 'Car rental process was smooth and the vehicle was in perfect condition.',
    rating: 4,
    destination: 'New York, USA',
    avatar: avatar3
  }
])

const viewDestination = (destination) => {
  router.push({ 
    path: '/flights',
    query: { destination: destination.name }
  })
}
</script>

<style scoped>
/* Navigation Bar */
.navbar {
  background: hsla(140, 100%, 2%, 0.94);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: hsla(220, 2%, 70%, 0.95);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  color: white !important;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85) !important;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: white !important;
  transform: translateY(-2px);
}

.nav-link i {
  font-size: 1.1rem;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  padding-top: 76px; /* Account for fixed navbar */
  position: relative;
  overflow: hidden;
}

.hero-background {
  z-index: 1;
}

.background-image {
  background-image: linear-gradient(hsla(0, 15%, 91%, 0.50), rgba(0, 0, 0, 0.7)), 
                    url('@/assets/images/im1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  background: linear-gradient(135deg, rgba(13, 110, 253, 0.7) 0%, rgba(102, 16, 242, 0.7) 100%);
  z-index: 1;
}

/* Animated Airplanes */
.airplane {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  z-index: 2;
  animation: float 20s infinite linear;
}

.airplane-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.airplane-2 {
  top: 40%;
  right: 15%;
  animation-delay: 5s;
}

.airplane-3 {
  top: 60%;
  left: 20%;
  animation-delay: 10s;
}

@keyframes float {
  0% {
    transform: translateX(-100px) rotate(45deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 100px)) rotate(45deg);
    opacity: 0;
  }
}

.hero-title {
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

.hero-subtitle {
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
}

.stat-item {
  padding: 0 1.5rem;
  position: relative;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
}

.scroll-indicator {
  bottom: 2rem;
  animation: bounce 2s infinite;
  z-index: 2;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
}

/* Services Section */
.service-card {
  transition: all 0.3s ease;
  border-radius: 1rem !important;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.service-icon {
  width: 80px;
  height: 80px;
  background: rgba(13, 110, 253, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.hover-lift:hover {
  transform: translateY(-5px);
}

/* Destination Cards */
.destination-card {
  transition: transform 0.3s ease;
  border-radius: 1rem !important;
}

.destination-card:hover {
  transform: translateY(-5px);
}

.destination-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.destination-card:hover .destination-overlay {
  opacity: 1;
}

/* Testimonial Cards */
.testimonial-card {
  border-radius: 1rem !important;
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-3px);
}

/* Footer */
.footer a:hover {
  opacity: 1 !important;
  text-decoration: underline !important;
}

.social-links a {
  transition: all 0.3s ease;
  display: inline-block;
}

.social-links a:hover {
  transform: translateY(-3px);
  color: #0d6efd !important;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding-bottom: 4rem;
  }
  
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.25rem !important;
  }
  
  .stat-item {
    padding: 0 1rem;
    margin-bottom: 1.5rem;
  }
  
  .stat-item:not(:last-child)::after {
    display: none;
  }
  
  .display-4 {
    font-size: 2rem !important;
  }
  
  .navbar-nav {
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
  }
}

/* Custom utilities */
.rounded-3 {
  border-radius: 1rem !important;
}

.py-6 {
  padding-top: 4rem !important;
  padding-bottom: 4rem !important;
}

.py-8 {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}
</style>