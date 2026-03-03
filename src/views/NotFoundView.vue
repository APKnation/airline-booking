<template>
  <div class="container py-5 text-center">
    <h1 class="display-1 text-muted">404</h1>
    <h2 class="mb-4">Page Not Found</h2>
    <p class="lead mb-4">The page you're looking for doesn't exist.</p>
    <router-link to="/" class="btn btn-primary btn-lg">
      <i class="bi bi-house-door me-2"></i>Go Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>