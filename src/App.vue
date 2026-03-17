<template>
  <div id="app" class="min-h-screen gradient-bg">
    <!-- Header always visible -->
    <AppHeader />

    <!-- Main content with proper spacing for mobile -->
    <main class="flex-1 container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl pt-20 sm:pt-24">
      <div class="animate-fade-in">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Footer always visible -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

