import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FlightBookingView from '../views/FlightBookingView.vue'
import HotelBookingView from '../views/HotelBookingView.vue'
import CarRentalView from '../views/CarRentalView.vue'
import TaxiBookingView from '../views/TaxiBookingView.vue'
import TravelGuideView from '../views/TravelGuideView.vue'
import AttractionsView from '../views/AttractionsView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import UserDashboard from '../views/UserDashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView, meta: { guestOnly: true } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { guestOnly: true } },
  { path: '/flights', name: 'Flights', component: FlightBookingView },
  { path: '/hotels', name: 'Hotels', component: HotelBookingView },
  { path: '/cars', name: 'CarRental', component: CarRentalView },
  { path: '/taxi', name: 'Taxi', component: TaxiBookingView },
  { path: '/guide', name: 'TravelGuide', component: TravelGuideView },
  { path: '/attractions', name: 'Attractions', component: AttractionsView },
  { path: '/checkout', name: 'Checkout', component: CheckoutView, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: UserDashboard, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken')

  // Redirect authenticated users away from login/register
  if (to.meta.guestOnly && isAuthenticated) {
    next('/dashboard')
    return
  }

  // Redirect unauthenticated users to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }

  next()
})

export default router
