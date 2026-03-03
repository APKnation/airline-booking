import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views
const HomeView = () => import('@/views/HomeView.vue')
const FlightsView = () => import('@/views/FlightBookingView.vue')
const HotelsView = () => import('@/views/HotelBookingView.vue')
const CarsView = () => import('@/views/CarRentalView.vue')
const TaxiView = () => import('@/views/TaxiBookingView.vue')
const GuideView = () => import('@/views/TravelGuideView.vue')
const AttractionsView = () => import('@/views/AttractionsView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const CheckoutView = () => import('@/views/CheckoutView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/flights',
    name: 'Flights',
    component: FlightsView
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: HotelsView
  },
  {
    path: '/cars',
    name: 'Cars',
    component: CarsView
  },
  {
    path: '/taxi',
    name: 'Taxi',
    component: TaxiView
  },
  {
    path: '/guide',
    name: 'Guide',
    component: GuideView
  },
  {
    path: '/attractions',
    name: 'Attractions',
    component: AttractionsView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView
  },

  // 🔥 Catch-all (prevents white pages)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: {
      template: '<h2 class="text-center mt-5">Page not found</h2>'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
